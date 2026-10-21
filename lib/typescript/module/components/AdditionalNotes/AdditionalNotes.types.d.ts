import type { ReactNode, Ref } from 'react';
import type { TextInput, TextStyle, View, ViewStyle } from 'react-native';
/** `'inline'` edits in the card; `'modal'` shows a preview card that opens an edit sheet. */
export type AdditionalNotesEditMode = 'inline' | 'modal';
/** Data injected from the parent (controlled value). */
export interface AdditionalNotesValueBinding {
    /** Current text (controlled). */
    value: string;
    /** Called with the new text. Preferred name for new code. */
    onValueChange?: (value: string) => void;
    /** Legacy alias of `onValueChange` (used when `onValueChange` is missing). */
    setValue?: (value: string) => void;
    /**
     * Modal mode: called with the draft on Save. A rejected promise keeps the
     * sheet open; otherwise the value is applied and the sheet closes.
     */
    onSave?: (value: string) => Promise<void> | void;
}
/** Visual copy and textarea constraints. */
export interface AdditionalNotesPresentation {
    /** Card title (app default: `translate('additional_instructions')`). */
    title: string;
    /** Textarea placeholder (app default: `translate('additional_instructions_example')`). */
    placeholder: string;
    /** Modal mode: preview text while the value is empty. Defaults to `placeholder`. */
    previewPlaceholder?: string;
    /** Caption under the inline field. */
    footerText?: string;
    /** Style of `footerText`. */
    footerTextStyle?: TextStyle;
    /** Max text length (also shows the counter). Defaults to 200. */
    maxLength?: number;
    /** Field cannot be edited. */
    disabled?: boolean;
    /** Shows the text (or the placeholder) instead of a field. */
    readOnly?: boolean;
    /** Modal mode: Save is in progress (spinner, sheet locked). */
    isSaving?: boolean;
    /** Inline field min height. Defaults to 116. */
    minHeight?: number;
    /** Modal mode: field min height in the sheet. Defaults to 220. */
    modalInputMinHeight?: number;
    /** Modal mode: preview lines before truncation. Defaults to 4. */
    cardNumberOfLines?: number;
    /** Modal mode: preview card shadow. Defaults to `true`. */
    withShadow?: boolean;
    /** Card style, applied last. */
    cardStyle?: ViewStyle;
    /** Card title style. Defaults to `title/bold` inline and `headline/bold` in modal mode. */
    titleStyles?: TextStyle;
    /** Textarea container style. */
    textareaContainerStyle?: ViewStyle;
    /** Textarea input style. */
    textareaInputStyle?: TextStyle;
    /** Textarea counter style. */
    textareaCounterStyle?: TextStyle;
}
/** Edit mode with the texts that only the modal needs. */
export type AdditionalNotesEditModeProps = {
    /** Inline field (default). */
    editMode?: 'inline';
    /** Cancel button text of the edit sheet (unused inline). */
    cancelLabel?: string;
    /** Save button text of the edit sheet (unused inline). */
    saveLabel?: string;
} | {
    /** Preview card + edit sheet. */
    editMode: 'modal';
    /** Cancel button text of the edit sheet (app: `translate('cancel')`). */
    cancelLabel: string;
    /** Save button text of the edit sheet (app: `translate('save')`). */
    saveLabel: string;
};
/**
 * Focus / keyboard hooks. The kit does not scroll: the app keeps its
 * keyboard logic (`useKeepFieldAboveKeyboard`, `KeyboardAwareScrollView`) in
 * a wrapper and drives it with these.
 */
export interface AdditionalNotesScrollBehavior {
    /**
     * Ref to the inline field wrapper (field + counter, not collapsed): the
     * anchor to keep above the keyboard.
     */
    fieldRef?: Ref<View>;
    /** Inline field gained focus. */
    onFocus?: () => void;
    /** Inline field lost focus. */
    onBlur?: () => void;
    /** Inline field gained focus, with the native input (e.g. `scrollToFocusedInput`). */
    onInputFocus?: (input: TextInput | null) => void;
}
type AdditionalNotesBaseProps = AdditionalNotesValueBinding & AdditionalNotesPresentation & AdditionalNotesScrollBehavior;
/** What `useAdditionalNotes` returns. */
export type AdditionalNotesContextValue = AdditionalNotesBaseProps & {
    editMode?: AdditionalNotesEditMode;
    cancelLabel?: string;
    saveLabel?: string;
    /** `onValueChange`, else `setValue`, else a no-op. */
    resolveValueChange: (nextValue: string) => void;
};
/** Props of `AdditionalNotesProvider`. */
export type AdditionalNotesProviderProps = AdditionalNotesBaseProps & AdditionalNotesEditModeProps & {
    children: ReactNode;
};
/** Props of the flat `AdditionalNotes` entry. `setValue` is required here. */
export type AdditionalNotesProps = AdditionalNotesBaseProps & AdditionalNotesEditModeProps & {
    setValue: (value: string) => void;
};
export {};
//# sourceMappingURL=AdditionalNotes.types.d.ts.map