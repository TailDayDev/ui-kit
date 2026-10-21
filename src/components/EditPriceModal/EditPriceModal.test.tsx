import { useState } from 'react';
import { InteractionManager, Keyboard } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { EditPriceModal } from './EditPriceModal';
import type { EditPriceModalProps } from './EditPriceModal.types';
import { parseStringToNumber, verifyPriceInput } from './priceInput';

const INPUT = 'price-input';
const SAVE = 'price-save';

const baseProps: EditPriceModalProps = {
  isVisible: true,
  defaultValue: '0',
  placeholder: '0,00',
  saveTitle: 'Save',
  formatMaxError: max => `maximum_number: ${max} $`,
  inputTestID: INPUT,
  saveButtonTestID: SAVE,
  onClose: () => undefined,
  onConfirm: () => undefined,
};

const renderModal = (props: Partial<EditPriceModalProps> = {}) =>
  render(<EditPriceModal {...baseProps} {...props} />, {
    wrapper: ModalLayerTestRoot,
  });

const input = () => screen.getByTestId(INPUT);

describe('priceInput', () => {
  it('parses both decimal separators and falls back to 0', () => {
    expect(parseStringToNumber('15,5')).toBe(15.5);
    expect(parseStringToNumber('15.5')).toBe(15.5);
    expect(parseStringToNumber('')).toBe(0);
  });

  it('accepts at most 10 integer and 2 fraction digits', () => {
    const setPrice = jest.fn();
    verifyPriceInput('12,345', '12,34', setPrice);
    verifyPriceInput('12345678901', '1234567890', setPrice);
    expect(setPrice).not.toHaveBeenCalled();
    verifyPriceInput('12,34', '12,3', setPrice);
    expect(setPrice).toHaveBeenCalledWith('12,34');
  });

  it('blocks amounts above max but lets a trailing separator through', () => {
    const setPrice = jest.fn();
    verifyPriceInput('11', '1', setPrice, 10);
    expect(setPrice).not.toHaveBeenCalled();
    verifyPriceInput('10,', '10', setPrice, 10);
    expect(setPrice).toHaveBeenCalledWith('10,');
  });
});

describe('EditPriceModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await act(() => {
      jest.runOnlyPendingTimers();
      resetModalLayersForTests();
    });
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('schedules focusing the price input when autofocus is enabled', async () => {
    const runAfterInteractions = jest.spyOn(
      InteractionManager,
      'runAfterInteractions',
    );
    await renderModal({ autoFocusInput: true });

    expect(input().props.autoFocus).toBe(true);
    expect(runAfterInteractions).toHaveBeenCalledTimes(1);
  });

  it('does not focus the price input when autofocus is disabled', async () => {
    const runAfterInteractions = jest.spyOn(
      InteractionManager,
      'runAfterInteractions',
    );
    await renderModal();

    expect(input().props.autoFocus).toBe(false);
    expect(runAfterInteractions).not.toHaveBeenCalled();
  });

  it('releases the caret on the typing frame and pins it after the amount', async () => {
    await renderModal();
    await act(() => {
      jest.runOnlyPendingTimers();
    });

    await fireEvent.changeText(input(), '4');

    expect(input().props.value).toBe('4');
    expect(input().props.selection).toBeUndefined();

    await act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(input().props.selection).toEqual({ start: 1, end: 1 });

    await fireEvent.changeText(input(), '43');

    expect(input().props.value).toBe('43');
    expect(input().props.selection).toBeUndefined();

    await act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(input().props.value).toBe('43');
    expect(input().props.selection).toEqual({ start: 2, end: 2 });
  });

  it('selects the whole value on focus so typing replaces it', async () => {
    await renderModal({ defaultValue: '15,00' });
    await act(() => {
      jest.runOnlyPendingTimers();
    });

    await fireEvent(input(), 'focus');

    expect(input().props.selection).toEqual({ start: 0, end: 5 });

    await fireEvent.changeText(input(), '7');

    expect(input().props.value).toBe('7');
  });

  it('opens empty for a zero default and shows the placeholder', async () => {
    await renderModal({ defaultValue: '0,00' });

    expect(input().props.value).toBe('');
    expect(input().props.placeholder).toBe('0,00');
  });

  it('shows only the amount: no currency next to the input', async () => {
    await renderModal({ defaultValue: '57' });

    expect(screen.queryByText(/\$/)).toBeNull();
    expect(input().props.value).toBe('57');
  });

  it('shows the app-formatted max error and disables Save above max', async () => {
    const formatMaxError = jest.fn((max: number) => `maximum_number: ${max} $`);
    await renderModal({ defaultValue: '33', max: 10, formatMaxError });

    expect(screen.getByText('maximum_number: 10 $')).toBeTruthy();
    expect(formatMaxError).toHaveBeenCalledWith(10);
    expect(screen.getByTestId(SAVE).props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true }),
    );
  });

  it('hydrates the input from defaultValue on the open render', async () => {
    const result = await renderModal({ isVisible: false });

    await result.rerender(
      <EditPriceModal {...baseProps} defaultValue="5,00" isVisible />,
    );

    expect(input().props.value).toBe('5,00');
  });

  it('keeps the typed draft when defaultValue changes while visible', async () => {
    const result = await renderModal({ defaultValue: '5' });

    await fireEvent.changeText(input(), '7');
    await result.rerender(<EditPriceModal {...baseProps} defaultValue="10" />);

    expect(input().props.value).toBe('7');
  });

  it('dismisses the keyboard and confirms the price immediately', async () => {
    const onConfirm = jest.fn();
    const dismissKeyboard = jest
      .spyOn(Keyboard, 'dismiss')
      .mockImplementation(() => undefined);
    await renderModal({ defaultValue: '20', onConfirm });

    await fireEvent.press(screen.getByTestId(SAVE));

    expect(onConfirm).toHaveBeenCalledWith('20');
    expect(dismissKeyboard).toHaveBeenCalled();
  });

  it('keeps Save disabled for zero unless zero is allowed', async () => {
    const onConfirm = jest.fn();
    const result = await renderModal({ onConfirm });
    await fireEvent.changeText(input(), '0');
    await fireEvent.press(screen.getByTestId(SAVE));
    expect(onConfirm).not.toHaveBeenCalled();

    await result.rerender(
      <EditPriceModal {...baseProps} onConfirm={onConfirm} isZeroAllowed />,
    );
    await fireEvent.press(screen.getByTestId(SAVE));
    expect(onConfirm).toHaveBeenCalledWith('0');
  });

  it('locks Save while saving', async () => {
    const onConfirm = jest.fn();
    await renderModal({ defaultValue: '20', onConfirm, isSaving: true });

    await fireEvent.press(screen.getByTestId(SAVE));

    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.getByTestId(SAVE).props.accessibilityState).toEqual(
      expect.objectContaining({ busy: true }),
    );
  });

  it('asks the discard confirmation when closing with changes', async () => {
    const onClose = jest.fn();
    const requestConfirmation = jest.fn();
    await renderModal({
      defaultValue: '20',
      onClose,
      requestConfirmation,
      closeButtonTestID: 'price-close',
    });

    await fireEvent.changeText(input(), '21');
    await fireEvent.press(screen.getByTestId('price-close'));

    expect(requestConfirmation).toHaveBeenCalledWith(true, onClose);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes at once without a confirmation handler', async () => {
    const Owner = () => {
      const [isVisible, setIsVisible] = useState(true);
      return (
        <EditPriceModal
          {...baseProps}
          isVisible={isVisible}
          closeButtonTestID="price-close"
          onClose={() => setIsVisible(false)}
        />
      );
    };
    await render(<Owner />, { wrapper: ModalLayerTestRoot });

    await fireEvent.press(screen.getByTestId('price-close'));
    await act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryByTestId(INPUT)).toBeNull();
  });
});
