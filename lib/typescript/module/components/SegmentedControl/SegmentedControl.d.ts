import type { SegmentedControlProps } from './SegmentedControl.types.js';
/**
 * Segmented tabs with a sliding pill (app `shared/ui/service/uielements/SegmentedControl`).
 * The pill either follows a paged `scrollX` (RN Animated, interpolated) or
 * animates on the UI thread with Reanimated when the selection changes.
 */
export declare const SegmentedControl: ({ options, selectedIndex, onChange, testIDs, scrollX, screenWidth, syncWithScroll, isImmediatePressFeedback, animationDurationMs, }: SegmentedControlProps) => import("react").JSX.Element;
//# sourceMappingURL=SegmentedControl.d.ts.map