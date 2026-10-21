import type { PercentageValueFieldProps } from './PercentageValueField.types.js';
export declare const PERCENTAGE_VALUE_MAX = 100;
export declare const clampPercentageValue: (value: number) => number;
export declare const isPercentageValueInput: (value: number) => boolean;
/**
 * Large percentage value with a slider and 0 % / 100 % labels
 * (app `shared/ui/percentage-value-field`). The slider comes from `renderSlider`.
 */
export declare const PercentageValueField: ({ value, onChange, renderSlider, testID, accessibilityLabel, }: PercentageValueFieldProps) => import("react").JSX.Element;
//# sourceMappingURL=PercentageValueField.d.ts.map