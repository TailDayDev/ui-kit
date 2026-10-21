import type { CalendarDateRange, CalendarSelectionMode } from './CalendarModal.types';
/** A month shown in the modal. */
export interface CalendarModalMonth {
    /** First day of the month, `YYYY-MM-DD`. */
    dateString: string;
}
/** Selection state and day marking of the calendar modal. */
export declare const useCalendar: (isVisible: boolean, initialSelected: CalendarDateRange, bookedDates: string[], selectionMode?: CalendarSelectionMode) => {
    getMarkedDates: () => import("react-native-calendars/src/types").MarkedDates;
    markedDates: import("react-native-calendars/src/types").MarkedDates;
    onDayPress: (day: {
        dateString: string;
    }) => void;
    selectedRange: CalendarDateRange;
    setSelectedRange: import("react").Dispatch<import("react").SetStateAction<CalendarDateRange>>;
    monthsToDisplay: CalendarModalMonth[];
};
//# sourceMappingURL=useCalendar.d.ts.map