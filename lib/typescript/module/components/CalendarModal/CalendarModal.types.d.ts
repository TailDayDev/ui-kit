import type { CustomCalendarLocale } from '../CustomCalendar/index.js';
/** Selected days as `YYYY-MM-DD` (or any ISO string for the initial range). */
export interface CalendarDateRange {
    /** First selected day. */
    startDate?: string;
    /** Last selected day; missing while only the start is picked. */
    endDate?: string;
}
/** `'range'` picks a stay (start + end), `'single'` picks one day. */
export type CalendarSelectionMode = 'range' | 'single';
/** Bottom-sheet calendar: seven stacked months, booked days struck out, Reset / Save footer. */
export interface CalendarModalProps {
    /** Shows the modal. */
    isVisible: boolean;
    /** Save tap with the picked days as `YYYY-MM-DD` (single mode: the same day twice). */
    onSave: (startDate: string, endDate: string) => void;
    /** Close request (X, backdrop, swipe, Back). */
    onClose: () => void;
    /** The sheet is gone. */
    onDismissed?: () => void;
    /** Days that cannot be picked (`YYYY-MM-DD`); a range may not span them. */
    bookedDates: string[];
    /** Selection shown on every opening and restored by Reset. */
    initialSelected: CalendarDateRange;
    /** Modal title. */
    title: string;
    /** Range (default) or single-day picking. Range mode also blocks past days. */
    selectionMode?: CalendarSelectionMode;
    /** Text of the Reset button (app: `translate('reset_button')`). */
    resetLabel: string;
    /** Text of the Save button (app: `translate('save')`). */
    saveLabel: string;
    /**
     * 7 short weekday names in display order, starting with `weekStartsOn`
     * (app: `useLocalizedWeekDays().shortWeekDays`).
     */
    weekDayLabels: string[];
    /** First weekday: 0 Sunday, 1 Monday. Defaults to 1 (app: `useLocalizedWeekDays().firstDayOfWeek`). */
    weekStartsOn?: 0 | 1;
    /**
     * Month / weekday names registered in `react-native-calendars` `LocaleConfig`
     * (app: `prepareCalendarLocale(currentLanguage)`). `locale.key` also drives the
     * default month title.
     */
    locale?: CustomCalendarLocale;
    /**
     * Month title above each month. Defaults to `Intl` "month year" in
     * `locale.key` (app: `formatCalendarMonthTitle(year, month, currentLanguage)`),
     * else in `en-US`.
     */
    formatMonthTitle?: (year: number, monthIndex: number) => string;
    /** Name of the modal for the app (registry, telemetry, tests). Defaults to `'Calendar Modal'`. */
    modalKey?: string;
}
//# sourceMappingURL=CalendarModal.types.d.ts.map