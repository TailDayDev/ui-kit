import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayDoorButton } from './TodayDoorButton';

describe('TodayDoorButton', () => {
  it('renders the Figma frame: 48pt soft-gray bar, radius 8, padding 16/32', async () => {
    await render(<TodayDoorButton label="Заселить" />);
    const button = screen.getByRole('button', { name: 'Заселить' });
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: lightTheme.colors.bg.subtle,
      borderRadius: 8,
      height: 48,
      paddingHorizontal: 32,
      paddingVertical: 16,
      opacity: 1,
    });
    expect(
      StyleSheet.flatten(screen.getByText('Заселить').props.style),
    ).toMatchObject({
      ...lightTheme.typography.headline.medium,
      color: lightTheme.colors.text.primary,
    });
  });

  it('calls onPress', async () => {
    const onPress = jest.fn();
    await render(<TodayDoorButton label="Заселить" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Заселить' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled and dimmed when isDisabled', async () => {
    const onPress = jest.fn();
    await render(
      <TodayDoorButton
        label="Выселить"
        accessibilityLabel="Выселить Барсика"
        onPress={onPress}
        isDisabled
      />,
    );
    const button = screen.getByRole('button', { name: 'Выселить Барсика' });
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(StyleSheet.flatten(button.props.style).opacity).toBe(
      lightTheme.opacity.disabled,
    );
  });
});
