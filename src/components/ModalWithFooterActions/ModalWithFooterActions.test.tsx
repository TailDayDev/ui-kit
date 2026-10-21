import { createRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import type { CustomModalHandle } from '../CustomModal';
import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { ModalWithFooterActions } from './ModalWithFooterActions';
import type { ModalWithFooterActionsProps } from './ModalWithFooterActions.types';

const renderModal = (props: Partial<ModalWithFooterActionsProps> = {}) => {
  const handlers = {
    onClose: jest.fn(),
    onPressPrimary: jest.fn(),
    onPressSecondary: jest.fn(),
  };
  const result = render(
    <ModalWithFooterActions
      modalKey="test"
      title="Edit"
      visible
      primaryTitle="Save"
      secondaryTitle="Cancel"
      primaryButtonTestID="primary"
      secondaryButtonTestID="secondary"
      {...handlers}
      {...props}
    >
      <View testID="content" />
    </ModalWithFooterActions>,
    { wrapper: ModalLayerTestRoot },
  );
  return { handlers, result };
};

describe('ModalWithFooterActions', () => {
  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
  });

  it('renders the title, content and both actions', async () => {
    const { result } = renderModal();
    await result;

    expect(screen.getByText('Edit')).toBeTruthy();
    expect(screen.getByTestId('content')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });

  it('presses the primary and secondary actions', async () => {
    const { handlers, result } = renderModal();
    await result;

    await fireEvent.press(screen.getByTestId('secondary'));
    await fireEvent.press(screen.getByTestId('primary'));

    expect(handlers.onPressSecondary).toHaveBeenCalledTimes(1);
    expect(handlers.onPressPrimary).toHaveBeenCalledTimes(1);
  });

  it('draws the secondary action light and the primary in its style', async () => {
    const { result } = renderModal({ primaryButtonStyle: 'danger' });
    await result;

    expect(
      StyleSheet.flatten(screen.getByTestId('secondary').props.style),
    ).toMatchObject({ backgroundColor: lightTheme.colors.bg.surface });
    expect(
      StyleSheet.flatten(screen.getByTestId('primary').props.style)
        .backgroundColor,
    ).toBe(lightTheme.palette.red);
  });

  it('does not press a disabled primary action', async () => {
    const { handlers, result } = renderModal({ isPrimaryDisabled: true });
    await result;

    await fireEvent.press(screen.getByTestId('primary'));

    expect(handlers.onPressPrimary).not.toHaveBeenCalled();
    expect(screen.getByTestId('primary').props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true }),
    );
  });

  it('shows the primary loading state', async () => {
    const { handlers, result } = renderModal({ isPrimaryLoading: true });
    await result;

    await fireEvent.press(screen.getByTestId('primary'));

    expect(handlers.onPressPrimary).not.toHaveBeenCalled();
    expect(screen.getByTestId('primary').props.accessibilityState).toEqual(
      expect.objectContaining({ busy: true }),
    );
  });

  it('forwards the modal handle', async () => {
    const modalRef = createRef<CustomModalHandle>();
    const { handlers, result } = renderModal({ modalRef });
    await result;

    await act(() => {
      modalRef.current?.close();
    });

    expect(handlers.onClose).toHaveBeenCalledTimes(1);
  });
});
