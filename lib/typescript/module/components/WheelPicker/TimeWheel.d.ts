import type { WheelPickerTimeProps } from './WheelPicker.types.js';
type TimeWheelProps = Omit<WheelPickerTimeProps, 'mode'>;
/** Hour + minutes (+ am/pm in 12h) columns. */
export declare const TimeWheel: ({ value, onChange, hourFormat, minuteInterval, columnGap, formatColumnWidth, containerStyle, itemTextStyle, selectionIndicatorStyle, itemHeight, visibleItemCount, testID, }: TimeWheelProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=TimeWheel.d.ts.map