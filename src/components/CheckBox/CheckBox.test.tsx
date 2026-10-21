import { StyleSheet } from 'react-native';
import type * as ReactNativeModule from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { CheckBox } from './CheckBox';

// react-native-svg has no Jest setup in the kit; stub the glyph and expose its color/size.
jest.mock('../../icons/CheckIcon', () => {
  const { View } = jest.requireActual<typeof ReactNativeModule>('react-native');
  return {
    CheckIcon: ({ color, size }: { color?: string; size?: number }) => (
      <View testID="check-icon" accessibilityHint={`${color}|${size}`} />
    ),
  };
});

describe('CheckBox', () => {
  it('renders unchecked as an outlined surface box', async () => {
    await render(
      <CheckBox
        isActive={false}
        handlePress={jest.fn()}
        accessibilityLabel="Accept"
      />,
    );
    const box = screen.getByRole('checkbox', { name: 'Accept' });
    expect(box).not.toBeChecked();
    expect(
      screen.queryByTestId('check-icon', { includeHiddenElements: true }),
    ).toBeNull();
    expect(StyleSheet.flatten(box.props.style)).toMatchObject({
      width: 16,
      height: 16,
      backgroundColor: lightTheme.colors.bg.surface,
      borderColor: lightTheme.colors.border.default,
    });
  });

  it('renders checked with the accent fill', async () => {
    await render(
      <CheckBox isActive handlePress={jest.fn()} accessibilityLabel="Accept" />,
    );
    const box = screen.getByRole('checkbox', { name: 'Accept' });
    expect(box).toBeChecked();
    expect(StyleSheet.flatten(box.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accent,
      borderWidth: 0,
    });
    expect(
      screen.getByTestId('check-icon', { includeHiddenElements: true }).props
        .accessibilityHint,
    ).toBe(`${lightTheme.colors.text.inverse}|12`);
  });

  it('calls handlePress on tap', async () => {
    const handlePress = jest.fn();
    await render(
      <CheckBox
        isActive={false}
        handlePress={handlePress}
        accessibilityLabel="Accept"
      />,
    );
    await fireEvent.press(screen.getByRole('checkbox', { name: 'Accept' }));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('blocks taps when disabled', async () => {
    const handlePress = jest.fn();
    await render(
      <CheckBox
        isActive={false}
        handlePress={handlePress}
        disabled
        accessibilityLabel="Accept"
      />,
    );
    const box = screen.getByRole('checkbox', { name: 'Accept' });
    await fireEvent.press(box);
    expect(handlePress).not.toHaveBeenCalled();
    expect(box).toBeDisabled();
  });
});
