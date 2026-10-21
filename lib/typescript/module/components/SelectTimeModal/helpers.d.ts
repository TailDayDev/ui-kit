import type { WheelPickerTimeValue } from '../WheelPicker/index.js';
import type { SelectTimeFormat, SelectTimeHourFormat } from './SelectTimeModal.types.js';
type TimeMode = SelectTimeHourFormat;
type TimeFormat = SelectTimeFormat;
/** Wheel value: two-digit hour and minutes, period in 12h. */
export type SelectedTime = WheelPickerTimeValue;
export declare const isValidTime: (timeStr: string | undefined) => boolean;
export declare const parseDefaultTime: (timeStr: string | undefined, defaultFormat: TimeFormat, mode: TimeMode) => SelectedTime;
export {};
//# sourceMappingURL=helpers.d.ts.map