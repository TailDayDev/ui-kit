import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { FloatingButton } from './FloatingButton';

describe('FloatingButton', () => {
  it('renders the accent pill with its title', async () => {
    await render(
      <FloatingButton title="Retry" onPress={jest.fn()} testID="fab" />,
    );
    expect(screen.getByText('Retry')).toBeTruthy();
    const style = StyleSheet.flatten(screen.getByTestId('fab').props.style);
    expect(style).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accent,
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 12,
    });
  });

  it('calls onPress', async () => {
    const onPress = jest.fn();
    await render(<FloatingButton title="Retry" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Retry' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('blocks presses and dims when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <FloatingButton title="Retry" onPress={onPress} disabled testID="fab" />,
    );
    const button = screen.getByRole('button', { name: 'Retry' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(
      StyleSheet.flatten(screen.getByTestId('fab').props.style).opacity,
    ).toBe(0.5);
  });

  it('renders nothing when initially hidden', async () => {
    await render(
      <FloatingButton title="Retry" onPress={jest.fn()} visible={false} />,
    );
    expect(screen.queryByText('Retry')).toBeNull();
  });
});
