/** Texts of `ScheduleOverview`. */
export interface ScheduleOverviewLabels {
    /** Section title (app: `time_and_repeat`). */
    title: string;
    /** Timing row label (app: `execution_clock_time`). */
    timing: string;
    /** Repeat row label (app: `diet_repeat`). */
    repeat: string;
    /** Start row label (app: `start_repeats`). */
    start: string;
    /** End row label (app: `end_repeats`). */
    end: string;
}
/** Summary of a schedule: timing, repeat, start and end rows that open their pickers. */
export interface ScheduleOverviewProps {
    /** Texts. */
    labels: ScheduleOverviewLabels;
    /** End row value text. */
    endValue: string;
    /** End is set: accent value and a clear button (when `onClearEnd` is set). */
    isEndSelected: boolean;
    /** Repeat is set: accent value and a clear button. */
    isRepeatSelected: boolean;
    /** Start is set: accent value. */
    isStartSelected: boolean;
    /** Timing is set: accent value and a clear button. */
    isTimingSelected: boolean;
    /** Clears the end. */
    onClearEnd?: () => void;
    /** Clears the repeat. */
    onClearRepeat: () => void;
    /** Clears the timing. */
    onClearTiming: () => void;
    /** Opens the end picker. */
    onEndPress: () => void;
    /** Opens the repeat picker. */
    onRepeatPress: () => void;
    /** Opens the start picker. */
    onStartPress: () => void;
    /** Opens the timing picker. */
    onTimingPress: () => void;
    /** Repeat row value text. */
    repeatValue: string;
    /** Shows the end row. */
    showEnd: boolean;
    /** Shows the repeat row. */
    showRepeat: boolean;
    /** Shows the start row. */
    showStart: boolean;
    /** Shows the timing row. Defaults to `true`. */
    showTiming?: boolean;
    /** Start row value text. */
    startValue: string;
    /** Row test ids: `<prefix>.timing|repeat|start|end` (+ `.clear` / `.expand`). */
    testIDPrefix: string;
    /** Timing row value text. */
    timingValue: string;
}
//# sourceMappingURL=ScheduleOverview.types.d.ts.map