"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateWheel = void 0;
var _react = require("react");
var _PlatformWheel = require("./PlatformWheel.js");
var _wheelHelpers = require("./wheelHelpers.js");
var _jsxRuntime = require("react/jsx-runtime");
const DEFAULT_YEAR_RANGE = 100;
const MIN_MONTH_INDEX = 1;
const MAX_MONTH_INDEX = 12;
const LAST_MONTH_ZERO_BASED = 11;
const LAST_DAY_OF_DECEMBER = 31;
/** App widths of the day and year columns. */
const DAY_COLUMN_WIDTH = 116;
const YEAR_COLUMN_WIDTH = 116;
const formatDateUtc = (day, month, year) => new Date(Date.UTC(year, month - 1, day)).toISOString();
const clampInRange = (value, min, max) => Math.min(Math.max(value, min), max);

/** Day / month / year columns in the locale's order, clamped to a range. */
const DateWheel = ({
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
  testID
}) => {
  const today = (0, _react.useMemo)(() => new Date(), []);
  const parsedMinDate = (0, _react.useMemo)(() => minDateIso ? new Date(minDateIso) : null, [minDateIso]);
  const parsedMaxDate = (0, _react.useMemo)(() => maxDateIso ? new Date(maxDateIso) : null, [maxDateIso]);
  const minDate = (0, _react.useMemo)(() => parsedMinDate ? parsedMinDate : parsedMaxDate ? new Date(parsedMaxDate.getFullYear() - DEFAULT_YEAR_RANGE, 0, 1) : new Date(today.getFullYear() - DEFAULT_YEAR_RANGE, 0, 1), [parsedMaxDate, parsedMinDate, today]);
  const maxDate = (0, _react.useMemo)(() => parsedMaxDate ? parsedMaxDate : parsedMinDate ? new Date(parsedMinDate.getFullYear() + DEFAULT_YEAR_RANGE, LAST_MONTH_ZERO_BASED, LAST_DAY_OF_DECEMBER) : today, [parsedMaxDate, parsedMinDate, today]);
  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();
  const minMonthBase = minDate.getMonth() + 1;
  const maxMonthBase = maxDate.getMonth() + 1;
  const minDayBase = minDate.getDate();
  const maxDayBase = maxDate.getDate();
  const initialDate = (0, _react.useMemo)(() => {
    const rawDate = value ? new Date(value) : today;
    const clampedTime = clampInRange(rawDate.getTime(), minDate.getTime(), maxDate.getTime());
    return new Date(clampedTime);
  }, [maxDate, minDate, today, value]);
  const [day, setDay] = (0, _react.useState)(initialDate.getDate());
  const [month, setMonth] = (0, _react.useState)(initialDate.getMonth() + 1);
  const [year, setYear] = (0, _react.useState)(initialDate.getFullYear());
  (0, _react.useEffect)(() => {
    setDay(initialDate.getDate());
    setMonth(initialDate.getMonth() + 1);
    setYear(initialDate.getFullYear());
  }, [initialDate]);
  (0, _react.useEffect)(() => {
    if (autoInitialize) {
      onChange(formatDateUtc(day, month, year));
    }
  }, [autoInitialize, day, month, year, onChange]);
  const yearOptions = (0, _react.useMemo)(() => {
    const length = Math.max(1, maxYear - minYear + 1);
    return Array.from({
      length
    }, (_, i) => maxYear - i);
  }, [maxYear, minYear]);
  const monthOptions = (0, _react.useMemo)(() => {
    const minMonth = year === minYear ? minMonthBase : MIN_MONTH_INDEX;
    const maxMonth = year === maxYear ? maxMonthBase : MAX_MONTH_INDEX;
    return Array.from({
      length: maxMonth - minMonth + 1
    }, (_, i) => ({
      label: monthLabels[minMonth + i - 1] ?? String(minMonth + i),
      value: i + minMonth
    }));
  }, [maxMonthBase, maxYear, minMonthBase, minYear, monthLabels, year]);
  const dayOptions = (0, _react.useMemo)(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const minDay = year === minYear && month === minMonthBase ? minDayBase : 1;
    const maxDay = year === maxYear && month === maxMonthBase ? maxDayBase : daysInMonth;
    return Array.from({
      length: maxDay - minDay + 1
    }, (_, i) => i + minDay);
  }, [maxDayBase, maxMonthBase, maxYear, minDayBase, minMonthBase, minYear, month, year]);
  const fieldOrder = (0, _react.useMemo)(() => (0, _wheelHelpers.getDateFieldOrder)(locale), [locale]);
  const handleChangeDay = nextDay => {
    const numericDay = Number(nextDay);
    setDay(numericDay);
    onChange(formatDateUtc(numericDay, month, year));
  };
  const handleChangeMonth = nextMonth => {
    const numericMonth = Number(nextMonth);
    const daysInMonth = new Date(year, numericMonth, 0).getDate();
    const minDay = year === minYear && numericMonth === minMonthBase ? minDayBase : 1;
    const maxDay = year === maxYear && numericMonth === maxMonthBase ? maxDayBase : daysInMonth;
    const nextDay = clampInRange(day, minDay, maxDay);
    setMonth(numericMonth);
    setDay(nextDay);
    onChange(formatDateUtc(nextDay, numericMonth, year));
  };
  const handleChangeYear = nextYear => {
    const numericYear = Number(nextYear);
    const minMonth = numericYear === minYear ? minMonthBase : MIN_MONTH_INDEX;
    const maxMonth = numericYear === maxYear ? maxMonthBase : MAX_MONTH_INDEX;
    const nextMonth = clampInRange(month, minMonth, maxMonth);
    const daysInMonth = new Date(numericYear, nextMonth, 0).getDate();
    const minDay = numericYear === minYear && nextMonth === minMonthBase ? minDayBase : 1;
    const maxDay = numericYear === maxYear && nextMonth === maxMonthBase ? maxDayBase : daysInMonth;
    const nextDay = clampInRange(day, minDay, maxDay);
    setYear(numericYear);
    setMonth(nextMonth);
    setDay(nextDay);
    onChange(formatDateUtc(nextDay, nextMonth, numericYear));
  };
  const buildColumn = field => {
    if (field === 'day') {
      const items = dayOptions.map(d => ({
        label: String(d),
        value: d
      }));
      return {
        key: 'day',
        items,
        onValueChange: handleChangeDay,
        selectedValue: day,
        width: DAY_COLUMN_WIDTH
      };
    }
    if (field === 'month') {
      return {
        key: 'month',
        flex: 1,
        items: monthOptions,
        onValueChange: handleChangeMonth,
        selectedValue: month
      };
    }
    const items = yearOptions.map(y => ({
      label: String(y),
      value: y
    }));
    return {
      key: 'year',
      items,
      onValueChange: handleChangeYear,
      selectedValue: year,
      width: YEAR_COLUMN_WIDTH
    };
  };
  const columns = fieldOrder.map(buildColumn);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PlatformWheel.PlatformWheel, {
    columns: columns,
    containerStyle: containerStyle,
    itemHeight: itemHeight,
    itemTextStyle: itemTextStyle,
    selectionIndicatorStyle: selectionIndicatorStyle,
    testID: testID,
    visibleItemCount: visibleItemCount
  });
};
exports.DateWheel = DateWheel;
//# sourceMappingURL=DateWheel.js.map