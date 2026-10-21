import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/** One option of the select. */
export interface SelectOption {
  /** Text shown in the field and in the picker, already translated. */
  label: string;
  /** Option value. */
  value: string;
}

/**
 * Field that opens a bottom sheet with a native picker; the pick is applied
 * on Save.
 */
export interface SelectProps {
  /** Selected option (controlled). */
  value?: SelectOption;
  /** Called with the picked option on Save. */
  setValue: (value: SelectOption) => void;
  /** Options, in order. */
  options: SelectOption[];
  /**
   * Text shown while nothing is selected. No default in the kit (the app
   * defaulted to the English "Select an option").
   */
  placeholder?: string;
  /** Caption inside the field; also the sheet title. */
  label?: string;
  /** Text of the sheet's cancel button (the app's `translate('cancel')`). */
  cancelLabel: string;
  /** Text of the sheet's save button (the app's `translate('save')`). */
  saveLabel: string;
  /** Style of the outer wrapper. */
  containerStyle?: StyleProp<ViewStyle>;
  /** Extra caption style. */
  labelStyle?: StyleProp<TextStyle>;
  /** Error text, shown while `hasError` is truthy. */
  errorText?: string | null;
  /** Shows `errorText`. A string counts as true (kept from the app API). */
  hasError?: boolean | null | string;
  /** Grey field that does not open. */
  disabled?: boolean;
  /** Called after the sheet closes (cancel, save or close request). */
  onBlur?: () => void;
  /** Test identifier of the field. */
  testID?: string;
}
