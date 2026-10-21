import { StyleSheet } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { lightTheme } from '../../theme';
import { TodayManualDuePickerContent } from './TodayManualDuePickerContent';
import type { TodayManualDuePickerContentProps } from './TodayManualDuePickerContent.types';

const LABELS = {
  noTimeTitle: 'No time',
  noTimeDescription: 'All day',
  dayPartTitle: 'Part of day',
  dayPartDescription: 'Morning to night',
  exactTimeTitle: 'Exact time',
  exactTimeDescription: 'At a time',
  morning: 'Morning',
  day: 'Day',
  evening: 'Evening',
  night: 'Night',
};

const renderContent = (
  props: Partial<TodayManualDuePickerContentProps> = {},
) => {
  const callbacks = {
    onModeChange: jest.fn(),
    onDayPartChange: jest.fn(),
    onTimeChange: jest.fn(),
  };
  return render(
    <TodayManualDuePickerContent
      testID="due"
      labels={LABELS}
      {...callbacks}
      {...props}
    />,
  ).then(() => callbacks);
};

const styleOf = (testID: string) =>
  StyleSheet.flatten(
    screen.getByTestId(testID, { includeHiddenElements: true }).props.style,
  );

describe('TodayManualDuePickerContent', () => {
  it('mode=noTime: the mode card only, "No time" checked', async () => {
    await renderContent();
    expect(styleOf('due')).toMatchObject({
      paddingTop: 12,
      paddingHorizontal: 24,
      gap: 16,
      backgroundColor: lightTheme.colors.bg.surface,
    });
    expect(
      screen.getByRole('radio', { name: 'No time', checked: true }),
    ).toBeTruthy();
    expect(
      screen.getByRole('radio', { name: 'Part of day', checked: false }),
    ).toBeTruthy();
    expect(screen.getByText('All day')).toBeTruthy();
    expect(screen.queryByText('Morning')).toBeNull();
    expect(screen.queryByTestId('due.time')).toBeNull();
  });

  it('mode=dayPart: day-part options with the selected one', async () => {
    const { onDayPartChange } = await renderContent({
      mode: 'dayPart',
      dayPart: 'morning',
    });
    expect(
      screen.getByRole('radio', { name: 'Part of day', checked: true }),
    ).toBeTruthy();
    expect(styleOf('due.dayPart.morning')).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderColor: lightTheme.colors.bg.accent,
    });
    await fireEvent.press(screen.getByRole('radio', { name: 'Evening' }));
    expect(onDayPartChange).toHaveBeenCalledWith('evening');
    expect(screen.queryByTestId('due.time')).toBeNull();
  });

  it('mode=exactTime: Figma wheel (38pt rows × 5, 240 wide in 12h) and reports the time', async () => {
    const { onTimeChange } = await renderContent({
      mode: 'exactTime',
      hourFormat: '12h',
      time: { hour: '08', minutes: '00', format: 'am' },
    });
    expect(
      screen.getByRole('radio', { name: 'Exact time', checked: true }),
    ).toBeTruthy();
    expect(styleOf('due.time')).toMatchObject({ width: 240, height: 190 });
    expect(
      StyleSheet.flatten(screen.getByText('am').props.style),
    ).toMatchObject({
      fontFamily: lightTheme.typography.title.regular.fontFamily,
      fontSize: lightTheme.typography.title.regular.fontSize,
    });
    await fireEvent.press(screen.getByRole('button', { name: '09' }));
    expect(onTimeChange).toHaveBeenCalledWith({
      hour: '09',
      minutes: '00',
      format: 'am',
    });
  });

  it('defaults the wheel to 08:00 and drops the am/pm column in 24h', async () => {
    await renderContent({ mode: 'exactTime' });
    expect(styleOf('due.time')).toMatchObject({ width: 182 });
    expect(
      screen.getByRole('button', { name: '08', selected: true }),
    ).toBeTruthy();
    expect(screen.queryByText('am')).toBeNull();
  });

  it('reports the tapped mode', async () => {
    const { onModeChange } = await renderContent();
    await fireEvent.press(screen.getByRole('radio', { name: 'Exact time' }));
    expect(onModeChange).toHaveBeenCalledWith('exactTime');
  });
});
