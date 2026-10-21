import type { TextInput } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { InputClearButton } from './InputClearButton';

// react-native-svg has no Jest setup in the kit; the glyph is not under test here.
jest.mock('../../icons/ClearInputIcon', () => ({ ClearInputIcon: () => null }));

const touch = (x: number, y: number) => ({
  nativeEvent: { pageX: x, pageY: y },
});

const setup = async () => {
  const onClear = jest.fn();
  const focus = jest.fn();
  const inputRef = { current: { focus } as unknown as TextInput };
  await render(
    <InputClearButton
      onClear={onClear}
      inputRef={inputRef}
      testID="field.clear"
      accessibilityLabel="Clear"
    />,
  );
  const control = screen.getByRole('button', { name: 'Clear' });
  return { onClear, focus, control };
};

describe('InputClearButton', () => {
  it('renders as a labelled button', async () => {
    const { control } = await setup();
    expect(control.props.testID).toBe('field.clear');
  });

  it('clears and keeps the field focused on a tap', async () => {
    const { onClear, focus, control } = await setup();
    await fireEvent(control, 'touchStart', touch(10, 10));
    await fireEvent(control, 'touchEnd', touch(13, 12));
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(focus).toHaveBeenCalledTimes(1);
  });

  it('does not clear when the finger moves like a scroll', async () => {
    const { onClear, control } = await setup();
    await fireEvent(control, 'touchStart', touch(10, 10));
    await fireEvent(control, 'touchEnd', touch(10, 40));
    expect(onClear).not.toHaveBeenCalled();
  });

  it('does not clear when the touch is cancelled', async () => {
    const { onClear, control } = await setup();
    await fireEvent(control, 'touchStart', touch(10, 10));
    await fireEvent(control, 'touchCancel');
    await fireEvent(control, 'touchEnd', touch(10, 10));
    expect(onClear).not.toHaveBeenCalled();
  });

  it('clears from the accessibility tap', async () => {
    const { onClear, control } = await setup();
    await fireEvent(control, 'accessibilityTap');
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('never takes the responder, so a parent ScrollView cannot swallow the tap', async () => {
    const { control } = await setup();
    expect(control.props.onStartShouldSetResponder).toBeUndefined();
    expect(control.props.onPress).toBeUndefined();
  });
});
