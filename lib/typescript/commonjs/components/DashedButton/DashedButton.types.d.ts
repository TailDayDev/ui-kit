import type { TextStyle, ViewStyle } from 'react-native';
/** Layout preset of `DashedButton`. */
export type DashedButtonVariant = 'internal' | 'external' | 'externalWrapped';
/** "Add …" button: dashed outline, plus icon (or spinner) and a label. */
export interface DashedButtonProps {
    /** Visible label. Also the accessibility label. */
    title: string;
    /** Called on tap. Not called while `disabled` or `loading`. */
    onPress: () => void;
    /** Test identifier of the touchable. */
    testID?: string;
    /** Extra style for the outer touchable. */
    cardStyle?: ViewStyle;
    /** Extra style for the label (merged over `headline/regular`, `text.primary`). */
    textStyle?: TextStyle;
    /**
     * Absolute outline width in points.
     * @deprecated Use `widthOffset={value}` instead of
     * `width={Dimensions.get('window').width - value}`.
     */
    width?: number;
    /**
     * Outline width = window width − `widthOffset`. Defaults to 48 for
     * `external`, 82 for `internal` / `externalWrapped`. Ignored when `width` is set.
     */
    widthOffset?: number;
    /** Blocks interaction and dims the button to 0.6. */
    disabled?: boolean;
    /** Shows a spinner instead of the plus icon; blocks interaction and dims like `disabled`. */
    loading?: boolean;
    /** Outline width in points. Defaults to the `DashedBorder` default (1.5). */
    strokeWidth?: number;
    /**
     * Layout preset (legacy name kept for API compatibility; it is not a style object):
     * - `internal`: 48pt high, radius 8, row.
     * - `external`: 56pt high, radius 16, row.
     * - `externalWrapped`: 86pt high, radius 8, icon above the label.
     */
    style: DashedButtonVariant;
}
//# sourceMappingURL=DashedButton.types.d.ts.map