import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
/** A value the native picker can hold. */
export type NativePickerValue = number | string | null | undefined;
/** One row of the native picker. */
export interface NativePickerItem<T extends NativePickerValue> {
    /** Row text color. Defaults to `colors.text.primary`. */
    color?: string;
    /** Row text, already translated. */
    label: string;
    /** Value reported to `onValueChange` when the row is picked. */
    value: T;
}
/**
 * Platform picker (`@react-native-picker/picker`): an iOS wheel, an Android
 * dropdown (or dialog). Controlled by `selectedValue`.
 */
export interface NativePickerProps<T extends NativePickerValue> {
    /** Style of the wrapper view around the picker. */
    containerStyle?: StyleProp<ViewStyle>;
    /** Android: dropdown mode instead of a dialog. Defaults to `true`. */
    isDropdownOnAndroid?: boolean;
    /** iOS row text style, applied after the default centered primary text. */
    itemStyle?: StyleProp<TextStyle>;
    /** Rows, in order. */
    items: NativePickerItem<T>[];
    /** Android: max lines of a row label. */
    numberOfLines?: number;
    /** Called with the picked value and its index. Keep or change `selectedValue` to accept or reject. */
    onValueChange: (value: T, index: number) => void;
    /** Currently selected value (controlled). */
    selectedValue: T;
    /** iOS selection band color (`'transparent'` hides it). */
    selectionColor?: string;
    /** Style of the picker itself. */
    style?: StyleProp<ViewStyle>;
    /** Screen-reader label of the picker. */
    accessibilityLabel?: string;
    /** Test identifier of the picker. */
    testID?: string;
}
//# sourceMappingURL=NativePicker.types.d.ts.map