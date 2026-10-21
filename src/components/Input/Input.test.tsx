import { StyleSheet, TextInput } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Input } from './Input';
import type { InputProps } from './Input.types';

// react-native-svg has no Jest setup in the kit; the glyphs are not under test here.
jest.mock('../../icons/ClearInputIcon', () => ({ ClearInputIcon: () => null }));
jest.mock('../../icons/CheckIcon', () => ({ CheckIcon: () => null }));
jest.mock('../../icons/CloseIcon', () => ({ CloseIcon: () => null }));
jest.mock('../../icons/EyeIcon', () => ({ EyeIcon: () => null }));
jest.mock('../../icons/EyeWithSlashIcon', () => ({
  EyeWithSlashIcon: () => null,
}));

const touch = (x: number, y: number) => ({
  nativeEvent: { pageX: x, pageY: y },
});

const renderInput = async (props: Partial<InputProps> = {}) => {
  const setValue = jest.fn();
  await render(
    <Input
      value="TailDay"
      setValue={setValue}
      label="Name"
      testID="input.name"
      clearButtonLabel="Clear"
      {...props}
    />,
  );
  const input = screen.getByLabelText('Name');
  return { setValue, input };
};

/** The bordered field: the host view wrapping the text input. */
const fieldStyle = (input: ReturnType<typeof screen.getByLabelText>) =>
  StyleSheet.flatten(input.parent?.props.style);

describe('Input', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the label, value and placeholder', async () => {
    const { input } = await renderInput({ placeholder: 'Enter name' });
    // The visible label is hidden from screen readers: the input carries it.
    expect(
      screen.getByText('Name', { includeHiddenElements: true }),
    ).toBeTruthy();
    expect(input).toHaveDisplayValue('TailDay');
    expect(input.props.placeholder).toBe('Enter name');
    expect(input.props.placeholderTextColor).toBe(lightTheme.palette.lightGray);
  });

  it('passes typed text to setValue and strips emoji', async () => {
    const { setValue, input } = await renderInput();
    await fireEvent.changeText(input, 'Rex 🐶');
    expect(setValue).toHaveBeenCalledWith('Rex ');
  });

  it('keeps only digits for a number-pad keyboard', async () => {
    const { setValue, input } = await renderInput({
      keyboardType: 'number-pad',
    });
    await fireEvent.changeText(input, '12a3');
    expect(setValue).toHaveBeenCalledWith('123');
  });

  it('shows the clear control only while focused with a value', async () => {
    const { input } = await renderInput();
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
    await fireEvent(input, 'focus');
    expect(screen.getByRole('button', { name: 'Clear' })).toBeTruthy();
  });

  it('hides the clear control while focused and empty unless asked', async () => {
    const { input } = await renderInput({ value: '' });
    await fireEvent(input, 'focus');
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
  });

  it('keeps the clear control visible while empty with isClearButtonVisibleWhenEmpty', async () => {
    const { input } = await renderInput({
      value: '',
      isClearButtonVisibleWhenEmpty: true,
    });
    await fireEvent(input, 'focus');
    expect(screen.getByRole('button', { name: 'Clear' })).toBeTruthy();
  });

  it('clears the value on a tap of the clear control and keeps the input focused', async () => {
    const { setValue, input } = await renderInput();
    const focus = jest
      .spyOn(TextInput.prototype, 'focus')
      .mockImplementation(() => undefined);
    await fireEvent(input, 'focus');
    const clear = screen.getByRole('button', { name: 'Clear' });
    expect(clear.props.testID).toBe('input.name.clear');
    await fireEvent(clear, 'touchStart', touch(10, 10));
    await fireEvent(clear, 'touchEnd', touch(12, 11));
    expect(setValue).toHaveBeenCalledWith('');
    expect(focus).toHaveBeenCalled();
    focus.mockRestore();
  });

  it('does not clear when the finger moves away like a scroll', async () => {
    const { setValue, input } = await renderInput();
    await fireEvent(input, 'focus');
    const clear = screen.getByRole('button', { name: 'Clear' });
    await fireEvent(clear, 'touchStart', touch(10, 10));
    await fireEvent(clear, 'touchEnd', touch(10, 60));
    expect(setValue).not.toHaveBeenCalled();
  });

  it('is read-only and grayed when disabled', async () => {
    const { input } = await renderInput({ disabled: true });
    expect(input.props.editable).toBe(false);
    expect(input).toBeDisabled();
    expect(fieldStyle(input).backgroundColor).toBe(lightTheme.colors.bg.subtle);
    await fireEvent(input, 'focus');
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
  });

  it('shows an external error with a red border and announces it', async () => {
    const { input } = await renderInput({
      hasError: true,
      errorText: 'Name is required',
    });
    expect(screen.getByText('Name is required')).toBeTruthy();
    expect(input.props.accessibilityHint).toBe('Name is required');
    expect(fieldStyle(input).borderColor).toBe(lightTheme.colors.text.error);
  });

  it('validates after typing stops and on blur', async () => {
    jest.useFakeTimers();
    const validate = jest.fn((text: string) => (text ? null : 'Required'));
    const { input } = await renderInput({ value: '', validate });
    await fireEvent.changeText(input, '');
    await act(() => jest.advanceTimersByTime(500));
    expect(validate).toHaveBeenCalledWith('');
    expect(screen.getByText('Required')).toBeTruthy();
    validate.mockClear();
    await fireEvent(input, 'blur');
    expect(validate).toHaveBeenCalledWith('');
  });

  it('renders rule lists with the failed rules announced', async () => {
    await renderInput({
      hasError: true,
      errorText: [
        { text: '8+ characters', isCorrect: true },
        { text: 'One digit', isCorrect: false },
      ],
    });
    expect(screen.getByText('8+ characters')).toBeTruthy();
    expect(screen.getByLabelText('Name').props.accessibilityHint).toBe(
      'One digit',
    );
  });

  it('keeps maxLength on the native input while hiding the counter', async () => {
    const { input } = await renderInput({ maxLength: 200, showCounter: false });
    expect(input.props.maxLength).toBe(200);
    expect(screen.queryByText('7/200')).toBeNull();
  });

  it('shows the counter when maxLength is set', async () => {
    await renderInput({ maxLength: 200 });
    expect(screen.getByText('7/200')).toBeTruthy();
  });

  it('toggles password visibility', async () => {
    const onTogglePassword = jest.fn();
    const { input } = await renderInput({
      secureTextEntry: true,
      showPasswordToggle: true,
      onTogglePassword,
      showPasswordLabel: 'Show password',
      hidePasswordLabel: 'Hide password',
    });
    expect(input.props.secureTextEntry).toBe(true);
    await fireEvent.press(
      screen.getByRole('button', { name: 'Show password' }),
    );
    expect(onTogglePassword).toHaveBeenCalledWith(true);
    expect(screen.getByLabelText('Name').props.secureTextEntry).toBe(false);
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeTruthy();
  });

  it('forwards nativeID to the native input', async () => {
    const { input } = await renderInput({ nativeID: 'registration.password' });
    expect(input.props.nativeID).toBe('registration.password');
  });
});
