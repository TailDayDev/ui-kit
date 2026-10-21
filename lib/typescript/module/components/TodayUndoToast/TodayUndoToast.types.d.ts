import type { StyleProp, ViewStyle } from 'react-native';
/** «Undo» pill shown after a task is marked done (Figma `TodayUndoToast`). */
export interface TodayUndoToastProps {
    /** Pill text, e.g. «Отменить» (Figma layer «Отменить»; no Figma property). */
    label: string;
    /** Called on tap while the pill is fully shown. */
    onPress: () => void;
    /**
     * Shows the pill (slides up and fades in) or hides it (slides down, fades
     * out, then unmounts). Taps are ignored until the enter animation ends.
     * Defaults to true.
     */
    isVisible?: boolean;
    /** Blocks interaction without hiding the pill. */
    isDisabled?: boolean;
    /** Screen-reader text. Defaults to `label`. */
    accessibilityLabel?: string;
    /** Outer style, e.g. absolute positioning above the tab bar. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the button. */
    testID?: string;
}
//# sourceMappingURL=TodayUndoToast.types.d.ts.map