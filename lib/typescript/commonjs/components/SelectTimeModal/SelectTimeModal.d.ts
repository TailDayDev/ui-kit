import type { SelectTimeModalProps } from './SelectTimeModal.types';
export declare const SELECT_TIME_MODAL_TEST_IDS: {
    readonly save: "select-time-modal.save";
    readonly reset: "select-time-modal.reset";
    readonly close: "select-time-modal.close";
    readonly wheel: "select-time-modal.wheel";
};
/** Time wheel in a bottom sheet with Reset / Save. */
export declare const SelectTimeModal: ({ isVisible, onClose, onDismissed, title, defaultTime, fallbackTime, onSave, defaultFormat, hourFormat, resetLabel, saveLabel, isSaving, isUnsavedCloseConfirmEnabled, onUnsavedCloseRequest, nestedOverlays, onClear, }: SelectTimeModalProps) => import("react").JSX.Element;
//# sourceMappingURL=SelectTimeModal.d.ts.map