import type { WheelPickerWeightProps } from './WheelPicker.types.js';
type WeightWheelProps = Omit<WheelPickerWeightProps, 'mode'>;
/** Weight columns: kg + grams (100 g steps), or one lbs column. */
export declare const WeightWheel: ({ unit, weightKg, onChange, unitLabels, containerStyle, itemTextStyle, selectionIndicatorStyle, itemHeight, visibleItemCount, testID, }: WeightWheelProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=WeightWheel.d.ts.map