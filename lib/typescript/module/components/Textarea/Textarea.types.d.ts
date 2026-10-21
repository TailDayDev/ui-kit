import type { Ref } from 'react';
import type { StyleProp, TextInput, TextStyle, View, ViewStyle } from 'react-native';
/** Multiline text field with an inner label and an optional length counter under it. */
export interface TextareaProps {
    /**
     * Ref to the field wrapper (not collapsed), e.g. to measure it for keyboard
     * scrolling. When set together with `maxLength`, the 16pt counter space is
     * reserved by an outer wrapper instead of a margin on the field.
     */
    fieldRef?: Ref<View>;
    /** Current text (controlled). */
    value: string;
    /** Called with the new text on every change. */
    setValue: (text: string) => void;
    /** Hint shown while the field is empty. */
    placeholder?: string;
    /** Caption inside the field above the text. Also the screen-reader label. */
    label?: string;
    /** Screen-reader label for the text input. Defaults to `label`. */
    accessibilityLabel?: string;
    /** Style of the bordered field. Applied last. */
    containerStyle?: StyleProp<ViewStyle>;
    /** Style of the text input. */
    inputStyle?: StyleProp<TextStyle>;
    /** Style of the label. */
    labelStyle?: StyleProp<TextStyle>;
    /** Style of the `length/maxLength` counter. */
    counterStyle?: StyleProp<TextStyle>;
    /** Read-only field (not editable, taps do not focus). */
    disabled?: boolean;
    /** Focuses the field on mount. */
    autoFocus?: boolean;
    /** Max text length; also shows the counter under the field. */
    maxLength?: number;
    /** Test identifier of the text input. */
    testID?: string;
    /** Called when the text input gains focus. */
    onFocus?: () => void;
    /** Called on focus with the native text input, e.g. to scroll it into view. */
    onInputFocus?: (input: TextInput | null) => void;
    /** Called when the field loses focus or the keyboard hides while focused. */
    onBlur?: () => void;
}
//# sourceMappingURL=Textarea.types.d.ts.map