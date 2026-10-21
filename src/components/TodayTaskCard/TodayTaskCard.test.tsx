import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../primitives/Text';
import { lightTheme } from '../../theme';
import { TodayTaskCard } from './TodayTaskCard';
import type { TodayTaskCardProps } from './TodayTaskCard.types';

const makeProps = (
  overrides: Partial<TodayTaskCardProps> = {},
): TodayTaskCardProps => ({
  testID: 'card',
  header: {
    badge: { label: 'Кормление' },
    time: { title: '10:30', subtitle: 'через 50 м' },
  },
  pet: <Text>Molly</Text>,
  details: <Text>Мытьё и сушка</Text>,
  footer: {
    onMenuPress: jest.fn(),
    menuAccessibilityLabel: 'Ещё действия',
    sliderProps: { completedLabel: 'Готово!', onComplete: jest.fn() },
  },
  skipReason: 'Отказался',
  ...overrides,
});

describe('TodayTaskCard', () => {
  it('renders header, pet, details and footer on the Figma card surface', async () => {
    await render(<TodayTaskCard {...makeProps()} />);
    expect(
      StyleSheet.flatten(screen.getByTestId('card').props.style),
    ).toMatchObject({
      backgroundColor: lightTheme.colors.bg.surface,
      borderRadius: lightTheme.radius.lg,
      boxShadow: [...lightTheme.shadows.block],
    });
    expect(screen.getByLabelText('Кормление')).toBeTruthy();
    expect(screen.getByText('10:30')).toBeTruthy();
    expect(screen.getByText('Molly')).toBeTruthy();
    expect(screen.getByText('Мытьё и сушка')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Ещё действия' })).toBeTruthy();
    expect(screen.queryByText('Отказался')).toBeNull();
    expect(screen.queryByTestId('card.veil')).toBeNull();
  });

  it('hides header, pet and details with the Figma booleans', async () => {
    await render(
      <TodayTaskCard
        {...makeProps({ hasHeader: false, hasPet: false, hasDetails: false })}
      />,
    );
    expect(screen.queryByText('10:30')).toBeNull();
    expect(screen.queryByText('Molly')).toBeNull();
    expect(screen.queryByText('Мытьё и сушка')).toBeNull();
    expect(screen.getByRole('button', { name: 'Ещё действия' })).toBeTruthy();
  });

  it('shows the skip reason when hasSkipReason', async () => {
    await render(<TodayTaskCard {...makeProps({ hasSkipReason: true })} />);
    expect(
      StyleSheet.flatten(screen.getByText('Отказался').props.style),
    ).toMatchObject({
      ...lightTheme.typography.caption.regular,
      color: lightTheme.colors.text.secondary,
    });
  });

  it('isFinished draws a 60% veil that opens the menu on tap', async () => {
    const props = makeProps({ isFinished: true });
    await render(<TodayTaskCard {...props} />);
    const veil = screen.getByTestId('card.veil');
    expect(StyleSheet.flatten(veil.props.style)).toMatchObject({
      position: 'absolute',
      backgroundColor: lightTheme.colors.bg.surface,
      opacity: 0.6,
    });
    await fireEvent.press(veil);
    expect(props.footer.onMenuPress).toHaveBeenCalledTimes(1);
  });

  it('the veil is disabled when the menu is disabled', async () => {
    const onMenuPress = jest.fn();
    await render(
      <TodayTaskCard
        {...makeProps({
          isFinished: true,
          footer: {
            onMenuPress,
            menuAccessibilityLabel: 'Ещё действия',
            isMenuDisabled: true,
            sliderProps: { completedLabel: 'Готово!', onComplete: jest.fn() },
          },
        })}
      />,
    );
    const veil = screen.getByTestId('card.veil');
    expect(veil.props.accessibilityState).toMatchObject({ disabled: true });
    await fireEvent.press(veil);
    expect(onMenuPress).not.toHaveBeenCalled();
  });
});
