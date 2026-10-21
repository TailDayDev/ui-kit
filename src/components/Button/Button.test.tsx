import { Keyboard, StyleSheet, Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { Button } from './Button';

describe('Button', () => {
  it('renders the title as an accessible button', async () => {
    await render(<Button title="Save" onPress={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy();
  });

  it('calls onPress and dismisses the keyboard', async () => {
    const onPress = jest.fn();
    const dismiss = jest.spyOn(Keyboard, 'dismiss');
    await render(<Button title="Save" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(dismiss).toHaveBeenCalled();
    dismiss.mockRestore();
  });

  it('forwards onPressIn', async () => {
    const onPressIn = jest.fn();
    await render(
      <Button title="Save" onPress={jest.fn()} onPressIn={onPressIn} />,
    );
    await fireEvent(screen.getByRole('button', { name: 'Save' }), 'pressIn');
    expect(onPressIn).toHaveBeenCalledTimes(1);
  });

  it('does not press when disabled and uses the disabled fill', async () => {
    const onPress = jest.fn();
    await render(<Button title="Save" onPress={onPress} disabled />);
    const button = screen.getByRole('button', { name: 'Save' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(StyleSheet.flatten(button.props.style).backgroundColor).toBe(
      lightTheme.palette.paleGray,
    );
  });

  it('shows a spinner and blocks presses while loading', async () => {
    const onPress = jest.fn();
    await render(<Button title="Save" onPress={onPress} loading />);
    const button = screen.getByRole('button', { name: 'Save' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeBusy();
    expect(screen.queryByText('Save')).toBeNull();
  });

  it('renders danger as the Figma red button', async () => {
    await render(<Button title="Delete" style="danger" onPress={jest.fn()} />);
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(StyleSheet.flatten(button.props.style).backgroundColor).toBe(
      lightTheme.palette.red,
    );
    expect(
      StyleSheet.flatten(screen.getByText('Delete').props.style).color,
    ).toBe(lightTheme.colors.text.inverse);
  });

  it('renders link styles as pressable text', async () => {
    const onPress = jest.fn();
    await render(<Button title="Details" style="link" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Details' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('supports icon-only buttons with an accessibility label', async () => {
    await render(
      <Button
        title=""
        icon={<Text>+</Text>}
        accessibilityLabel="Add"
        onPress={jest.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: 'Add' })).toBeTruthy();
  });
});
