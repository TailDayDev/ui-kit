import type { ReactNode } from 'react';
/** One booked accommodation row, already formatted by the app. */
export interface MultipleResultsListItem {
    /** Stable React key. Defaults to the row index. */
    key?: string;
    /** Accommodation title. */
    title?: string;
    /**
     * Price line under the title, fully formatted (app: `formatEntityPrice`,
     * wrapped in `price_per_night_amount` for night stays).
     */
    priceText: string;
    /**
     * Formatted stay dates, top to bottom (app: `resolveStayDatePresentation`
     * + `formatDateIntl`). One date for a single day, two for a range.
     */
    dates: string[];
    /** Shows the `from` / `to` labels next to the dates. */
    isRange: boolean;
    /** 40×40 accommodation image (app: `DinamicImage`). Empty slot when absent. */
    image?: ReactNode;
}
/** Texts of `MultipleResultsList`. */
export interface MultipleResultsListLabels {
    /** Edit button title (app: `edit_btn`). */
    edit: string;
    /** Label before the first range date (app: `from`). Shown lowercase. */
    from: string;
    /** Label before the second range date (app: `too`). Shown lowercase. */
    to: string;
}
/** Card listing several accommodation bookings with dates, prices and an optional total. */
export interface MultipleResultsListProps {
    /** Card title. */
    title?: string;
    /** Booking rows. */
    items: MultipleResultsListItem[];
    /** Texts. */
    labels: MultipleResultsListLabels;
    /** Called by the edit button. */
    onEdit?: () => void;
    /** Vertically center a one-date column. Off by default so other lists stay flex-end. */
    isSingleDateCentered?: boolean;
    /** Formatted total. The total row is shown only when this is set. */
    totalValue?: string;
    /** Label of the total row. */
    totalLabel?: string;
}
//# sourceMappingURL=MultipleResultsList.types.d.ts.map