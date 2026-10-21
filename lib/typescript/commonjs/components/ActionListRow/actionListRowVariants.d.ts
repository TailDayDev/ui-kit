import type { TextStyle, ViewStyle } from 'react-native';
import type { Theme } from '../../theme';
import type { ActionListRowVariant } from './ActionListRow.types';
interface ActionListRowVariantStyles {
    row: ViewStyle;
    content: ViewStyle;
    title: TextStyle;
    description: TextStyle;
    rightText: TextStyle;
    titleNumberOfLines: number;
    descriptionNumberOfLines: number;
    iconPlacement?: 'leading' | 'trailing';
}
/** Variant overrides on top of the flat row. `null` for `flat`. */
export declare const getActionListRowVariantStyles: (theme: Theme, variant: ActionListRowVariant) => ActionListRowVariantStyles | null;
/** `true` for the bordered `card-*` variants. */
export declare const isActionListRowCardVariant: (variant: ActionListRowVariant) => boolean;
export {};
//# sourceMappingURL=actionListRowVariants.d.ts.map