"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLastDayOfMonth = exports.getYearMonth = exports.getShiftedMonthEndKey = exports.getMonthStartKey = exports.getIsoWeekday = exports.getDaysInMonth = exports.getDayOfMonth = exports.diffInDays = exports.addDays = void 0;
/**
 * `YYYY-MM-DD` day-key arithmetic that replaces the app's `moment` calls in
 * the calendar modal. Keys are computed in UTC so no time zone or DST shift
 * can move a day; keys sort the same as the dates.
 */

const DAY_MS = 86_400_000;
const ISO_WEEKDAYS = 7;
const DAY_KEY_LENGTH = 10;
const toUtcMs = dayKey => {
  const [year = 0, month = 1, day = 1] = dayKey.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
};
const fromUtcMs = ms => new Date(ms).toISOString().slice(0, DAY_KEY_LENGTH);

/** Year and 0-based month of a day key. */
const getYearMonth = dayKey => {
  const date = new Date(toUtcMs(dayKey));
  return {
    year: date.getUTCFullYear(),
    monthIndex: date.getUTCMonth()
  };
};

/** Day of the month of a day key (app: `moment.date()`). */
exports.getYearMonth = getYearMonth;
const getDayOfMonth = dayKey => new Date(toUtcMs(dayKey)).getUTCDate();

/** Number of days in a month (`monthIndex` may overflow into the next years). */
exports.getDayOfMonth = getDayOfMonth;
const getDaysInMonth = (year, monthIndex) => new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();

/** ISO weekday, Monday 1 … Sunday 7 (app: `moment.isoWeekday()`). */
exports.getDaysInMonth = getDaysInMonth;
const getIsoWeekday = dayKey => (new Date(toUtcMs(dayKey)).getUTCDay() + ISO_WEEKDAYS - 1) % ISO_WEEKDAYS + 1;

/** `true` on the last day of its month. */
exports.getIsoWeekday = getIsoWeekday;
const isLastDayOfMonth = dayKey => {
  const {
    year,
    monthIndex
  } = getYearMonth(dayKey);
  return getDayOfMonth(dayKey) === getDaysInMonth(year, monthIndex);
};

/** The day key `days` days after `dayKey` (negative goes back). */
exports.isLastDayOfMonth = isLastDayOfMonth;
const addDays = (dayKey, days) => fromUtcMs(toUtcMs(dayKey) + days * DAY_MS);

/** Whole days from `fromKey` to `toKey` (app: `moment(to).diff(from, 'days')`). */
exports.addDays = addDays;
const diffInDays = (fromKey, toKey) => Math.round((toUtcMs(toKey) - toUtcMs(fromKey)) / DAY_MS);

/** First day of the month `monthOffset` months after the month of `dayKey`. */
exports.diffInDays = diffInDays;
const getMonthStartKey = (dayKey, monthOffset = 0) => {
  const {
    year,
    monthIndex
  } = getYearMonth(dayKey);
  return fromUtcMs(Date.UTC(year, monthIndex + monthOffset, 1));
};

/**
 * Last day of the app's marked window: `moment().endOf('month').add(n, 'month')`.
 * Like moment, the month-end day is clamped to the target month's length
 * (e.g. 30 Nov + 6 months is 30 May, not 31 May).
 */
exports.getMonthStartKey = getMonthStartKey;
const getShiftedMonthEndKey = (dayKey, monthOffset) => {
  const {
    year,
    monthIndex
  } = getYearMonth(dayKey);
  const monthEndDay = getDaysInMonth(year, monthIndex);
  const targetDays = getDaysInMonth(year, monthIndex + monthOffset);
  return fromUtcMs(Date.UTC(year, monthIndex + monthOffset, Math.min(monthEndDay, targetDays)));
};
exports.getShiftedMonthEndKey = getShiftedMonthEndKey;
//# sourceMappingURL=calendarModalDates.js.map