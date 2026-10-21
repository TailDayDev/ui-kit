import type ReactModule from 'react';
import type { ReactElement } from 'react';
import type * as ReactNativeModule from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { LocaleConfig } from 'react-native-calendars';

import { lightTheme } from '../../theme';
import { getTodayKey } from '../CustomCalendar/calendarDates';
import { ModalLayerTestRoot, resetModalLayersForTests } from '../ModalLayer';
import { CalendarModal } from './CalendarModal';
import type { CalendarModalProps } from './CalendarModal.types';
import {
  addDays,
  diffInDays,
  getIsoWeekday,
  getMonthStartKey,
  getShiftedMonthEndKey,
} from './calendarModalDates';
import { formatCalendarModalMonthTitle } from './formatCalendarModalMonthTitle';

interface MockCalendarProps {
  current: string;
  minDate?: string;
  firstDay?: number;
  markedDates: Record<string, unknown>;
  onDayPress: (day: { dateString: string }) => void;
  renderHeader: () => ReactElement;
}

let mockCalendars: MockCalendarProps[] = [];

jest.mock('react-native-calendars', () => {
  const ReactRuntime = jest.requireActual<typeof ReactModule>('react');
  const { View } = jest.requireActual<typeof ReactNativeModule>('react-native');
  return {
    Calendar: (props: MockCalendarProps) => {
      mockCalendars.push(props);
      return ReactRuntime.createElement(
        View,
        { testID: `calendar.${props.current}` },
        props.renderHeader(),
      );
    },
    LocaleConfig: { defaultLocale: '', locales: {} },
  };
});

const CONTENT_LOADING_DELAY_MS = 300;
const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const FUTURE_START = addDays(getTodayKey(), 10);

const latestCalendar = () => {
  const calendar = mockCalendars[mockCalendars.length - 1];
  if (!calendar) {
    throw new Error('Calendar was not rendered');
  }
  return calendar;
};

const pressDay = async (dateString: string) => {
  await act(async () => {
    latestCalendar().onDayPress({ dateString });
  });
};

const renderModal = async (props: Partial<CalendarModalProps> = {}) => {
  const onSave = jest.fn();
  const onClose = jest.fn();
  await render(
    <CalendarModal
      isVisible
      onSave={onSave}
      onClose={onClose}
      bookedDates={[]}
      initialSelected={{}}
      title="Даты"
      resetLabel="Сбросить"
      saveLabel="Сохранить"
      weekDayLabels={WEEK_DAYS}
      formatMonthTitle={(year, monthIndex) => `month ${monthIndex} ${year}`}
      {...props}
    />,
    { wrapper: ModalLayerTestRoot },
  );
  await act(async () => {
    jest.advanceTimersByTime(CONTENT_LOADING_DELAY_MS);
    jest.runOnlyPendingTimers();
  });
  return { onSave, onClose };
};

describe('CalendarModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockCalendars = [];
  });

  afterEach(async () => {
    await act(() => {
      resetModalLayersForTests();
    });
    jest.useRealTimers();
  });

  it('renders the title, weekday labels and the footer buttons', async () => {
    await renderModal();
    expect(screen.getByText('Даты')).toBeTruthy();
    WEEK_DAYS.forEach(day => expect(screen.getByText(day)).toBeTruthy());
    expect(screen.getByRole('button', { name: 'Сбросить' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Сохранить' })).toBeDisabled();
  });

  it('shows a skeleton first, then seven months from the selected month', async () => {
    await render(
      <CalendarModal
        isVisible
        onSave={jest.fn()}
        onClose={jest.fn()}
        bookedDates={[]}
        initialSelected={{ startDate: '2026-11-20' }}
        title="Даты"
        resetLabel="Сбросить"
        saveLabel="Сохранить"
        weekDayLabels={WEEK_DAYS}
      />,
      { wrapper: ModalLayerTestRoot },
    );
    expect(
      screen.getByTestId('calendar-modal.skeleton', {
        includeHiddenElements: true,
      }),
    ).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(CONTENT_LOADING_DELAY_MS);
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByTestId('calendar.2026-11-01')).toBeTruthy();
    expect(screen.getByTestId('calendar.2027-05-01')).toBeTruthy();
    expect(screen.queryByTestId('calendar.2027-06-01')).toBeNull();
    // Default title: Intl "month year" (en-US without a locale).
    expect(screen.getByText('November 2026')).toBeTruthy();
  });

  it('uses formatMonthTitle and the locale for month titles', async () => {
    await renderModal({
      initialSelected: { startDate: '2026-10-05' },
      formatMonthTitle: undefined,
      locale: {
        key: 'ru',
        monthNames: [],
        monthNamesShort: [],
        dayNames: [],
        dayNamesShort: [],
      },
    });
    expect(screen.getByText('октябрь 2026 г.')).toBeTruthy();
    expect(LocaleConfig.defaultLocale).toBe('ru');
  });

  it('passes the week start and blocks past days only in range mode', async () => {
    await renderModal({ weekStartsOn: 0 });
    expect(latestCalendar().firstDay).toBe(0);
    expect(latestCalendar().minDate).toBe(getTodayKey());

    mockCalendars = [];
    await act(() => {
      resetModalLayersForTests();
    });
    await renderModal({ selectionMode: 'single' });
    expect(latestCalendar().minDate).toBeUndefined();
  });

  it('saves a picked range as day keys', async () => {
    const { onSave } = await renderModal();
    const end = addDays(FUTURE_START, 3);

    await pressDay(FUTURE_START);
    expect(screen.getByRole('button', { name: 'Сохранить' })).toBeDisabled();
    await pressDay(end);
    await fireEvent.press(screen.getByRole('button', { name: 'Сохранить' }));

    expect(onSave).toHaveBeenCalledWith(FUTURE_START, end);
  });

  it('turns a second tap on the start day into one night', async () => {
    const { onSave } = await renderModal();

    await pressDay(FUTURE_START);
    await pressDay(FUTURE_START);
    await fireEvent.press(screen.getByRole('button', { name: 'Сохранить' }));

    expect(onSave).toHaveBeenCalledWith(FUTURE_START, addDays(FUTURE_START, 1));
  });

  it('refuses a range across a booked day', async () => {
    await renderModal({ bookedDates: [addDays(FUTURE_START, 2)] });

    await pressDay(FUTURE_START);
    await pressDay(addDays(FUTURE_START, 4));

    expect(screen.getByRole('button', { name: 'Сохранить' })).toBeDisabled();
  });

  it('saves one day in single mode', async () => {
    const { onSave } = await renderModal({ selectionMode: 'single' });

    await pressDay('2026-09-18');
    await fireEvent.press(screen.getByRole('button', { name: 'Сохранить' }));

    expect(onSave).toHaveBeenCalledWith('2026-09-18', '2026-09-18');
  });

  it('resets to the initial selection', async () => {
    const initialEnd = addDays(FUTURE_START, 2);
    const { onSave } = await renderModal({
      initialSelected: { startDate: FUTURE_START, endDate: initialEnd },
    });

    await pressDay(addDays(FUTURE_START, 5));
    expect(screen.getByRole('button', { name: 'Сохранить' })).toBeDisabled();
    await fireEvent.press(screen.getByRole('button', { name: 'Сбросить' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Сохранить' }));

    expect(onSave).toHaveBeenCalledWith(FUTURE_START, initialEnd);
  });

  it('marks booked, range and selected days', async () => {
    const booked = addDays(FUTURE_START, 20);
    const end = addDays(FUTURE_START, 2);
    await renderModal({
      bookedDates: [booked],
      initialSelected: { startDate: FUTURE_START, endDate: end },
    });
    const marked = latestCalendar().markedDates as Record<
      string,
      { customStyles: { container: object; text: object } }
    >;

    expect(marked[booked]?.customStyles.text).toMatchObject({
      color: lightTheme.palette.lightGray,
      textDecorationLine: 'line-through',
    });
    expect(marked[FUTURE_START]?.customStyles.text).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accent,
      color: lightTheme.colors.text.inverse,
    });
    expect(
      marked[addDays(FUTURE_START, 1)]?.customStyles.container,
    ).toMatchObject({ backgroundColor: lightTheme.colors.bg.accentSoft });
    expect(marked[end]?.customStyles.container).toMatchObject({
      backgroundColor: lightTheme.colors.bg.accentSoft,
      opacity: 1,
    });
  });
});

describe('calendarModalDates', () => {
  it('does day-key arithmetic across months and years', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2024-03-01', -1)).toBe('2024-02-29');
    expect(diffInDays('2026-10-25', '2026-11-02')).toBe(8);
    expect(getMonthStartKey('2026-12-15', 2)).toBe('2027-02-01');
    expect(getMonthStartKey('2026-01-15', -1)).toBe('2025-12-01');
  });

  it('returns ISO weekdays', () => {
    expect(getIsoWeekday('2026-10-19')).toBe(1);
    expect(getIsoWeekday('2026-10-25')).toBe(7);
  });

  it('clamps the shifted month end like moment', () => {
    expect(getShiftedMonthEndKey('2026-11-10', 6)).toBe('2027-05-30');
    expect(getShiftedMonthEndKey('2026-08-10', 6)).toBe('2027-02-28');
    expect(getShiftedMonthEndKey('2026-10-10', 6)).toBe('2027-04-30');
  });
});

describe('formatCalendarModalMonthTitle', () => {
  it('localizes October 2026 for project languages', () => {
    expect(formatCalendarModalMonthTitle('2026-10-16', 'ru-RU')).toBe(
      'октябрь 2026 г.',
    );
    expect(formatCalendarModalMonthTitle('2026-10-16', 'en-US')).toBe(
      'October 2026',
    );
    expect(formatCalendarModalMonthTitle('2026-10-16', 'fr-FR')).toMatch(
      /octobre 2026/i,
    );
    expect(formatCalendarModalMonthTitle('2026-10-16', 'de-DE')).toMatch(
      /oktober 2026/i,
    );
    expect(formatCalendarModalMonthTitle('2026-10-16', 'es-MX')).toMatch(
      /octubre de 2026/i,
    );
    expect(formatCalendarModalMonthTitle('2026-10-16', 'zh-CN')).toMatch(
      /2026/,
    );
  });

  it('follows the language argument, not English defaults', () => {
    expect(formatCalendarModalMonthTitle('2026-10-16', 'ru-RU')).not.toMatch(
      /october/i,
    );
  });

  it('returns an empty title for an invalid date', () => {
    expect(formatCalendarModalMonthTitle('not-a-date', 'en-US')).toBe('');
  });
});
