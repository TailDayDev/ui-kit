import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { ScrollToTodayButton } from './ScrollToTodayButton';

describe('ScrollToTodayButton', () => {
  it('renders the Figma circle: white fill, pale border, full radius, 80% opacity', async () => {
    await render(
      <ScrollToTodayButton accessibilityLabel="Сегодня" onPress={jest.fn()} />,
    );
    expect(
      StyleSheet.flatten(
        screen.getByRole('button', { name: 'Сегодня' }).props.style,
      ),
    ).toMatchObject({
      backgroundColor: lightTheme.colors.bg.surface,
      borderColor: lightTheme.colors.border.default,
      borderWidth: 1,
      borderRadius: lightTheme.radius.full,
      padding: 7,
      opacity: 0.8,
    });
  });

  it('calls onPress', async () => {
    const onPress = jest.fn();
    await render(
      <ScrollToTodayButton accessibilityLabel="Сегодня" onPress={onPress} />,
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Сегодня' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
