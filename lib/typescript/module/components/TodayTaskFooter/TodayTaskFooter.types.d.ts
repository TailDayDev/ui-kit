import type { StyleProp, ViewStyle } from 'react-native';
import type { TodayCompletionSliderProps } from '../TodayCompletionSlider/index.js';
import type { TodayDoorButtonProps } from '../TodayDoorButton/index.js';
import type { TodaySkippedActionProps } from '../TodaySkippedAction/index.js';
/** Figma VARIANT `action` of `TodayTaskFooter`. */
export type TodayTaskFooterAction = 'slider' | 'door' | 'skipped';
interface TodayTaskFooterBaseProps {
    /** Called when the «⋮» (more actions) button is tapped. */
    onMenuPress: () => void;
    /** Screen-reader text of the «⋮» button (it has no visible label). */
    menuAccessibilityLabel: string;
    /** Blocks and dims the «⋮» button (IconSquareButton `disabled`). */
    isMenuDisabled?: boolean;
    /** Shows a spinner in the «⋮» button (IconSquareButton `loading`). */
    isMenuLoading?: boolean;
    /** Test identifier of the «⋮» button. */
    menuTestID?: string;
    /** Outer style. The footer fills its parent's width. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the footer row. */
    testID?: string;
}
/** `action="slider"`: the «Готово!» swipe slider on the right. */
export interface TodayTaskFooterSliderProps extends TodayTaskFooterBaseProps {
    /** Figma VARIANT `action` (default `'slider'`). */
    action?: 'slider';
    /** Props of the nested `TodayCompletionSlider`. */
    sliderProps: TodayCompletionSliderProps;
}
/** `action="door"`: a full-width check-in / check-out / move button. */
export interface TodayTaskFooterDoorProps extends TodayTaskFooterBaseProps {
    /** Figma VARIANT `action`. */
    action: 'door';
    /** Props of the nested `TodayDoorButton`. */
    doorProps: TodayDoorButtonProps;
}
/** `action="skipped"`: the inactive «Пропущено» capsule on the right. */
export interface TodayTaskFooterSkippedProps extends TodayTaskFooterBaseProps {
    /** Figma VARIANT `action`. */
    action: 'skipped';
    /** Props of the nested `TodaySkippedAction`. */
    skippedProps: TodaySkippedActionProps;
}
/** Footer of a Today task card (Figma `TodayTaskFooter`). */
export type TodayTaskFooterProps = TodayTaskFooterSliderProps | TodayTaskFooterDoorProps | TodayTaskFooterSkippedProps;
export {};
//# sourceMappingURL=TodayTaskFooter.types.d.ts.map