import type ReactModule from 'react';
import type { ReactElement } from 'react';
import type * as ReactNativeModule from 'react-native';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { LocaleConfig, type DateData } from 'react-native-calendars';

import { lightTheme } from '../../theme';
import {
  getNextDayKey,
  isOnOrAfter,
  isOnOrBefore,
  toUtcDayKey,
} from './calendarDates';
import { CustomCalendar } from './CustomCalendar';
import type { CustomCalendarLocale } from './CustomCalendar.types';

let mockCalendarProps: Record<string, unknown> = {};

jest.mock('react-native-calendars', () => {
  const ReactRuntime = jest.requireActual<typeof ReactModule>('react');
  const { View } = jest.requireActual<typeof ReactNativeModule>('react-native');
  return {
    Calendar: (props: Record<string, unknown>) => {
      mockCalendarProps = props;
      return ReactRuntime.createElement(View, { testID: 'calendar.mock' });
    },
    LocaleConfig: { defaultLocale: '', locales: {} },
  };
});

const RU_LOCALE: CustomCalendarLocale = {
  key: 'ru',
  monthNames: [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ],
  monthNamesShort: Array.from({ length: 12 }, (_, i) => `m${i}`),
  dayNames: Array.from({ length: 7 }, (_, i) => `d${i}`),
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};

const toDate = (dateString: string): DateData => {
  const [year = 0, month = 1, day = 1] = dateString.split('-').map(Number);
  return {
    dateString,
    day,
    month,
    year,
    timestamp: Date.UTC(year, month - 1, day),
  };
};

type DayRenderer = (props: {
  date: DateData;
  state: string;
}) => ReactElement | null;

/** Renders one calendar day cell the way the calendar would. */
const renderDay = async (dateString: string, state = '') => {
  const renderer = mockCalendarProps.dayComponent as DayRenderer;
  const element = renderer({ date: toDate(dateString), state });
  if (!element) {
    throw new Error('no day element');
  }
  await render(element);
  const cell = screen.getByRole('button');
  const label = screen.getByText(String(toDate(dateString).day));
  return {
    cell,
    cellStyle: StyleSheet.flatten(cell.props.style as StyleProp<ViewStyle>),
    textStyle: StyleSheet.flatten(label.props.style),
  };
};

describe('CustomCalendar', () => {
  beforeEach(() => {
    mockCalendarProps = {};
    LocaleConfig.defaultLocale = '';
    LocaleConfig.locales = {};
  });

  it('registers the given locale, week start and fixed height', async () => {
    await render(
      <CustomCalendar
        calendarHeight={350}
        startDate="2026-08-18"
        weekStartsOn={1}
        locale={RU_LOCALE}
      />,
    );
    expect(mockCalendarProps.firstDay).toBe(1);
    expect(mockCalendarProps.style).toEqual({ height: 350 });
    expect(mockCalendarProps.current).toBe('2026-08-18');
    expect(LocaleConfig.defaultLocale).toBe('ru');
    expect(LocaleConfig.locales.ru.dayNamesShort.slice(0, 2)).toEqual([
      'Вс',
      'Пн',
    ]);
  });

  it('starts the week on Monday by default and shows the UTC start day', async () => {
    await render(<CustomCalendar startDate="2026-08-18T23:30:00-05:00" />);
    expect(mockCalendarProps.firstDay).toBe(1);
    expect(mockCalendarProps.current).toBe('2026-08-19');
  });

  it('does not present the start boundary as selected in end-only mode', async () => {
    await render(
      <CustomCalendar
        calendarHeight={350}
        highlightStartDate={false}
        onEndDateSelect={jest.fn()}
        startDate="2026-08-18"
      />,
    );
    const { cellStyle } = await renderDay('2026-08-18');
    expect(cellStyle.backgroundColor).not.toBe(lightTheme.colors.bg.accent);
    expect(cellStyle.opacity).not.toBe(0.5);
  });

  it('matches the nutrition schedule calendar handoff', async () => {
    await render(
      <CustomCalendar
        calendarHeight={401}
        nutritionSchedulePresentation
        onStartDateSelect={jest.fn()}
        startDate="2026-08-18"
        weekStartsOn={1}
        formatMonthTitle={(year, month) =>
          `${RU_LOCALE.monthNames[month]} ${year} г.`
        }
      />,
    );

    const renderHeader = mockCalendarProps.renderHeader as (
      date: Date,
    ) => ReactElement<{ children: string }>;
    expect(renderHeader(new Date(2026, 7, 1)).props.children).toBe(
      'август 2026 г.',
    );

    const renderArrow = mockCalendarProps.renderArrow as (
      direction: 'left' | 'right',
    ) => ReactElement<{ style: StyleProp<ViewStyle> }>;
    expect(StyleSheet.flatten(renderArrow('left').props.style)).toMatchObject({
      height: 24,
      width: 24,
    });

    const calendarTheme = mockCalendarProps.theme as {
      'stylesheet.calendar.main': { container: ViewStyle; week: ViewStyle };
    };
    expect(calendarTheme['stylesheet.calendar.main'].container).toMatchObject({
      paddingHorizontal: 16,
      paddingTop: 16,
    });
    expect(calendarTheme['stylesheet.calendar.main'].week).toMatchObject({
      height: 49,
      justifyContent: 'space-between',
    });

    const { cellStyle, textStyle } = await renderDay('2026-08-18');
    expect(cellStyle).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accent,
      borderRadius: 8,
      height: 49,
      width: 48,
    });
    expect(textStyle).toMatchObject({
      color: lightTheme.colors.text.inverse,
      fontFamily: 'Inter-Regular',
      fontWeight: '400',
    });
  });

  it('builds the nutrition month title from the locale month names', async () => {
    await render(
      <CustomCalendar
        nutritionSchedulePresentation
        startDate="2026-08-18"
        locale={RU_LOCALE}
      />,
    );
    const renderHeader = mockCalendarProps.renderHeader as (
      date: Date,
    ) => ReactElement<{ children: string }>;
    expect(renderHeader(new Date(2026, 7, 1)).props.children).toBe(
      'август 2026',
    );
  });

  it('renders the nutrition end date without a range at the shared cell size', async () => {
    await render(
      <CustomCalendar
        calendarHeight={401}
        endDate="2026-08-27"
        endDateOnlyPresentation
        highlightStartDate={false}
        nutritionSchedulePresentation
        onEndDateSelect={jest.fn()}
        startDate="2026-08-15"
        weekStartsOn={1}
      />,
    );

    expect((await renderDay('2026-08-20')).cellStyle.backgroundColor).toBe(
      undefined,
    );
    expect((await renderDay('2026-08-15')).cellStyle.opacity).not.toBe(0.5);
    const endDay = await renderDay('2026-08-27');
    expect(endDay.cellStyle).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accent,
      borderRadius: 8,
      height: 49,
      width: 48,
    });
    expect(endDay.textStyle).toMatchObject({
      color: lightTheme.colors.text.inverse,
      fontFamily: lightTheme.typography.body.regular.fontFamily,
    });
  });

  it('uses the shared selected cell for multiple nutrition dates', async () => {
    const onDateToggle = jest.fn();
    await render(
      <CustomCalendar
        calendarHeight={401}
        minStartDate="2026-08-15"
        nutritionSchedulePresentation
        onDateToggle={onDateToggle}
        selectedDates={['2026-08-26']}
        startDate="2026-08-15"
        weekStartsOn={1}
      />,
    );
    expect(mockCalendarProps.minDate).toBe('2026-08-15');
    const { cell, cellStyle } = await renderDay('2026-08-26');
    expect(cellStyle).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accent,
      borderRadius: 8,
      height: 49,
      width: 48,
    });
    await fireEvent.press(cell);
    expect(onDateToggle).toHaveBeenCalledWith(toDate('2026-08-26'));

    const early = await renderDay('2026-08-10');
    expect(early.cell).toBeDisabled();
    expect(early.cellStyle.opacity).toBe(0.5);
  });

  it('fills a range and picks start then end within the bounds', async () => {
    const onStartDateSelect = jest.fn();
    const onEndDateSelect = jest.fn();
    await render(
      <CustomCalendar
        startDate="2026-08-10"
        onStartDateSelect={onStartDateSelect}
        onEndDateSelect={onEndDateSelect}
        maxEndDate="2026-08-20"
      />,
    );
    const later = await renderDay('2026-08-12');
    await fireEvent.press(later.cell);
    expect(onEndDateSelect).toHaveBeenCalledWith(toDate('2026-08-12'));
    const tooLate = await renderDay('2026-08-25');
    expect(tooLate.cell).toBeDisabled();
    const earlier = await renderDay('2026-08-05');
    await fireEvent.press(earlier.cell);
    expect(onStartDateSelect).toHaveBeenCalledWith(toDate('2026-08-05'));
  });

  it('draws the range start, middle and end', async () => {
    await render(
      <CustomCalendar
        startDate="2026-08-10"
        endDate="2026-08-13"
        canEditStartDate={false}
        canEditEndDate={false}
      />,
    );
    const startDay = await renderDay('2026-08-10');
    expect(startDay.cellStyle).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      borderTopLeftRadius: 8,
    });
    expect(startDay.textStyle.color).toBe(lightTheme.colors.text.accent);
    const middle = await renderDay('2026-08-11');
    expect(middle.cellStyle.backgroundColor).toBe(
      lightTheme.colors.bg.accentSoft,
    );
    expect(middle.cellStyle.opacity).toBe(0.5);
    const beforeEnd = await renderDay('2026-08-12');
    expect(beforeEnd.cellStyle).toMatchObject({
      marginLeft: -10,
      width: '110%',
    });
    const endDay = await renderDay('2026-08-13');
    expect(endDay.cellStyle.backgroundColor).toBe(lightTheme.colors.bg.accent);
    expect(endDay.textStyle).toMatchObject({
      color: lightTheme.colors.text.inverse,
      fontFamily: lightTheme.typography.body.bold.fontFamily,
    });
  });

  it('reports an end before the start as invalid and draws the invalid date red', async () => {
    const onInvalidEndDateSelect = jest.fn();
    const onEndDateSelect = jest.fn();
    await render(
      <CustomCalendar
        startDate="2026-08-10"
        onEndDateSelect={onEndDateSelect}
        onInvalidEndDateSelect={onInvalidEndDateSelect}
        invalidDate="2026-08-05"
      />,
    );
    const invalid = await renderDay('2026-08-05');
    expect(invalid.cellStyle.backgroundColor).toBe(
      lightTheme.colors.text.error,
    );
    await fireEvent.press(invalid.cell);
    expect(onInvalidEndDateSelect).toHaveBeenCalledWith(toDate('2026-08-05'));
    expect(onEndDateSelect).not.toHaveBeenCalled();
  });
});

describe('calendarDates', () => {
  it('reads the UTC day of an ISO string and keeps plain days', () => {
    expect(toUtcDayKey('2026-08-18')).toBe('2026-08-18');
    expect(toUtcDayKey('2026-08-18T23:30:00-05:00')).toBe('2026-08-19');
    expect(toUtcDayKey('nope')).toBe('');
  });

  it('compares days with optional bounds', () => {
    expect(isOnOrAfter('2026-08-18', undefined)).toBe(true);
    expect(isOnOrAfter('2026-08-18', '2026-08-18')).toBe(true);
    expect(isOnOrAfter('2026-08-17', '2026-08-18')).toBe(false);
    expect(isOnOrBefore('2026-08-19', '2026-08-18')).toBe(false);
    expect(isOnOrBefore('2026-08-18', 'bad')).toBe(false);
  });

  it('steps to the next day across month and year ends', () => {
    expect(getNextDayKey('2026-02-28')).toBe('2026-03-01');
    expect(getNextDayKey('2026-12-31')).toBe('2027-01-01');
  });
});
