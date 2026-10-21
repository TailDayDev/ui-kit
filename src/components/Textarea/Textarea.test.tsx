import { createRef } from 'react';
import { Keyboard, StyleSheet, type View } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Textarea } from './Textarea';
import type { TextareaProps } from './Textarea.types';

const renderTextarea = async (props: Partial<TextareaProps> = {}) => {
  const setValue = jest.fn();
  await render(
    <Textarea
      value="Eats slowly"
      setValue={setValue}
      label="Notes"
      placeholder="Add care notes"
      testID="notes"
      {...props}
    />,
  );
  return { setValue, input: screen.getByLabelText('Notes') };
};

const fieldStyle = (input: ReturnType<typeof screen.getByLabelText>) =>
  StyleSheet.flatten(input.parent?.props.style);

describe('Textarea', () => {
  it('renders a multiline field with label, value and placeholder', async () => {
    const { input } = await renderTextarea();
    expect(input).toHaveDisplayValue('Eats slowly');
    expect(input.props.multiline).toBe(true);
    expect(input.props.placeholder).toBe('Add care notes');
    expect(
      screen.getByText('Notes', { includeHiddenElements: true }),
    ).toBeTruthy();
  });

  it('passes typed text to setValue unchanged', async () => {
    const { setValue, input } = await renderTextarea();
    await fireEvent.changeText(input, 'Likes 🐟');
    expect(setValue).toHaveBeenCalledWith('Likes 🐟');
  });

  it('draws the accent border while focused and reports focus/blur', async () => {
    const onFocus = jest.fn();
    const onInputFocus = jest.fn();
    const onBlur = jest.fn();
    const { input } = await renderTextarea({ onFocus, onInputFocus, onBlur });
    await fireEvent(input, 'focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onInputFocus).toHaveBeenCalledTimes(1);
    expect(fieldStyle(input).borderColor).toBe(lightTheme.colors.bg.accent);
    await fireEvent(input, 'blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(fieldStyle(input).borderColor).toBe(lightTheme.palette.lightGray);
  });

  it('blurs when the keyboard hides while focused', async () => {
    const listeners = new Map<string, () => void>();
    const addListener = jest
      .spyOn(Keyboard, 'addListener')
      .mockImplementation((name, listener) => {
        listeners.set(name, listener as () => void);
        return { remove: jest.fn() } as unknown as ReturnType<
          typeof Keyboard.addListener
        >;
      });
    const onBlur = jest.fn();
    const { input } = await renderTextarea({ onBlur });
    await fireEvent(input, 'focus');
    await act(() => listeners.get('keyboardDidHide')?.());
    expect(onBlur).toHaveBeenCalledTimes(1);
    addListener.mockRestore();
  });

  it('is read-only when disabled', async () => {
    const { input } = await renderTextarea({ disabled: true });
    expect(input.props.editable).toBe(false);
    expect(input).toBeDisabled();
  });

  it('shows the counter under the field when maxLength is set', async () => {
    const { input } = await renderTextarea({ maxLength: 160 });
    expect(screen.getByText('11/160')).toBeTruthy();
    expect(input.props.maxLength).toBe(160);
    expect(fieldStyle(input).marginBottom).toBe(lightTheme.space[4]);
  });

  it('reserves counter space outside the field when fieldRef is passed', async () => {
    const fieldRef = createRef<View>();
    const { input } = await renderTextarea({ maxLength: 160, fieldRef });
    expect(fieldRef.current).toBeTruthy();
    expect(fieldStyle(input).marginBottom).toBeUndefined();
  });
});
