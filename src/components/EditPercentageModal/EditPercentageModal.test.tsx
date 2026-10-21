import { Pressable } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import type { PercentageValueFieldSliderProps } from '../PercentageValueField';
import { EditPercentageModal } from './EditPercentageModal';
import type { EditPercentageModalProps } from './EditPercentageModal.types';

const renderSlider = ({ onValueChange }: PercentageValueFieldSliderProps) => (
  <Pressable
    accessibilityRole="adjustable"
    accessibilityLabel="Slider"
    onPress={() => onValueChange(40)}
  />
);

const renderModal = (props: Partial<EditPercentageModalProps> = {}) => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();
  const result = render(
    <EditPercentageModal
      isVisible
      title="Discount"
      defaultValue={25}
      cancelTitle="Cancel"
      saveTitle="Save"
      renderSlider={renderSlider}
      onClose={onClose}
      onConfirm={onConfirm}
      {...props}
    />,
    { wrapper: ModalLayerTestRoot },
  );
  return { onClose, onConfirm, result };
};

const saveButton = () => screen.getByRole('button', { name: 'Save' });

describe('EditPercentageModal', () => {
  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
  });

  it('renders the title, the field, the description and the footer', async () => {
    const { result } = renderModal({ description: 'Applied to the total' });
    await result;

    expect(screen.getByText('Discount')).toBeTruthy();
    expect(screen.getByDisplayValue('25')).toBeTruthy();
    expect(screen.getByText('Applied to the total')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });

  it('keeps Save disabled until the value changes', async () => {
    const { onConfirm, result } = renderModal();
    await result;

    expect(saveButton().props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true }),
    );
    await fireEvent.press(saveButton());
    expect(onConfirm).not.toHaveBeenCalled();

    await fireEvent.press(screen.getByRole('adjustable', { name: 'Slider' }));
    await fireEvent.press(saveButton());

    expect(onConfirm).toHaveBeenCalledWith(40);
  });

  it('swallows a rejected save', async () => {
    const onConfirm = jest.fn(() => Promise.reject(new Error('fail')));
    const { result } = renderModal({ onConfirm });
    await result;

    await fireEvent.press(screen.getByRole('adjustable', { name: 'Slider' }));
    await fireEvent.press(saveButton());

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('closes at once on Cancel without a confirmation handler', async () => {
    const { onClose, result } = renderModal();
    await result;

    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('asks the discard confirmation with the change state', async () => {
    const requestConfirmation = jest.fn();
    const { onClose, result } = renderModal({ requestConfirmation });
    await result;

    await fireEvent.press(screen.getByRole('adjustable', { name: 'Slider' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));

    expect(requestConfirmation).toHaveBeenCalledWith(true, onClose);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('refuses to close and to save while saving', async () => {
    const { onClose, onConfirm, result } = renderModal({ isSaving: true });
    await result;

    await fireEvent.press(screen.getByRole('button', { name: 'Cancel' }));

    expect(onClose).not.toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('renders the nested overlays', async () => {
    const { result } = renderModal({
      nestedOverlays: <Pressable testID="overlay" />,
    });
    await result;

    expect(
      screen.getByTestId('overlay', { includeHiddenElements: true }),
    ).toBeTruthy();
  });
});
