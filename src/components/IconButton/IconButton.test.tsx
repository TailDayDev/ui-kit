import { StyleSheet, View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { IconButton, IconRoundButton, IconSquareButton } from './IconButton';

const glyph = <View testID="glyph" />;

describe('IconRoundButton', () => {
  it('renders a round soft-gray button of the given size', async () => {
    await render(
      <IconRoundButton accessibilityLabel="Close" icon={glyph} size={36} />,
    );
    const button = screen.getByRole('button', { name: 'Close' });
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: lightTheme.colors.bg.subtle,
      opacity: 1,
    });
    expect(screen.getByTestId('glyph')).toBeTruthy();
  });

  it('defaults to 40', async () => {
    await render(<IconRoundButton accessibilityLabel="Close" icon={glyph} />);
    const style = StyleSheet.flatten(
      screen.getByRole('button', { name: 'Close' }).props.style,
    );
    expect(style).toMatchObject({ width: 40, height: 40, borderRadius: 20 });
  });

  it('calls onPress', async () => {
    const onPress = jest.fn();
    await render(
      <IconRoundButton
        accessibilityLabel="Close"
        icon={glyph}
        onPress={onPress}
      />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Close' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('blocks presses and dims when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <IconRoundButton
        accessibilityLabel="Close"
        icon={glyph}
        onPress={onPress}
        disabled
      />,
    );
    const button = screen.getByRole('button', { name: 'Close' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(StyleSheet.flatten(button.props.style).opacity).toBe(0.6);
  });

  it('shows a spinner, reports busy and blocks presses while loading', async () => {
    const onPress = jest.fn();
    await render(
      <IconRoundButton
        accessibilityLabel="Close"
        icon={glyph}
        onPress={onPress}
        loading
      />,
    );
    const button = screen.getByRole('button', { name: 'Close' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeBusy();
    expect(screen.queryByTestId('glyph')).toBeNull();
  });
});

describe('IconSquareButton', () => {
  it('uses the 8pt radius', async () => {
    await render(
      <IconSquareButton accessibilityLabel="Delete" icon={glyph} size={48} />,
    );
    const style = StyleSheet.flatten(
      screen.getByRole('button', { name: 'Delete' }).props.style,
    );
    expect(style).toMatchObject({
      width: 48,
      height: 48,
      borderRadius: lightTheme.radius.sm,
    });
  });
});

describe('IconButton (deprecated alias)', () => {
  it('is the round button', () => {
    expect(IconButton).toBe(IconRoundButton);
  });
});
