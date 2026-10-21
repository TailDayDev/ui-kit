/**
 * Day-level date helpers that replace the app's `moment` calls. Days are
 * compared as `YYYY-MM-DD` keys, which sort the same as the dates.
 */
/**
 * Calendar day of a date string in UTC (app: `moment.utc(value).format('YYYY-MM-DD')`).
 * A plain `YYYY-MM-DD` is kept as is; an unparsable value gives `''`.
 */
export declare const toUtcDayKey: (value: string) => string;
/**
 * Calendar day of a date string in local time (app: `moment(value)` compared by `'day'`).
 * A plain `YYYY-MM-DD` is kept as is; an unparsable value gives `''`.
 */
export declare const toLocalDayKeyOf: (value: string) => string;
/** Today as a local `YYYY-MM-DD` key. */
export declare const getTodayKey: () => string;
/** `true` when `day` is on or after `bound`; a missing bound always passes. */
export declare const isOnOrAfter: (day: string, bound?: string) => boolean;
/** `true` when `day` is on or before `bound`; a missing bound always passes. */
export declare const isOnOrBefore: (day: string, bound?: string) => boolean;
/** The `YYYY-MM-DD` key of the day after `dayKey`. */
export declare const getNextDayKey: (dayKey: string) => string;
//# sourceMappingURL=calendarDates.d.ts.map