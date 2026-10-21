import type { StyleProp, ViewStyle } from 'react-native';
/** Texts of the manual task sheet body (fixed texts in Figma, translated by the app). */
export interface ManualTaskSheetContentLabels {
    /** Caption inside the title field, e.g. "Новая задача". Also its screen-reader label. */
    title: string;
    /** Hint of the empty title field, e.g. "Что бы вы хотели сделать?". */
    titlePlaceholder?: string;
    /** Due-time row label, e.g. "Срок исполнения". */
    due: string;
    /** Pet row label, e.g. "Питомец". */
    pet: string;
    /** Staff row label, e.g. "Сотрудник". */
    staff: string;
}
/** Test identifiers of the parts (the app keeps its own e2e ids). */
export interface ManualTaskSheetContentTestIDs {
    /** Title text input. */
    title?: string;
    /** Due-time row. */
    due?: string;
    /** Pet row. */
    pet?: string;
    /** Staff row. */
    staff?: string;
}
/**
 * Body of the manual task sheet (Figma `ManualTaskSheetContent`): the title
 * `Textarea` and three `FieldRow`s (due time, pet, staff). Data in, callbacks
 * out; the modal (title, footer) and the pickers stay in the parent.
 */
export interface ManualTaskSheetContentProps {
    /** Task title (controlled). Figma nested `Textarea` TEXT `value`. */
    title: string;
    /** Called with the new title on every change. */
    onTitleChange: (text: string) => void;
    /** Max title length; also draws the `length/max` counter (Figma `0/120`, app 120). */
    titleMaxLength?: number;
    /** Focuses the title field on mount. Defaults to `false`. */
    isTitleAutoFocused?: boolean;
    /** Called when the title field gains focus. */
    onTitleFocus?: () => void;
    /** Texts. */
    labels: ManualTaskSheetContentLabels;
    /** Due-time value, e.g. "Без времени" or "08:00". Figma `Срок исполнения` › `value`. */
    dueValue: string;
    /** Shows `dueValue` as a placeholder (no due time). Figma `Срок исполнения` › `isEmpty`. Defaults to `true`. */
    isDueEmpty?: boolean;
    /** Called on a tap on the due-time row. */
    onDuePress: () => void;
    /** Pet value, e.g. "Без питомца" or the pet name. Figma `Питомец` › `value`. */
    petValue: string;
    /** Shows `petValue` as a placeholder (no pet). Figma `Питомец` › `isEmpty`. Defaults to `true`. */
    isPetEmpty?: boolean;
    /** Called on a tap on the pet row. */
    onPetPress: () => void;
    /** Staff value, e.g. "Без сотрудника" or the full name. Figma `Сотрудник` › `value`. */
    staffValue: string;
    /** Shows `staffValue` as a placeholder (no staff). Figma `Сотрудник` › `isEmpty`. Defaults to `true`. */
    isStaffEmpty?: boolean;
    /** Called on a tap on the staff row. */
    onStaffPress: () => void;
    /** Test identifiers of the field and the rows. */
    testIDs?: ManualTaskSheetContentTestIDs;
    /** Outer layout style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the container. */
    testID?: string;
}
//# sourceMappingURL=ManualTaskSheetContent.types.d.ts.map