import { useCallback, useEffect, useMemo, useState } from 'react';

import { useTheme } from '../../theme';
import { getTodayKey, toLocalDayKeyOf } from '../CustomCalendar/calendarDates';
import {
  addDays,
  diffInDays,
  getDayOfMonth,
  getIsoWeekday,
  getMonthStartKey,
  getShiftedMonthEndKey,
  isLastDayOfMonth,
} from './calendarModalDates';
import type {
  CalendarDateRange,
  CalendarSelectionMode,
} from './CalendarModal.types';
import {
  composeDayStyles,
  getBookedDayStyles,
  getDefaultDayStyles,
  getEndDayStyles,
  getMiddleDayStyles,
  getSingleDayStyles,
  getStartDayStyles,
  MONTHS_FUTURE,
  MONTHS_PAST,
  ONE_NIGHT_ADD_DAYS,
  solidify,
  type CalendarMarkedDates,
} from './calendarStyles';

/** Months stacked in the modal, starting with the month of the selection. */
const MONTHS_TO_DISPLAY = 7;

/** A month shown in the modal. */
export interface CalendarModalMonth {
  /** First day of the month, `YYYY-MM-DD`. */
  dateString: string;
}

/** Selection state and day marking of the calendar modal. */
export const useCalendar = (
  isVisible: boolean,
  initialSelected: CalendarDateRange,
  bookedDates: string[],
  selectionMode: CalendarSelectionMode = 'range',
) => {
  const theme = useTheme();

  const [selectedRange, setSelectedRange] =
    useState<CalendarDateRange>(initialSelected);
  const [lastPressed, setLastPressed] = useState<string | null>(null);

  const initialStartDate = initialSelected.startDate;
  const initialEndDate = initialSelected.endDate;

  useEffect(() => {
    // Keep the selection while the modal leaves; reset only on (re)open.
    if (!isVisible) return;
    setSelectedRange({
      startDate: initialStartDate,
      endDate: initialEndDate,
    });
  }, [isVisible, initialStartDate, initialEndDate]);

  const markedDates = useMemo(() => {
    const marked: CalendarMarkedDates = {};
    const todayKey = getTodayKey();

    bookedDates.forEach(date => {
      marked[date] = getBookedDayStyles(theme);
    });

    const { startDate, endDate } = selectedRange;
    const startDateStr = startDate ? toLocalDayKeyOf(startDate) : '';
    const endDateStr = endDate ? toLocalDayKeyOf(endDate) : '';

    if (startDate && endDate && startDate !== endDate) {
      const diff = diffInDays(startDateStr, endDateStr);

      // App `keepOnlySide` is left out: middle-day styles carry no filler
      // keys, so it returned them unchanged.
      const baseStartInner = getMiddleDayStyles(
        theme,
        getIsoWeekday(startDateStr),
        getDayOfMonth(startDateStr) === 1,
        isLastDayOfMonth(startDateStr),
      );
      const baseEndInner = getMiddleDayStyles(
        theme,
        getIsoWeekday(endDateStr),
        getDayOfMonth(endDateStr) === 1,
        isLastDayOfMonth(endDateStr),
      );

      marked[startDateStr] = solidify(
        composeDayStyles(baseStartInner, getStartDayStyles(theme)),
      );
      marked[endDateStr] = solidify(
        composeDayStyles(baseEndInner, getEndDayStyles(theme)),
      );

      for (let i = 1; i < diff; i++) {
        const dateStr = addDays(startDateStr, i);
        marked[dateStr] = getMiddleDayStyles(
          theme,
          getIsoWeekday(dateStr),
          getDayOfMonth(dateStr) === 1,
          isLastDayOfMonth(dateStr),
        );
      }
    }

    if (startDate && (!endDate || startDate === endDate)) {
      marked[startDateStr] = solidify(getSingleDayStyles(theme));
    }

    const visibleEnd = getShiftedMonthEndKey(todayKey, MONTHS_FUTURE);
    for (
      let dateStr = getMonthStartKey(todayKey, -MONTHS_PAST);
      dateStr <= visibleEnd;
      dateStr = addDays(dateStr, 1)
    ) {
      if (!marked[dateStr]) {
        marked[dateStr] = getDefaultDayStyles(theme, dateStr < todayKey);
      }
    }

    const lastPressedMarking = lastPressed ? marked[lastPressed] : undefined;
    if (lastPressed && lastPressedMarking) {
      marked[lastPressed] = solidify(lastPressedMarking);
    }

    return marked;
  }, [selectedRange, bookedDates, theme, lastPressed]);

  const getMarkedDates = useCallback(() => markedDates, [markedDates]);

  const onDayPress = (day: { dateString: string }) => {
    const { dateString } = day;
    setLastPressed(dateString);

    if (selectionMode === 'single') {
      setSelectedRange({ startDate: dateString, endDate: dateString });
      return;
    }

    if (
      !selectedRange.startDate ||
      (selectedRange.startDate && selectedRange.endDate)
    ) {
      setSelectedRange({ startDate: dateString, endDate: undefined });
      return;
    }

    const start = toLocalDayKeyOf(selectedRange.startDate);
    const end = toLocalDayKeyOf(dateString);
    const rangeStart = start < end ? start : end;
    const rangeEnd = start < end ? end : start;

    if (rangeStart === rangeEnd) {
      setSelectedRange({
        startDate: rangeStart,
        endDate: addDays(rangeStart, ONE_NIGHT_ADD_DAYS),
      });
      return;
    }

    const hasBookedInRange = bookedDates.some(booked => {
      const bookedKey = toLocalDayKeyOf(booked);
      return bookedKey > rangeStart && bookedKey < rangeEnd;
    });
    if (hasBookedInRange) {
      return;
    }

    setSelectedRange({ startDate: rangeStart, endDate: rangeEnd });
  };

  const monthsToDisplay = useMemo(() => {
    const firstMonth = getMonthStartKey(
      (selectedRange.startDate && toLocalDayKeyOf(selectedRange.startDate)) ||
        getTodayKey(),
    );
    return Array.from(
      { length: MONTHS_TO_DISPLAY },
      (_, index): CalendarModalMonth => ({
        dateString: getMonthStartKey(firstMonth, index),
      }),
    );
  }, [selectedRange.startDate]);

  return {
    getMarkedDates,
    markedDates,
    onDayPress,
    selectedRange,
    setSelectedRange,
    monthsToDisplay,
  };
};
