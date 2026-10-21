/**
 * Locale code `Intl` supports for `languageCode` (app
 * `calendarLocale.resolveCalendarLocaleCode`): the full code, else its base
 * language, else `en-US`.
 */
export declare const resolveCalendarLocaleCode: (languageCode?: string) => string;
/** "Month year" title of a month in `languageCode` (app `formatCalendarMonthTitle`). */
export declare const formatCalendarMonthTitle: (year: number, monthIndex: number, languageCode?: string) => string;
/**
 * Month title of the calendar modal for a `YYYY-MM-DD…` date string; `''`
 * for an unparsable one.
 */
export declare const formatCalendarModalMonthTitle: (dateString: string, languageCode?: string) => string;
//# sourceMappingURL=formatCalendarModalMonthTitle.d.ts.map