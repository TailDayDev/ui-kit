import { StyleSheet } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { OTPInput } from './OTPInput';

const LABEL = 'Verification code';

const getInput = () => screen.getByLabelText(LABEL);

describe('OTPInput', () => {
  it('renders one cell per digit and keeps only digits', async () => {
    const onCodeFilled = jest.fn();
    await render(
      <OTPInput
        length={4}
        onCodeFilled={onCodeFilled}
        autoFocus={false}
        accessibilityLabel={LABEL}
        emptyPlaceholder="-"
      />,
    );
    expect(screen.getAllByText('-')).toHaveLength(4);

    await fireEvent.changeText(getInput(), '1a2b3');

    expect(onCodeFilled).toHaveBeenLastCalledWith('123');
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getAllByText('-')).toHaveLength(1);
    expect(StyleSheet.flatten(screen.getByText('-').props.style).color).toBe(
      lightTheme.palette.lightGray,
    );
  });

  it('removes the last digit on Backspace', async () => {
    const onCodeFilled = jest.fn();
    await render(
      <OTPInput
        length={4}
        onCodeFilled={onCodeFilled}
        autoFocus={false}
        accessibilityLabel={LABEL}
      />,
    );
    await fireEvent.changeText(getInput(), '12');
    await fireEvent(getInput(), 'keyPress', {
      nativeEvent: { key: 'Backspace' },
    });
    expect(onCodeFilled).toHaveBeenLastCalledWith('1');
  });

  it('prefills a full code from the clipboard callback', async () => {
    const onCodeFilled = jest.fn();
    const onRequestClipboardText = jest.fn(() => Promise.resolve('123456'));
    await render(
      <OTPInput
        onCodeFilled={onCodeFilled}
        onRequestClipboardText={onRequestClipboardText}
        autoFocus={false}
        accessibilityLabel={LABEL}
      />,
    );
    await act(async () => {
      await Promise.resolve();
    });
    expect(onRequestClipboardText).toHaveBeenCalledTimes(1);
    expect(onCodeFilled).toHaveBeenCalledWith('123456');
  });

  it('ignores clipboard text that is not a full code, and skips reading when disabled', async () => {
    const onCodeFilled = jest.fn();
    const onRequestClipboardText = jest.fn(() => Promise.resolve('12ab'));
    const { rerender } = await render(
      <OTPInput
        onCodeFilled={onCodeFilled}
        onRequestClipboardText={onRequestClipboardText}
        autoFocus={false}
      />,
    );
    await act(async () => {
      await Promise.resolve();
    });
    expect(onCodeFilled).not.toHaveBeenCalledWith('12ab');

    const skipped = jest.fn(() => Promise.resolve('123456'));
    await rerender(
      <OTPInput
        onCodeFilled={onCodeFilled}
        onRequestClipboardText={skipped}
        readClipboard={false}
        autoFocus={false}
      />,
    );
    expect(skipped).not.toHaveBeenCalled();
  });

  it('shows the error text and red cells, and hides them while focused', async () => {
    await render(
      <OTPInput
        length={2}
        onCodeFilled={jest.fn()}
        errorText="Wrong code"
        autoFocus={false}
        accessibilityLabel={LABEL}
        emptyPlaceholder="-"
      />,
    );
    const error = screen.getByText('Wrong code');
    expect(StyleSheet.flatten(error.props.style).color).toBe(
      lightTheme.colors.text.error,
    );
    const cell = screen.getAllByText('-')[0]?.parent;
    expect(StyleSheet.flatten(cell?.props.style)).toMatchObject({
      borderColor: lightTheme.colors.text.error,
    });

    await fireEvent(getInput(), 'focus');
    expect(screen.queryByText('Wrong code')).toBeNull();

    await fireEvent(getInput(), 'blur');
    expect(screen.getByText('Wrong code')).toBeTruthy();
  });

  it('clears the code when resetVersion changes', async () => {
    const onCodeFilled = jest.fn();
    const { rerender } = await render(
      <OTPInput
        length={4}
        onCodeFilled={onCodeFilled}
        autoFocus={false}
        accessibilityLabel={LABEL}
        resetVersion={0}
      />,
    );
    await fireEvent.changeText(getInput(), '12');
    await rerender(
      <OTPInput
        length={4}
        onCodeFilled={onCodeFilled}
        autoFocus={false}
        accessibilityLabel={LABEL}
        resetVersion={1}
      />,
    );
    expect(onCodeFilled).toHaveBeenLastCalledWith('');
  });
});
