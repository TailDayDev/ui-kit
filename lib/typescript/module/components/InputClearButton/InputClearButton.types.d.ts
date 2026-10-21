import type { RefObject } from 'react';
import type { StyleProp, TextInput, ViewStyle } from 'react-native';
/** The «×» control that empties a text field and keeps it focused. */
export interface InputClearButtonProps {
    /** Empties the field's value. Called once per tap; a drag (scroll) does not call it. */
    onClear: () => void;
    /** The field to keep focused after clearing. */
    inputRef?: RefObject<TextInput | null>;
    /** Wrapper style, typically absolute positioning inside the field. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier. */
    testID?: string;
    /** Screen-reader text, e.g. "Clear search". Pass a translated string. */
    accessibilityLabel?: string;
}
//# sourceMappingURL=InputClearButton.types.d.ts.map