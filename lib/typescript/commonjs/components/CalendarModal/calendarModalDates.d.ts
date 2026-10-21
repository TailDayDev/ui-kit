/**
 * `YYYY-MM-DD` day-key arithmetic that replaces the app's `moment` calls in
 * the calendar modal. Keys are computed in UTC so no time zone or DST shift
 * can move a day; keys sort the same as the dates.
 */
/** Year and 0-based month of a day key. */
export declare const getYearMonth: (dayKey: string) => {
    year: number;
    monthIndex: number;
};
/** Day of the month of a day key (app: `moment.date()`). */
export declare const getDayOfMonth: (dayKey: string) => number;
/** Number of days in a month (`monthIndex` may overflow into the next years). */
export declare const getDaysInMonth: (year: number, monthIndex: number) => number;
/** ISO weekday, Monday 1 … Sunday 7 (app: `moment.isoWeekday()`). */
export declare const getIsoWeekday: (dayKey: string) => number;
/** `true` on the last day of its month. */
export declare const isLastDayOfMonth: (dayKey: string) => boolean;
/** The day key `days` days after `dayKey` (negative goes back). */
export declare const addDays: (dayKey: string, days: number) => string;
/** Whole days from `fromKey` to `toKey` (app: `moment(to).diff(from, 'days')`). */
export declare const diffInDays: (fromKey: string, toKey: string) => number;
/** First day of the month `monthOffset` months after the month of `dayKey`. */
export declare const getMonthStartKey: (dayKey: string, monthOffset?: number) => string;
/**
 * Last day of the app's marked window: `moment().endOf('month').add(n, 'month')`.
 * Like moment, the month-end day is clamped to the target month's length
 * (e.g. 30 Nov + 6 months is 30 May, not 31 May).
 */
export declare const getShiftedMonthEndKey: (dayKey: string, monthOffset: number) => string;
//# sourceMappingURL=calendarModalDates.d.ts.map