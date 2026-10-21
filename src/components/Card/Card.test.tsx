import { StyleSheet, Text as RNText } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Card } from './Card';

describe('Card', () => {
  it('renders title, additional and body with card styles', async () => {
    await render(
      <Card
        testID="card"
        title="Upcoming visit"
        additional={<RNText>3</RNText>}
      >
        <RNText>Body</RNText>
      </Card>,
    );
    expect(screen.getByText('Upcoming visit')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
    const style = StyleSheet.flatten(screen.getByTestId('card').props.style);
    expect(style).toMatchObject({
      backgroundColor: lightTheme.colors.bg.surface,
      borderColor: lightTheme.colors.border.default,
      borderRadius: lightTheme.radius.lg,
      borderWidth: lightTheme.stroke[1],
      padding: lightTheme.space[4],
      gap: lightTheme.space[3],
    });
    expect(style.boxShadow).toBeUndefined();
  });

  it('skips the header without a title', async () => {
    await render(
      <Card additional={<RNText>extra</RNText>}>
        <RNText>Body</RNText>
      </Card>,
    );
    expect(screen.queryByText('extra')).toBeNull();
  });

  it('draws the block shadow and lets cardStyles win', async () => {
    await render(
      <Card
        testID="card"
        withShadow
        style={{ borderColor: 'red' }}
        cardStyles={{ borderColor: 'blue' }}
      />,
    );
    const style = StyleSheet.flatten(screen.getByTestId('card').props.style);
    expect(style.boxShadow).toEqual([...lightTheme.shadows.block]);
    expect(style.borderColor).toBe('blue');
  });

  it('is a button that calls onPress', async () => {
    const onPress = jest.fn();
    await render(
      <Card title="Pet" onPress={onPress} accessibilityLabel="Open pet" />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Open pet' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled and is not dimmed', async () => {
    const onPress = jest.fn();
    await render(
      <Card onPress={onPress} disabled accessibilityLabel="Open pet" />,
    );
    const button = screen.getByRole('button', { name: 'Open pet' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(StyleSheet.flatten(button.props.style).opacity).toBeUndefined();
  });
});
