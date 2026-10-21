import { useEffect, useMemo, useState } from 'react';

import { PlatformWheel } from './PlatformWheel';
import { getDateFieldOrder } from './wheelHelpers';
import type {
  DateWheelProps,
  WheelPickerColumn,
  WheelPickerDateField,
  WheelPickerItem,
  WheelPickerValue,
} from './WheelPicker.types';

const DEFAULT_YEAR_RANGE = 100;
const MIN_MONTH_INDEX = 1;
const MAX_MONTH_INDEX = 12;
const LAST_MONTH_ZERO_BASED = 11;
const LAST_DAY_OF_DECEMBER = 31;
/** App widths of the day and year columns. */
const DAY_COLUMN_WIDTH = 116;
const YEAR_COLUMN_WIDTH = 116;

const formatDateUtc = (day: number, month: number, year: number) =>
  new Date(Date.UTC(year, month - 1, day)).toISOString();

const clampInRange = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** Day / month / year columns in the locale's order, clamped to a range. */
export const DateWheel = ({
  value,
  onChange,
  monthLabels,
  locale,
  minDateIso,
  maxDateIso,
  autoInitialize = true,
  containerStyle,
  itemTextStyle,
  selectionIndicatorStyle,
  itemHeight,
  visibleItemCount,
  testID,
}: DateWheelProps) => {
  const today = useMemo(() => new Date(), []);

  const parsedMinDate = useMemo(
    () => (minDateIso ? new Date(minDateIso) : null),
    [minDateIso],
  );
  const parsedMaxDate = useMemo(
    () => (maxDateIso ? new Date(maxDateIso) : null),
    [maxDateIso],
  );

  const minDate = useMemo(
    () =>
      parsedMinDate
        ? parsedMinDate
        : parsedMaxDate
          ? new Date(parsedMaxDate.getFullYear() - DEFAULT_YEAR_RANGE, 0, 1)
          : new Date(today.getFullYear() - DEFAULT_YEAR_RANGE, 0, 1),
    [parsedMaxDate, parsedMinDate, today],
  );
  const maxDate = useMemo(
    () =>
      parsedMaxDate
        ? parsedMaxDate
        : parsedMinDate
          ? new Date(
              parsedMinDate.getFullYear() + DEFAULT_YEAR_RANGE,
              LAST_MONTH_ZERO_BASED,
              LAST_DAY_OF_DECEMBER,
            )
          : today,
    [parsedMaxDate, parsedMinDate, today],
  );

  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();
  const minMonthBase = minDate.getMonth() + 1;
  const maxMonthBase = maxDate.getMonth() + 1;
  const minDayBase = minDate.getDate();
  const maxDayBase = maxDate.getDate();

  const initialDate = useMemo(() => {
    const rawDate = value ? new Date(value) : today;
    const clampedTime = clampInRange(
      rawDate.getTime(),
      minDate.getTime(),
      maxDate.getTime(),
    );
    return new Date(clampedTime);
  }, [maxDate, minDate, today, value]);

  const [day, setDay] = useState(initialDate.getDate());
  const [month, setMonth] = useState(initialDate.getMonth() + 1);
  const [year, setYear] = useState(initialDate.getFullYear());

  useEffect(() => {
    setDay(initialDate.getDate());
    setMonth(initialDate.getMonth() + 1);
    setYear(initialDate.getFullYear());
  }, [initialDate]);

  useEffect(() => {
    if (autoInitialize) {
      onChange(formatDateUtc(day, month, year));
    }
  }, [autoInitialize, day, month, year, onChange]);

  const yearOptions = useMemo(() => {
    const length = Math.max(1, maxYear - minYear + 1);
    return Array.from({ length }, (_, i) => maxYear - i);
  }, [maxYear, minYear]);

  const monthOptions = useMemo(() => {
    const minMonth = year === minYear ? minMonthBase : MIN_MONTH_INDEX;
    const maxMonth = year === maxYear ? maxMonthBase : MAX_MONTH_INDEX;
    return Array.from({ length: maxMonth - minMonth + 1 }, (_, i) => ({
      label: monthLabels[minMonth + i - 1] ?? String(minMonth + i),
      value: i + minMonth,
    }));
  }, [maxMonthBase, maxYear, minMonthBase, minYear, monthLabels, year]);

  const dayOptions = useMemo(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const minDay = year === minYear && month === minMonthBase ? minDayBase : 1;
    const maxDay =
      year === maxYear && month === maxMonthBase ? maxDayBase : daysInMonth;
    return Array.from({ length: maxDay - minDay + 1 }, (_, i) => i + minDay);
  }, [
    maxDayBase,
    maxMonthBase,
    maxYear,
    minDayBase,
    minMonthBase,
    minYear,
    month,
    year,
  ]);

  const fieldOrder = useMemo(() => getDateFieldOrder(locale), [locale]);

  const handleChangeDay = (nextDay: WheelPickerValue) => {
    const numericDay = Number(nextDay);
    setDay(numericDay);
    onChange(formatDateUtc(numericDay, month, year));
  };

  const handleChangeMonth = (nextMonth: WheelPickerValue) => {
    const numericMonth = Number(nextMonth);
    const daysInMonth = new Date(year, numericMonth, 0).getDate();
    const minDay =
      year === minYear && numericMonth === minMonthBase ? minDayBase : 1;
    const maxDay =
      year === maxYear && numericMonth === maxMonthBase
        ? maxDayBase
        : daysInMonth;
    const nextDay = clampInRange(day, minDay, maxDay);

    setMonth(numericMonth);
    setDay(nextDay);
    onChange(formatDateUtc(nextDay, numericMonth, year));
  };

  const handleChangeYear = (nextYear: WheelPickerValue) => {
    const numericYear = Number(nextYear);
    const minMonth = numericYear === minYear ? minMonthBase : MIN_MONTH_INDEX;
    const maxMonth = numericYear === maxYear ? maxMonthBase : MAX_MONTH_INDEX;
    const nextMonth = clampInRange(month, minMonth, maxMonth);
    const daysInMonth = new Date(numericYear, nextMonth, 0).getDate();
    const minDay =
      numericYear === minYear && nextMonth === minMonthBase ? minDayBase : 1;
    const maxDay =
      numericYear === maxYear && nextMonth === maxMonthBase
        ? maxDayBase
        : daysInMonth;
    const nextDay = clampInRange(day, minDay, maxDay);

    setYear(numericYear);
    setMonth(nextMonth);
    setDay(nextDay);
    onChange(formatDateUtc(nextDay, nextMonth, numericYear));
  };

  const buildColumn = (field: WheelPickerDateField): WheelPickerColumn => {
    if (field === 'day') {
      const items: WheelPickerItem[] = dayOptions.map(d => ({
        label: String(d),
        value: d,
      }));
      return {
        key: 'day',
        items,
        onValueChange: handleChangeDay,
        selectedValue: day,
        width: DAY_COLUMN_WIDTH,
      };
    }

    if (field === 'month') {
      return {
        key: 'month',
        flex: 1,
        items: monthOptions,
        onValueChange: handleChangeMonth,
        selectedValue: month,
      };
    }

    const items: WheelPickerItem[] = yearOptions.map(y => ({
      label: String(y),
      value: y,
    }));
    return {
      key: 'year',
      items,
      onValueChange: handleChangeYear,
      selectedValue: year,
      width: YEAR_COLUMN_WIDTH,
    };
  };

  const columns = fieldOrder.map(buildColumn);

  return (
    <PlatformWheel
      columns={columns}
      containerStyle={containerStyle}
      itemHeight={itemHeight}
      itemTextStyle={itemTextStyle}
      selectionIndicatorStyle={selectionIndicatorStyle}
      testID={testID}
      visibleItemCount={visibleItemCount}
    />
  );
};
