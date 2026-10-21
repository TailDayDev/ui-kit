import type { DateData } from 'react-native-calendars';
/** Month and weekday names registered in `react-native-calendars` `LocaleConfig`. */
export interface CustomCalendarLocale {
    /** Locale key, e.g. `'ru'`. Also remounts the calendar when it changes. */
    key: string;
    /** 12 full month names, January first. */
    monthNames: string[];
    /** 12 short month names, January first. */
    monthNamesShort: string[];
    /** 7 full weekday names, Sunday first. */
    dayNames: string[];
    /** 7 short weekday names, Sunday first (shown in the weekday row). */
    dayNamesShort: string[];
    /** "Today" text. Defaults to `'Today'`. */
    today?: string;
}
/** Single-month calendar with start / end range, multi-date and single-date selection. */
export interface CustomCalendarProps {
    /** Start date (any ISO string); also the shown month. */
    startDate: string;
    /** End date of a range. */
    endDate?: string;
    /** Range / start picking: called with a valid start day. */
    onStartDateSelect?: (day: DateData) => void;
    /** Range / end picking: called with a valid end day. */
    onEndDateSelect?: (day: DateData) => void;
    /** Multi-date mode: called for every tapped selectable day. */
    onDateToggle?: (day: DateData) => void;
    /** Days drawn as selected in multi-date mode (`YYYY-MM-DD`). */
    selectedDates?: string[];
    /** First weekday: 0 Sunday, 1 Monday. Defaults to 1 (app default week format `mon-sun`). */
    weekStartsOn?: 0 | 1;
    /** Range mode: the start day may be changed. Defaults to `true`. */
    canEditStartDate?: boolean;
    /** Range mode: the end day may be changed. Defaults to `true`. */
    canEditEndDate?: boolean;
    /** Earliest selectable start (and multi-date) day. */
    minStartDate?: string;
    /** Latest selectable start (and multi-date) day. */
    maxStartDate?: string;
    /** Earliest selectable end day. */
    minEndDate?: string;
    /** Latest selectable end day. */
    maxEndDate?: string;
    /** Fixed calendar height; day cells shrink to fit 6 weeks. */
    calendarHeight?: number;
    /** Draws only the end day (no range fill). */
    endDateOnlyPresentation?: boolean;
    /** Draws the start day as selected when there is no end. Defaults to `true`. */
    highlightStartDate?: boolean;
    /** Day drawn in red (e.g. a rejected end date). */
    invalidDate?: string;
    /** Marks repeat occurrences with a soft accent fill. */
    isOccurrenceDate?: (dateString: string) => boolean;
    /** End-only mode: called for a tapped day before the start instead of ignoring it. */
    onInvalidEndDateSelect?: (day: DateData) => void;
    /** Nutrition / medication schedule look: fixed 48×49 cells, small arrows, custom month title. */
    nutritionSchedulePresentation?: boolean;
    /** Extra per-day selectable check. */
    isDateSelectable?: (dateString: string) => boolean;
    /**
     * Month / weekday names (app: `prepareCalendarLocale(currentLanguage)`).
     * Registered in `LocaleConfig` and made the default. Without it the current
     * `LocaleConfig` default is used.
     */
    locale?: CustomCalendarLocale;
    /**
     * Month title of the nutrition presentation (app: `formatCalendarMonthTitle`).
     * Defaults to `"<monthNames[month]> <year>"` from `locale`, else `Intl` in the device locale.
     */
    formatMonthTitle?: (year: number, monthIndex: number) => string;
}
//# sourceMappingURL=CustomCalendar.types.d.ts.map