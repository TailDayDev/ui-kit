import type { ReactNode } from 'react';
import type { PercentageValueFieldProps } from '../PercentageValueField/index.js';
/**
 * Asks before discarding changes. With `hasChanges` false it must run
 * `onConfirm` at once; otherwise show a confirmation and run it on discard.
 * The app passes `useUnsavedChanges().requestConfirmation`.
 */
export type RequestDiscardConfirmation = (hasChanges: boolean, onConfirm: () => void) => void;
export interface EditPercentageModalProps {
    /** Value the field opens with. Defaults to 0. */
    defaultValue?: number | null;
    /** Header title. */
    title?: string;
    /** Close request: set `isVisible` false to close. */
    onClose: () => void;
    /** Shown while true. */
    isVisible: boolean;
    /** Fires once the modal is gone; the safe moment to unmount the owner. */
    onDismissed?: () => void;
    /** Save with the edited percentage. A rejection is swallowed (the owner shows the error). */
    onConfirm: (value: number) => Promise<void> | void;
    /** Text under the field. */
    description?: string | null;
    /** Save in flight: the modal is locked and Save shows a spinner. */
    isSaving?: boolean;
    /** Cancel button label. */
    cancelTitle: string;
    /** Save button label. */
    saveTitle: string;
    /** Slider of the field (see `PercentageValueField`). */
    renderSlider: PercentageValueFieldProps['renderSlider'];
    /**
     * Discard confirmation for Cancel / close with changes. Without it the
     * modal closes at once.
     */
    requestConfirmation?: RequestDiscardConfirmation;
    /** Overlays drawn above the modal (the app's unsaved-changes modal). */
    nestedOverlays?: ReactNode;
}
//# sourceMappingURL=EditPercentageModal.types.d.ts.map