import type { ReactElement } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
/** Floating accent pill pinned to the bottom of its container, with show/hide animation. */
export interface FloatingButtonProps {
    /** Optional leading element, e.g. `<Icon icon={PlusIcon} color="text.inverse" />`. */
    icon?: ReactElement;
    /** Visible label. Also the accessibility label. */
    title: string;
    /** Called on tap. Not called while `disabled`. */
    onPress: () => void;
    /**
     * Shows or hides the pill with a fade + slide (180 ms in, 160 ms out).
     * The pill unmounts after hiding. Defaults to `true`.
     */
    visible?: boolean;
    /** Distance from the container bottom in points. Defaults to 40. */
    bottomOffset?: number;
    /** Blocks interaction and dims the pill to 0.5. */
    disabled?: boolean;
    /** Overrides for the pill itself, e.g. a fixed share of the screen width. */
    buttonStyle?: StyleProp<ViewStyle>;
    /** Test identifier of the pill. */
    testID?: string;
}
//# sourceMappingURL=FloatingButton.types.d.ts.map