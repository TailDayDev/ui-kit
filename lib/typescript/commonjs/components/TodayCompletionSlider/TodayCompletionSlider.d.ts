import type { TodayCompletionSliderProps } from './TodayCompletionSlider.types';
/** True when a release at `offset` is far enough to complete. */
export declare const isCompletionReached: (offset: number, maximumOffset: number) => boolean;
/**
 * «Готово!» slider of a Today task (Figma `TodayCompletionSlider`): drag the
 * purple handle to the right to mark the task done. The handle follows the
 * finger on the UI thread (gesture handler + Reanimated); JS is reached once
 * on release and once when the handle lands. Screen readers get an
 * `adjustable` element with an `activate`/`increment` action that completes
 * without swiping.
 */
export declare const TodayCompletionSlider: ({ completedLabel, isCompleted, isDisabled, onComplete, onDragStart, resetKey, accessibilityLabel, style, testID, }: TodayCompletionSliderProps) => import("react").JSX.Element;
//# sourceMappingURL=TodayCompletionSlider.d.ts.map