import type { ReactNode } from 'react';

/** 12h period of a saved time; `null` for 24h. */
export type SelectTimeFormat = 'am' | 'pm' | null;

/** Hour cycle of the wheel. */
export type SelectTimeHourFormat = '12h' | '24h';

/** What `onSave` receives. */
export interface SelectTimeSaveData {
  /** `"HH:mm"`: 24h, or 12h together with `format`. */
  time: string;
  /** Period in 12h mode, `null` in 24h. */
  format: SelectTimeFormat;
}

/**
 * Bottom sheet with a time wheel and Reset / Save. Reset is two-step: an
 * edited saved time rolls back first, the next press clears it.
 */
export interface SelectTimeModalProps {
  /** Shown while true. */
  isVisible: boolean;
  /** Closes the sheet (set `isVisible` false). */
  onClose: () => void;
  /** The sheet is gone (after the leave animation). */
  onDismissed?: () => void;
  /** Sheet title, already translated. */
  title: string;
  /** Saved time, `"H:mm"` / `"HH:mm"` / `"HH:mm:ss"` in 24h notation. */
  defaultTime?: string;
  /** 24h "HH:mm" shown when there is no valid defaultTime; saveable as-is. */
  fallbackTime?: string;
  /** Called with the picked time on Save. */
  onSave: (data: SelectTimeSaveData) => void;
  /** Period of `defaultTime` in 12h mode. */
  defaultFormat: SelectTimeFormat;
  /**
   * Hour cycle of the wheel. Defaults to `'24h'`. New: the app read it from
   * `localFormat.hourFormat`.
   */
  hourFormat?: SelectTimeHourFormat;
  /** Text of the Reset button (the app's `translate('reset')`). */
  resetLabel: string;
  /** Text of the Save button (the app's `translate('save')`). */
  saveLabel: string;
  /**
   * Saving is controlled by the owner: Save no longer closes the sheet, and
   * while `true` the sheet is locked and Save shows a spinner.
   */
  isSaving?: boolean;
  /** Ask before closing with unsaved changes. Defaults to `true`. */
  isUnsavedCloseConfirmEnabled?: boolean;
  /**
   * Close request with unsaved changes (unless `isUnsavedCloseConfirmEnabled`
   * is `false`): show the discard confirmation and call `discard` to close.
   * Without it the sheet closes at once. New: the app called
   * `useUnsavedChanges().requestConfirmation(true, onClose)` itself.
   */
  onUnsavedCloseRequest?: (discard: () => void) => void;
  /**
   * Overlays drawn above the sheet's content, inside its layer (the app's
   * `modalUnsavedChanges` confirmation).
   */
  nestedOverlays?: ReactNode;
  /**
   * Clears the saved time (second Reset press). A promise keeps the modal
   * locked until it settles; `false` or a rejection keeps it open.
   */
  onClear?: (() => void) | (() => Promise<boolean>);
}
