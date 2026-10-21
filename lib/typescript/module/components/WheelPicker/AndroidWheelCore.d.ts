import type { PlatformWheelProps } from './WheelPicker.types.js';
/** App wheel row height (off-scale: not in Figma Spacing). */
export declare const DEFAULT_ITEM_HEIGHT = 44;
export declare const DEFAULT_VISIBLE_ITEM_COUNT = 5;
/**
 * JS scroll wheel: Android, and iOS when a `selectionIndicatorStyle` is set.
 * Rows scale and fade with the distance from the centered row.
 */
export declare const AndroidWheelCore: ({ columns, columnGap, containerStyle, itemHeight, itemTextStyle, selectionIndicatorStyle, testID, visibleItemCount, }: PlatformWheelProps) => import("react").JSX.Element;
//# sourceMappingURL=AndroidWheelCore.d.ts.map