import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
/** Bordered picker row: icon + label left, value + round action (chevron / clear) right. */
export interface FieldRowProps {
    /** 24pt-wide icon slot before the label. */
    icon?: ReactNode;
    /** Left label (`body/regular`, primary text). */
    label: string;
    /** Right value (`body/medium`): accent when filled, secondary when `isEmpty`, red on error. */
    value: string;
    /** Shows `value` as a placeholder (secondary text). Defaults to `false`. */
    isEmpty?: boolean;
    /** Red border and red value. Defaults to `false`. */
    isError?: boolean;
    /** Makes the row a button (and the chevron). Without it the row is static. */
    onPress?: () => void;
    /** Turns the action into a clear (×) button that calls this instead of `onPress`. */
    onClear?: () => void;
    /** Shows the round action at the right. Defaults to `true`. */
    showAction?: boolean;
    /** Extra value text style, applied last. */
    restValueStyle?: StyleProp<TextStyle>;
    /** Row style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the row. */
    testID?: string;
    /** Screen-reader label of the row button. Without it the label and value are read. */
    accessibilityLabel?: string;
    /** Screen-reader label of the round action (e.g. "Clear" / "Open"). */
    actionAccessibilityLabel?: string;
    /** Test identifier of the round action. */
    actionTestID?: string;
}
//# sourceMappingURL=FieldRow.types.d.ts.map