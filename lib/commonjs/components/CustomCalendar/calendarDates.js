"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toUtcDayKey = exports.toLocalDayKeyOf = exports.isOnOrBefore = exports.isOnOrAfter = exports.getTodayKey = exports.getNextDayKey = void 0;
/**
 * Day-level date helpers that replace the app's `moment` calls. Days are
 * compared as `YYYY-MM-DD` keys, which sort the same as the dates.
 */

const DAY_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const pad = value => String(value).padStart(2, '0');
const toLocalDayKey = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/**
 * Calendar day of a date string in UTC (app: `moment.utc(value).format('YYYY-MM-DD')`).
 * A plain `YYYY-MM-DD` is kept as is; an unparsable value gives `''`.
 */
const toUtcDayKey = value => {
  if (DAY_KEY_PATTERN.test(value)) {
    return value;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
};

/**
 * Calendar day of a date string in local time (app: `moment(value)` compared by `'day'`).
 * A plain `YYYY-MM-DD` is kept as is; an unparsable value gives `''`.
 */
exports.toUtcDayKey = toUtcDayKey;
const toLocalDayKeyOf = value => {
  if (DAY_KEY_PATTERN.test(value)) {
    return value;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : toLocalDayKey(date);
};

/** Today as a local `YYYY-MM-DD` key. */
exports.toLocalDayKeyOf = toLocalDayKeyOf;
const getTodayKey = () => toLocalDayKey(new Date());

/** `true` when `day` is on or after `bound`; a missing bound always passes. */
exports.getTodayKey = getTodayKey;
const isOnOrAfter = (day, bound) => {
  if (!bound) {
    return true;
  }
  const dayKey = toLocalDayKeyOf(day);
  const boundKey = toLocalDayKeyOf(bound);
  return Boolean(dayKey && boundKey) && dayKey >= boundKey;
};

/** `true` when `day` is on or before `bound`; a missing bound always passes. */
exports.isOnOrAfter = isOnOrAfter;
const isOnOrBefore = (day, bound) => {
  if (!bound) {
    return true;
  }
  const dayKey = toLocalDayKeyOf(day);
  const boundKey = toLocalDayKeyOf(bound);
  return Boolean(dayKey && boundKey) && dayKey <= boundKey;
};

/** The `YYYY-MM-DD` key of the day after `dayKey`. */
exports.isOnOrBefore = isOnOrBefore;
const getNextDayKey = dayKey => {
  const [year = 0, month = 1, day = 1] = dayKey.split('-').map(Number);
  const next = new Date(Date.UTC(year, month - 1, day + 1));
  return next.toISOString().slice(0, 10);
};
exports.getNextDayKey = getNextDayKey;
//# sourceMappingURL=calendarDates.js.map