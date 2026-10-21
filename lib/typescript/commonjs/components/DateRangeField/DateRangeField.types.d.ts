import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
export type DateRangeFieldName = 'start' | 'end';
/** Range boundaries as opaque date strings (the kit does not parse them). */
export interface DateRangeValue {
    readonly startDate: string | null;
    readonly endDate: string | null;
}
/** Display configuration of one row. */
export interface DateRangeFieldRowConfig {
    /** Row title. */
    readonly label: string;
    /** Screen reader label of the row button. Defaults to `label`. */
    readonly accessibilityLabel?: string;
    /**
     * External display override. When defined, it has priority over formatValue
     * and the raw date. Use formatValue for dynamic uncontrolled values.
     */
    readonly displayValue?: string | null;
    /** Shown when there is no value. Defaults to `''`. */
    readonly emptyValue?: string;
    /** Formats the current committed value without owning date-domain rules. */
    readonly formatValue?: (value: string | null) => string;
    /** Disables only this row. */
    readonly isDisabled?: boolean;
    /** Row button test identifier. */
    readonly testID?: string;
    /** Test identifier of the trailing chevron. */
    readonly affordanceTestID?: string;
}
/** What `renderEditor` receives to drive a picker sheet. */
export interface DateRangeFieldEditorController {
    /** Row being edited, or `null` when closed. */
    readonly activeField: DateRangeFieldName | null;
    /** Committed value. */
    readonly value: DateRangeValue;
    /** Value being edited. */
    readonly draftValue: DateRangeValue;
    /** Replace the draft. */
    readonly setDraftValue: Dispatch<SetStateAction<DateRangeValue>>;
    /** Set one boundary of the draft. */
    readonly setFieldValue: (field: DateRangeFieldName, value: string | null) => void;
    /** Commit the draft (or the given value) and close. */
    readonly commit: (value?: DateRangeValue) => void;
    /** Drop the draft and close. */
    readonly cancel: () => void;
}
interface ControlledValueProps {
    /** Controlled committed value. */
    value: DateRangeValue;
    defaultValue?: never;
}
interface UncontrolledValueProps {
    value?: never;
    /** Initial committed value (read on mount only). */
    defaultValue?: DateRangeValue;
}
interface ControlledActiveFieldProps {
    /** Controlled edited row. */
    activeField: DateRangeFieldName | null;
    defaultActiveField?: never;
}
interface UncontrolledActiveFieldProps {
    activeField?: never;
    /** Initial edited row. */
    defaultActiveField?: DateRangeFieldName | null;
}
interface DateRangeFieldCommonProps {
    /** Start row configuration. */
    start: DateRangeFieldRowConfig;
    /** End row configuration. */
    end: DateRangeFieldRowConfig;
    /** Disables both rows. */
    isDisabled?: boolean;
    /** Shows values without press and without the chevron. */
    isReadOnly?: boolean;
    /** Called with the committed value. */
    onValueChange?: (value: DateRangeValue) => void;
    /** Called when a row opens or the editor closes. */
    onActiveFieldChange?: (field: DateRangeFieldName | null) => void;
    /** Called on every row press. */
    onFieldPress?: (field: DateRangeFieldName) => void;
    /** Renders the editor (wheel/calendar sheet) under the rows. */
    renderEditor?: (controller: DateRangeFieldEditorController) => ReactNode;
    /** Container style. */
    style?: StyleProp<ViewStyle>;
    /** Container test identifier. */
    testID?: string;
}
export type DateRangeFieldProps = DateRangeFieldCommonProps & (ControlledValueProps | UncontrolledValueProps) & (ControlledActiveFieldProps | UncontrolledActiveFieldProps);
export {};
//# sourceMappingURL=DateRangeField.types.d.ts.map