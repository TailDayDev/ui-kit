import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
/** Outlined option card that turns accent when selected, with an optional corner badge. */
export interface SelectableOptionCardProps {
    /** Card title (`headline/bold`). */
    title: string;
    /** Secondary text under the title (`caption/regular`). Hidden when empty. */
    description?: string | null;
    /** Text of the accent badge in the top-right corner (e.g. "Recommended"). Hidden when empty. */
    badgeText?: string;
    /** Extra content under the description. */
    footer?: ReactNode;
    /** Selected state: accent border, soft accent fill, accent texts. Defaults to `false`. */
    isSelected?: boolean;
    /** Blocks taps and dims the card. Defaults to `false`. */
    isDisabled?: boolean;
    /** Called on tap. Without it the card is static (not pressable, no role). */
    onPress?: () => void;
    /** Style of the card container. */
    style?: StyleProp<ViewStyle>;
    /** Style override of the title. */
    titleStyle?: StyleProp<TextStyle>;
    /** Style override of the description. */
    descriptionStyle?: StyleProp<TextStyle>;
    /** Max title lines. Defaults to 3. */
    titleNumberOfLines?: number;
    /** Max description lines. Defaults to 4. */
    descriptionNumberOfLines?: number;
    /** Test identifier of the pressable wrapper (only set when `onPress` is given). */
    testID?: string;
}
//# sourceMappingURL=SelectableOptionCard.types.d.ts.map