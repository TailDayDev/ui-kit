import type { StyleProp, ViewStyle } from 'react-native';
/** Swipe-to-complete control of a Today task (Figma `TodayCompletionSlider`). */
export interface TodayCompletionSliderProps {
    /**
     * Text shown in the completed state («Готово!»). Also the screen-reader
     * label and the name of the accessibility action. Figma TEXT `completedLabel`.
     */
    completedLabel: string;
    /**
     * Completed: label on the left, green handle on the right, no gesture.
     * Figma VARIANT `isCompleted` (default false).
     */
    isCompleted?: boolean;
    /**
     * Blocks the swipe and the accessibility action and dims the track to 0.6.
     * Figma VARIANT `isDisabled` (default false).
     */
    isDisabled?: boolean;
    /**
     * Called once when the handle is dragged past 80% of the track and lands at
     * the end, or when a screen reader triggers the complete action. The parent
     * then switches `isCompleted` on (or leaves it off to let the handle reset
     * on the next render of a different task).
     */
    onComplete: () => void;
    /**
     * Called when a drag starts, e.g. to prepare haptics. Not called for the
     * accessibility action.
     */
    onDragStart?: () => void;
    /**
     * Changes when the slider is reused for another task (list recycling): the
     * handle resets and a pending completion of the previous task is dropped.
     */
    resetKey?: string;
    /** Screen-reader label. Defaults to `completedLabel`. */
    accessibilityLabel?: string;
    /** Outer style of the track, e.g. margins. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the track. The handle gets `${testID}.handle`. */
    testID?: string;
}
//# sourceMappingURL=TodayCompletionSlider.types.d.ts.map