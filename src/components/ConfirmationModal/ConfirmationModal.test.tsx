import { StyleSheet, View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { ConfirmationModal } from './ConfirmationModal';
import type { ConfirmationModalProps } from './ConfirmationModal.types';

const renderModal = (props: Partial<ConfirmationModalProps> = {}) => {
  const onClose = props.onClose ?? jest.fn();
  const onConfirm = props.onConfirm ?? jest.fn();
  const result = render(
    <ConfirmationModal
      isVisible
      title="Delete pet?"
      description="This cannot be undone"
      confirmText="Delete"
      closeText="Cancel"
      errorText="Something went wrong"
      confirmTestID="confirm"
      cancelTestID="cancel"
      {...props}
      onClose={onClose}
      onConfirm={onConfirm}
    />,
    { wrapper: ModalLayerTestRoot },
  );
  return { onClose, onConfirm, result };
};

describe('ConfirmationModal', () => {
  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
  });

  it('renders the texts, the icon and both actions', async () => {
    const { result } = renderModal({ icon: <View testID="icon" /> });
    await result;

    expect(screen.getByText('Delete pet?')).toBeTruthy();
    expect(screen.getByText('This cannot be undone')).toBeTruthy();
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });

  it('renders nothing while not visible', async () => {
    const { result } = renderModal({ isVisible: false });
    await result;

    expect(screen.queryByText('Delete pet?')).toBeNull();
  });

  it('draws the confirm action red unless confirmStyles are given', async () => {
    const { result } = renderModal();
    await result;
    expect(
      StyleSheet.flatten(screen.getByTestId('confirm').props.style)
        .backgroundColor,
    ).toBe(lightTheme.palette.red);
  });

  it('applies confirmStyles over the default fill', async () => {
    const { result } = renderModal({
      confirmStyles: { backgroundColor: lightTheme.palette.green },
    });
    await result;
    expect(
      StyleSheet.flatten(screen.getByTestId('confirm').props.style)
        .backgroundColor,
    ).toBe(lightTheme.palette.green);
  });

  it('confirms and then sends a close request', async () => {
    const { onClose, onConfirm, result } = renderModal();
    await result;

    await fireEvent.press(screen.getByTestId('confirm'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stays open when onConfirm returns false', async () => {
    const { onClose, result } = renderModal({ onConfirm: () => false });
    await result;

    await fireEvent.press(screen.getByTestId('confirm'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('shows the error text and stays open when onConfirm throws', async () => {
    const warn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);
    const { onClose, result } = renderModal({
      onConfirm: () => Promise.reject(new Error('fail')),
    });
    await result;

    await fireEvent.press(screen.getByTestId('confirm'));

    expect(screen.getByTestId('confirmation-modal-error')).toBeTruthy();
    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(onClose).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('runs onCancel and then sends a close request', async () => {
    const onCancel = jest.fn();
    const { onClose, onConfirm, result } = renderModal({ onCancel });
    await result;

    await fireEvent.press(screen.getByTestId('cancel'));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
