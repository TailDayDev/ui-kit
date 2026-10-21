import type { WheelPickerDateField } from './WheelPicker.types.js';
export declare const lbsToKg: (lbs: number) => number;
export declare const kgToLbs: (kg: number) => number;
/** Weight label value: one decimal at most, no "-0". */
export declare const formatWeightDisplayValue: (weight: number) => string;
/** Day / month / year order of a numeric date in `locale` (app `getDateFieldOrder`). */
export declare const getDateFieldOrder: (locale?: string) => WheelPickerDateField[];
/** At least 3 rows and always odd, so one row sits in the middle. */
export declare const getNormalizedVisibleItemCount: (visibleItemCount: number) => number;
//# sourceMappingURL=wheelHelpers.d.ts.map