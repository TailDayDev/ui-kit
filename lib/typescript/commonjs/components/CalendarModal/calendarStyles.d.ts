import type { ComponentProps } from 'react';
import type { ViewStyle } from 'react-native';
import type { Calendar } from 'react-native-calendars';
import type { Theme } from '../../theme';
type CalendarProps = ComponentProps<typeof Calendar>;
type CalendarTheme = NonNullable<CalendarProps['theme']>;
/** `markedDates` of `react-native-calendars`. */
export type CalendarMarkedDates = NonNullable<CalendarProps['markedDates']>;
/** One day's marking in `markedDates`. */
export type CalendarMarkedDate = CalendarMarkedDates[string];
/** App day cell height (off-scale: not in Figma Spacing). */
export declare const DAY_SIZE = 44;
export declare const DAY_GAP = 2;
/** Selected day above its range neighbours. */
export declare const Z_INDEX_SELECTED = 2;
/** App: pulls the week rows together (off-scale). */
export declare const MARGIN_BOTTOM_ADJUST = -6;
/** Months before the current one that get the default day look. */
export declare const MONTHS_PAST = 1;
/** Months after the current one that get the default day look. */
export declare const MONTHS_FUTURE = 6;
/** Range mode: tapping the start day again picks one night. */
export declare const ONE_NIGHT_ADD_DAYS = 1;
type CalendarDayGridTheme = CalendarTheme & {
    'stylesheet.calendar.main': Record<'dayContainer' | 'emptyDayContainer' | 'week', ViewStyle>;
};
export declare const CALENDAR_DAY_GRID_THEME: CalendarDayGridTheme;
export declare const getDefaultDayStyles: (theme: Theme, isPast: boolean) => CalendarMarkedDate;
export declare const getBookedDayStyles: (theme: Theme) => CalendarMarkedDate;
export declare const getStartDayStyles: (theme: Theme) => CalendarMarkedDate;
export declare const getEndDayStyles: (theme: Theme) => CalendarMarkedDate;
/** A day inside a range; `dayOfWeek` is ISO (Monday 1 … Sunday 7). */
export declare const getMiddleDayStyles: (theme: Theme, dayOfWeek: number, isFirstDayOfMonth: boolean, isLastDayOfMonth: boolean) => CalendarMarkedDate;
export declare const getSingleDayStyles: (theme: Theme) => CalendarMarkedDate;
/**
 * Lays `overlay` over `base` (app `calendarUtils.composeDayStyles`): container
 * and text styles merge, the container is fully opaque.
 */
export declare const composeDayStyles: (base: CalendarMarkedDate, overlay: CalendarMarkedDate) => CalendarMarkedDate;
/**
 * Drops the library's own selection and makes the day fully opaque
 * (app `calendarUtils.solidify`).
 */
export declare const solidify: (style: CalendarMarkedDate) => CalendarMarkedDate;
export {};
//# sourceMappingURL=calendarStyles.d.ts.map