"use strict";

const DEFAULT_CALENDAR_LOCALE = 'en-US';
const DAY_KEY_PATTERN = /^(\d{4})-(\d{2})-\d{2}/;
const LAST_MONTH_INDEX = 11;

/**
 * Locale code `Intl` supports for `languageCode` (app
 * `calendarLocale.resolveCalendarLocaleCode`): the full code, else its base
 * language, else `en-US`.
 */
export const resolveCalendarLocaleCode = languageCode => {
  if (!languageCode) {
    return DEFAULT_CALENDAR_LOCALE;
  }
  const normalizedCode = languageCode.replace('_', '-').toLowerCase();
  const [baseCode] = normalizedCode.split('-');
  if (Intl.DateTimeFormat.supportedLocalesOf([normalizedCode]).length > 0) {
    return normalizedCode;
  }
  if (baseCode && Intl.DateTimeFormat.supportedLocalesOf([baseCode]).length > 0) {
    return baseCode;
  }
  return DEFAULT_CALENDAR_LOCALE;
};

/** "Month year" title of a month in `languageCode` (app `formatCalendarMonthTitle`). */
export const formatCalendarMonthTitle = (year, monthIndex, languageCode) => new Intl.DateTimeFormat(resolveCalendarLocaleCode(languageCode), {
  month: 'long',
  timeZone: 'UTC',
  year: 'numeric'
}).format(new Date(Date.UTC(year, monthIndex, 1)));

/**
 * Month title of the calendar modal for a `YYYY-MM-DD…` date string; `''`
 * for an unparsable one.
 */
export const formatCalendarModalMonthTitle = (dateString, languageCode) => {
  const match = DAY_KEY_PATTERN.exec(dateString);
  if (!match) {
    return '';
  }
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  if (monthIndex < 0 || monthIndex > LAST_MONTH_INDEX) {
    return '';
  }
  return formatCalendarMonthTitle(year, monthIndex, languageCode);
};
//# sourceMappingURL=formatCalendarModalMonthTitle.js.map