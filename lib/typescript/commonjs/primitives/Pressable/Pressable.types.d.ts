import type { PressableProps as RNPressableProps, StyleProp, ViewStyle } from 'react-native';
/** Tappable surface with the kit's pressed and disabled feedback built in. */
export interface PressableProps extends Omit<RNPressableProps, 'style'> {
    /** Called on tap. Not called while `disabled` or `loading`. */
    onPress?: RNPressableProps['onPress'];
    /** Blocks interaction and dims the surface (`theme.opacity.disabled`). */
    disabled?: boolean;
    /** Blocks interaction without dimming; reported as busy to screen readers. */
    loading?: boolean;
    /** Turns off the default pressed opacity, e.g. when the child draws its own pressed state. */
    isFeedbackDisabled?: boolean;
    /** Static style or a function of the pressed state. */
    style?: StyleProp<ViewStyle> | ((state: {
        pressed: boolean;
    }) => StyleProp<ViewStyle>);
}
//# sourceMappingURL=Pressable.types.d.ts.map