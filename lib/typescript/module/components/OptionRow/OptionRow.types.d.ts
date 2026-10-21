import type { StyleProp, ViewStyle } from 'react-native';
/** Single-choice text row (Figma `OptionRow`): a skip reason, a part of the day. */
export interface OptionRowProps {
    /** Row text. Figma TEXT `label`. */
    label: string;
    /** Selected look: soft accent fill, accent border and text. Figma VARIANT `isSelected`. Defaults to `false`. */
    isSelected?: boolean;
    /** Called on tap. Without it the row is still a radio for screen readers but does nothing. */
    onPress?: () => void;
    /** Blocks the press and dims the row (`theme.opacity.disabled`). Not in Figma. */
    disabled?: boolean;
    /** Screen-reader label. Defaults to `label`. */
    accessibilityLabel?: string;
    /** Outer layout style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the row. */
    testID?: string;
}
//# sourceMappingURL=OptionRow.types.d.ts.map