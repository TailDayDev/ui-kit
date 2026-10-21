import { StyleSheet } from 'react-native';
import type * as ReactNativeModule from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Toggle } from './Toggle';

// react-native-svg has no Jest setup in the kit; stub the glyph and expose its color/size.
jest.mock('../../icons/CheckIcon', () => {
  const { View } = jest.requireActual<typeof ReactNativeModule>('react-native');
  return {
    CheckIcon: ({ color, size }: { color?: string; size?: number }) => (
      <View testID="check-icon" accessibilityHint={`${color}|${size}`} />
    ),
  };
});

describe('Toggle', () => {
  it('renders off with the grey track', async () => {
    await render(
      <Toggle
        isActive={false}
        handlePress={jest.fn()}
        accessibilityLabel="Notify"
      />,
    );
    const toggle = screen.getByRole('switch', { name: 'Notify' });
    expect(toggle).not.toBeChecked();
    expect(StyleSheet.flatten(toggle.props.style)).toMatchObject({
      width: 56,
      height: 32,
      alignItems: 'flex-start',
      backgroundColor: lightTheme.palette.darkGray,
    });
  });

  it('renders on with the accent track', async () => {
    await render(
      <Toggle isActive handlePress={jest.fn()} accessibilityLabel="Notify" />,
    );
    const toggle = screen.getByRole('switch', { name: 'Notify' });
    expect(toggle).toBeChecked();
    expect(StyleSheet.flatten(toggle.props.style)).toMatchObject({
      alignItems: 'flex-end',
      backgroundColor: lightTheme.colors.bg.accent,
    });
    expect(
      screen.getByTestId('check-icon', { includeHiddenElements: true }).props
        .accessibilityHint,
    ).toBe(`${lightTheme.colors.icon.accent}|16`);
  });

  it('calls handlePress and stops propagation', async () => {
    const handlePress = jest.fn();
    const stopPropagation = jest.fn();
    await render(
      <Toggle
        isActive={false}
        handlePress={handlePress}
        accessibilityLabel="Notify"
      />,
    );
    await fireEvent.press(screen.getByRole('switch', { name: 'Notify' }), {
      stopPropagation,
    });
    expect(handlePress).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('blocks taps when disabled', async () => {
    const handlePress = jest.fn();
    await render(
      <Toggle
        isActive={false}
        handlePress={handlePress}
        disabled
        accessibilityLabel="Notify"
      />,
    );
    const toggle = screen.getByRole('switch', { name: 'Notify' });
    await fireEvent.press(toggle);
    expect(handlePress).not.toHaveBeenCalled();
    expect(toggle).toBeDisabled();
  });

  it('prefers controlTestID over testID', async () => {
    await render(
      <Toggle
        isActive
        handlePress={jest.fn()}
        testID="row"
        controlTestID="control"
      />,
    );
    expect(screen.getByTestId('control')).toBeTruthy();
    expect(screen.queryByTestId('row')).toBeNull();
  });
});
