import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Text } from '../Text';
import { Pressable } from './Pressable';

describe('Pressable', () => {
  it('calls onPress', async () => {
    const onPress = jest.fn();
    await render(
      <Pressable onPress={onPress} accessibilityLabel="Save">
        <Text>Save</Text>
      </Pressable>,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled and dims the surface', async () => {
    const onPress = jest.fn();
    await render(
      <Pressable onPress={onPress} disabled accessibilityLabel="Save">
        <Text>Save</Text>
      </Pressable>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(StyleSheet.flatten(button.props.style).opacity).toBe(
      lightTheme.opacity.disabled,
    );
  });

  it('reports loading as busy and blocks presses', async () => {
    const onPress = jest.fn();
    await render(
      <Pressable onPress={onPress} loading accessibilityLabel="Save">
        <Text>Save</Text>
      </Pressable>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeBusy();
  });
});
