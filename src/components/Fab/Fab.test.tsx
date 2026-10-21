import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Fab } from './Fab';

describe('Fab', () => {
  it('renders a 56pt round secondary button with the fab shadow', async () => {
    await render(<Fab accessibilityLabel="New task" />);
    const style = StyleSheet.flatten(
      screen.getByRole('button', { name: 'New task' }).props.style,
    );
    expect(style).toMatchObject({
      width: 56,
      height: 56,
      borderRadius: lightTheme.radius.full,
      backgroundColor: lightTheme.palette.secondary,
      boxShadow: [...lightTheme.shadows.fab],
    });
  });

  it('calls onPress', async () => {
    const onPress = jest.fn();
    await render(<Fab accessibilityLabel="New task" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'New task' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('blocks presses and dims to opacity.disabled when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <Fab accessibilityLabel="New task" onPress={onPress} disabled />,
    );
    const button = screen.getByRole('button', { name: 'New task' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(StyleSheet.flatten(button.props.style).opacity).toBe(
      lightTheme.opacity.disabled,
    );
  });
});
