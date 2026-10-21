import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { TaskSheetContentRow } from '../TaskSheetContent';
/** One action row of the sheet (same shape as `TaskSheetContent` rows). */
export type TaskSheetRowItem = TaskSheetContentRow;
/**
 * Task actions sheet (Figma `TaskSheet`): a `CustomModal` bottom sheet opened
 * from the task card's "⋮", with the kit `ModalHeader` (close button only by
 * default) and the `TaskSheetContent` rows.
 *
 * Figma VARIANT `rows` (1 | 2 | 3) is the number of non-destructive items in
 * `rows`; it is not a separate prop.
 */
export interface TaskSheetProps {
    /** Shown while true; hidden (animated out) when false. CustomModal `visible`. */
    isVisible: boolean;
    /**
     * Close request (× button, backdrop, Android Back). Set `isVisible` to false
     * to close; keep it to refuse. CustomModal `onClose`.
     */
    onClose: () => void;
    /** The sheet is gone; for hand-offs (navigation) that wait for it. CustomModal `onDismissed`. */
    onDismissed?: () => void;
    /**
     * Action rows in display order; destructive ones go to the separate block
     * below. Their count (1–3) is Figma VARIANT `rows`.
     */
    rows: readonly TaskSheetRowItem[];
    /** Screen-reader label of the close button (Figma `ModalHeader` › CloseButton). */
    closeAccessibilityLabel: string;
    /**
     * Header title (Figma `ModalHeader` TEXT `title`). Figma `TaskSheet` uses
     * `hasTitle=false`, so it is shown only when given.
     */
    title?: string;
    /**
     * Busy (e.g. a request is pending): rows and close controls are blocked.
     * CustomModal `isLocked`.
     */
    isLocked?: boolean;
    /**
     * Another sheet opened from this one replaces it: the menu turns invisible,
     * loses its backdrop and is locked, but stays mounted under the new sheet
     * (app `isMenuReplaced`). Defaults to `false`.
     */
    isReplaced?: boolean;
    /**
     * Modals opened from the sheet (skip reason, confirmations). Rendered inside
     * this modal's layer, never as siblings. CustomModal `nestedOverlays`.
     */
    nestedOverlays?: ReactNode;
    /** Name of the modal for the app (registry, telemetry, tests). */
    modalKey?: string;
    /** Test identifier of the close button. */
    closeTestID?: string;
    /** Extra style of the rows block (`TaskSheetContent`), applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the rows block (`TaskSheetContent`). */
    testID?: string;
}
//# sourceMappingURL=TaskSheet.types.d.ts.map