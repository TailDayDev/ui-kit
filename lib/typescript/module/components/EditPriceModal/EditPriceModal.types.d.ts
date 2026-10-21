import type { ReactNode } from 'react';
import type { KeyboardTypeOptions } from 'react-native';
/**
 * Asks before discarding changes. With `hasChanges` false it must run
 * `onConfirm` at once; otherwise show a confirmation and run it on discard.
 * The app passes `useUnsavedChanges().requestConfirmation`.
 */
export type RequestPriceDiscardConfirmation = (hasChanges: boolean, onConfirm: () => void) => void;
export interface EditPriceModalProps {
    /**
     * Amount the input opens with, already formatted for editing (major units,
     * the device decimal separator, e.g. `"15,00"`). `"0"`, `"0,00"`, `"0.00"`
     * and `""` open an empty input.
     */
    defaultValue: string;
    /** Header title. */
    title?: string;
    /** Close request: set `isVisible` false to close. */
    onClose: () => void;
    /** Shown while true. */
    isVisible: boolean;
    /** Fires once the modal is gone; the safe moment to unmount the owner. */
    onDismissed?: () => void;
    /** Save with the typed amount as entered (string, `.` or `,`). A rejection is swallowed. */
    onConfirm: (price: string) => Promise<void> | void;
    /** Text under the input. */
    description?: string;
    /** Kept for API compatibility with the app; not rendered. */
    unit?: string;
    /** Error text under the input. */
    error?: string;
    /**
     * Upper bound in major units (not cents). Typing above it is blocked and
     * Save is disabled. Without it only the digit limits apply.
     */
    max?: number;
    /**
     * Error shown when the amount is above `max`. The kit never formats prices:
     * the app returns the full text, e.g. `${translate('maximum_number')}: ${formatEntityPrice(...).formatted}`.
     */
    formatMaxError: (max: number) => string;
    /** Placeholder of the empty input (the app passes `getPriceInputPlaceholder()`, e.g. `"0,00"`). */
    placeholder: string;
    /** Save button label. */
    saveTitle: string;
    /** Save in flight: the modal is locked and Save shows a spinner. */
    isSaving?: boolean;
    /** Focuses the input when the modal opens. Defaults to `false`. */
    autoFocusInput?: boolean;
    /** Allows saving 0. Defaults to `false`. */
    isZeroAllowed?: boolean;
    /** Test id of the input. */
    inputTestID?: string;
    /** Test id of the Save button. */
    saveButtonTestID?: string;
    /** Test id of the close button. */
    closeButtonTestID?: string;
    /** Keyboard type. Defaults to `numbers-and-punctuation` (iOS) / `numeric`. */
    keyboardType?: KeyboardTypeOptions;
    /**
     * Discard confirmation for a close request with changes. Without it the
     * modal closes at once.
     */
    requestConfirmation?: RequestPriceDiscardConfirmation;
    /** Overlays drawn above the modal (the app's unsaved-changes modal). */
    nestedOverlays?: ReactNode;
}
//# sourceMappingURL=EditPriceModal.types.d.ts.map