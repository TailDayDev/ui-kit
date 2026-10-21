import { StyleSheet, Text as RNText } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayDoorDetails } from './TodayDoorDetails';

const { text } = lightTheme.colors;
const color = (testID: string) =>
  StyleSheet.flatten(screen.getByTestId(testID).props.style).color;

describe('TodayDoorDetails', () => {
  it('check-in: both dates, check-in primary and check-out secondary', async () => {
    await render(
      <TodayDoorDetails
        testID="door"
        title="Room 12"
        checkInDate="12 May"
        checkOutDate="15 May"
        icon={<RNText>icon</RNText>}
      />,
    );
    expect(screen.getByText('icon')).toBeTruthy();
    const title = screen.getByText('Room 12');
    expect(title.props.numberOfLines).toBe(1);
    expect(StyleSheet.flatten(title.props.style)).toMatchObject(
      lightTheme.typography.body.bold,
    );
    expect(
      StyleSheet.flatten(screen.getByTestId('door.checkIn').props.style),
    ).toMatchObject({
      ...lightTheme.typography.body.regular,
      textAlign: 'right',
    });
    expect(color('door.checkIn')).toBe(text.primary);
    expect(color('door.checkOut')).toBe(text.secondary);
  });

  it('check-out: check-in secondary and check-out primary', async () => {
    await render(
      <TodayDoorDetails
        testID="door"
        actionType="CheckOut"
        title="Room 12"
        checkInDate="12 May"
        checkOutDate="15 May"
      />,
    );
    expect(color('door.checkIn')).toBe(text.secondary);
    expect(color('door.checkOut')).toBe(text.primary);
  });

  it.each([
    ['CheckIn', '12 May', '15 May'],
    ['CheckOut', '15 May', '12 May'],
  ] as const)(
    'daycare %s shows only its own date in primary',
    async (actionType, shown, hidden) => {
      await render(
        <TodayDoorDetails
          actionType={actionType}
          isDaycare
          title="Daycare"
          checkInDate="12 May"
          checkOutDate="15 May"
        />,
      );
      expect(
        StyleSheet.flatten(screen.getByText(shown).props.style).color,
      ).toBe(text.primary);
      expect(screen.queryByText(hidden)).toBeNull();
    },
  );
});
