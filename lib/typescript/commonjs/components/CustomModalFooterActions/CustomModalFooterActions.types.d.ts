import type { StyleProp, ViewStyle } from 'react-native';
import type { ButtonStyle } from '../Button';
/** Layout of the two buttons. Figma VARIANT `direction`. */
export type CustomModalFooterActionsDirection = 'row' | 'column';
/** Sheet footer (Figma `CustomModalFooterActions`): "Cancel" and the main action. */
export interface CustomModalFooterActionsProps {
    /** Text of the cancel button (Figma `Кнопка · вторая`, Button style=light). */
    cancelLabel: string;
    /** Text of the main button (Figma `Кнопка · главная`, Button style=default). */
    primaryLabel: string;
    /** Called when the cancel button is tapped. */
    onCancel: () => void;
    /** Called when the main button is tapped. Not called while disabled or loading. */
    onPrimary: () => void;
    /** Blocks the main button and shows the disabled fill. Defaults to `false`. */
    isPrimaryDisabled?: boolean;
    /** Shows a spinner in the main button and blocks it. Defaults to `false`. */
    isPrimaryLoading?: boolean;
    /** Kit `Button` style of the main button (e.g. `'danger'`). Defaults to `'default'`. */
    primaryStyle?: ButtonStyle;
    /**
     * Figma VARIANT `direction`. `'row'`: cancel left, main right, both hug
     * their text. `'column'`: main on top, cancel below, both full width.
     * Defaults to `'row'`.
     */
    direction?: CustomModalFooterActionsDirection;
    /** Outer style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the container. */
    testID?: string;
    /** Test identifier of the cancel button. */
    cancelTestID?: string;
    /** Test identifier of the main button. */
    primaryTestID?: string;
}
//# sourceMappingURL=CustomModalFooterActions.types.d.ts.map