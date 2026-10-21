import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
/**
 * Row look:
 * - `flat`: list row with a bottom divider, icon on the left (default).
 * - `trailing-icon`: like `flat`, icon on the right (Figma `TaskSheetRow`).
 * - `card-source` / `card-source-trailing`: bordered 52pt card, icon left / right.
 * - `card-settings`: bordered 52pt card with a caption title and an accent right text.
 * - `card-attachment`: bordered 58pt card with a one-line caption title and description.
 */
export type ActionListRowVariant = 'flat' | 'trailing-icon' | 'card-source' | 'card-source-trailing' | 'card-settings' | 'card-attachment';
/** A tappable (or static) list row: icon, title, description, right text, trailing slot. */
export interface ActionListRowProps {
    /** Screen-reader label of the tappable row. Without it the visible texts are read. */
    accessibilityLabel?: string;
    /** Row title (`body/medium` in list variants). */
    title: string;
    /** Secondary line under the title. Hidden when empty. */
    description?: string | null;
    /** One-line value at the right side of the row. Hidden when empty. */
    rightText?: string | null;
    /** 24pt icon slot on the left. Trailing variants move it to the right when `trailing` is not set. */
    leading?: ReactNode;
    /** 24pt slot on the right (chevron, check, switch…). */
    trailing?: ReactNode;
    /** Paints the title red (destructive action). */
    isDanger?: boolean;
    /** Blocks the press and dims the row to 0.6. */
    isDisabled?: boolean;
    /** Bottom divider. Defaults to `true` for list variants and `false` for card variants. */
    showDivider?: boolean;
    /** Row look. Defaults to `'flat'`. */
    variant?: ActionListRowVariant;
    /** Makes the row a button. Without it the row is a static `View`. */
    onPress?: () => void;
    /** Row container style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Style of the inner content row. */
    contentStyle?: StyleProp<ViewStyle>;
    /** Extra title style, applied last. */
    titleStyle?: StyleProp<TextStyle>;
    /** Extra description style, applied last. */
    descriptionStyle?: StyleProp<TextStyle>;
    /** Extra right text style, applied last. */
    rightTextStyle?: StyleProp<TextStyle>;
    /** Maximum title lines. Defaults to the variant value (2, or 1 for compact cards). */
    titleNumberOfLines?: number;
    /** Maximum description lines. Defaults to the variant value (2, or 1 for attachments). */
    descriptionNumberOfLines?: number;
    /** Test identifier: on the button when `onPress` is set, otherwise on the row. */
    testID?: string;
}
//# sourceMappingURL=ActionListRow.types.d.ts.map