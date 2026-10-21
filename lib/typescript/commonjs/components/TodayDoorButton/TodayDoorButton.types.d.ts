import type { StyleProp, ViewStyle } from 'react-native';
/** Booking action button in a Today card footer (Figma `TodayDoorButton`). */
export interface TodayDoorButtonProps {
    /** Button text, e.g. «Заселить». Figma TEXT `label`. */
    label: string;
    /** Called on tap. Not called while `isDisabled`. */
    onPress?: () => void;
    /**
     * Blocks interaction and dims the button (kit `opacity.disabled`, as the app
     * door button). Not a Figma property.
     */
    isDisabled?: boolean;
    /** Screen-reader text. Defaults to `label`. */
    accessibilityLabel?: string;
    /** Outer style. The button has no own width: it hugs its text or fills its parent. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier. */
    testID?: string;
}
//# sourceMappingURL=TodayDoorButton.types.d.ts.map