import type { ReactNode } from 'react';
import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
/**
 * Visual style of the button.
 * Figma `Button` defines `default`, `light` and `red` (= `danger` here); the
 * other styles exist in the app and are kept for compatibility.
 */
export type ButtonStyle = 'default' | 'light' | 'danger' | 'dangerSimple' | 'secondary' | 'green' | 'softGray' | 'transparent' | 'edit' | 'link' | 'main';
/** Height preset. `medium` is the Figma `Button` (51pt). */
export type ButtonSize = 'extraSmall' | 'small' | 'medium' | 'large';
export interface ButtonProps {
    /** Called on tap. Not called while `disabled` or `loading`. The keyboard is dismissed first. */
    onPress: (event: GestureResponderEvent) => void;
    /** Called when a touch starts. Useful for analytics in the app wrapper. */
    onPressIn?: (event: GestureResponderEvent) => void;
    /** Label. Leave empty for an icon-only button (then pass `accessibilityLabel`). */
    title: string;
    /**
     * Visual style. Defaults to `'default'` (accent fill).
     * `'link'` and `'main'` render as inline text, not as a filled button.
     */
    style?: ButtonStyle;
    /** Height preset. Defaults to `'medium'`. */
    size?: ButtonSize;
    /** Blocks presses and shows the disabled fill. */
    disabled?: boolean;
    /** Replaces the content with a spinner and blocks presses. */
    loading?: boolean;
    /** Icon element shown next to the title (or alone). */
    icon?: ReactNode;
    /** Icon side. Defaults to `'left'`. */
    iconPosition?: 'left' | 'right';
    /** Fully rounded corners (pill). */
    isRounded?: boolean;
    /** Centers the title text. Defaults to `true`. */
    isTextCenter?: boolean;
    /** Extra container style, applied after the preset styles. */
    restStyle?: StyleProp<ViewStyle>;
    /** Extra title style. */
    textStyle?: StyleProp<TextStyle>;
    /** Extra title style, applied after `textStyle`. Kept for compatibility with the app API. */
    buttonTextStyle?: TextStyle;
    /** Screen reader label. Defaults to `title`. */
    accessibilityLabel?: string;
    /** Screen reader hint describing the result of the action. */
    accessibilityHint?: string;
    /** Test identifier. */
    testID?: string;
}
//# sourceMappingURL=Button.types.d.ts.map