import type { DimensionValue, StyleProp, TextStyle, ViewStyle } from 'react-native';
/** A value a wheel column can hold. */
export type WheelPickerValue = string | number;
/** One row of a wheel column. */
export interface WheelPickerItem<T extends WheelPickerValue = WheelPickerValue> {
    /** Row text, already translated. */
    label: string;
    /** Value reported when the row is picked. */
    value: T;
}
/** One scrolling column of the wheel. */
export interface WheelPickerColumn<T extends WheelPickerValue = WheelPickerValue> {
    /** Stable column key. */
    key: string;
    /** Rows, in order. */
    items: WheelPickerItem<T>[];
    /** Called with the picked value and its index. */
    onValueChange: (value: T, index: number) => void;
    /** Selected value (controlled). */
    selectedValue: T;
    /** Flex of the column inside the row. */
    flex?: number;
    /** Test identifier of the column. */
    testID?: string;
    /** Fixed column width. */
    width?: DimensionValue;
}
/** 12h period. */
export type WheelPickerTimeFormat = 'am' | 'pm';
/** Hour cycle of the time wheel. */
export type WheelPickerHourFormat = '12h' | '24h';
/** Value of the time wheel. */
export interface WheelPickerTimeValue {
    /** Two-digit hour (`'00'`–`'23'`, or `'01'`–`'12'` in 12h). */
    hour: string;
    /** Two-digit minutes. */
    minutes: string;
    /** Period in 12h mode, `null` in 24h. */
    format: WheelPickerTimeFormat | null;
}
/** Unit of the weight wheel. */
export type WheelPickerWeightUnit = 'kg' | 'lbs';
/** A column of the date wheel. */
export type WheelPickerDateField = 'day' | 'month' | 'year';
/** Unit texts of the weight wheel (the app's `lbs`, `kilograms`, `gram4`). */
export interface WheelPickerWeightLabels {
    /** Suffix of a pound row, e.g. "lbs". */
    pounds: string;
    /** Suffix of a kilogram row, e.g. "kg". */
    kilograms: string;
    /** Suffix of a gram row, e.g. "g". */
    grams: string;
}
/** Props shared by every wheel mode. */
export interface WheelPickerBaseProps {
    /** Style of the wheel container. */
    containerStyle?: StyleProp<ViewStyle>;
    /** Row text style, applied after the defaults. */
    itemTextStyle?: StyleProp<TextStyle>;
    /**
     * Style of the band behind the selected row. When given, the custom
     * scroll wheel is used on iOS too (as on Android).
     */
    selectionIndicatorStyle?: StyleProp<ViewStyle>;
    /** Row height. Defaults to 44. */
    itemHeight?: number;
    /** Visible rows (odd, at least 3). Defaults to 5. */
    visibleItemCount?: number;
    /** Test identifier of the wheel container. */
    testID?: string;
}
/** Any set of columns. */
export interface WheelPickerColumnsProps extends WheelPickerBaseProps {
    mode: 'columns';
    /** Columns, left to right. */
    columns: WheelPickerColumn[];
    /** Gap between columns. Defaults to 8 on the custom wheel. */
    columnGap?: number;
}
/** One column of options. */
export interface WheelPickerSelectProps extends WheelPickerBaseProps {
    mode: 'select';
    /** Rows, in order. */
    items: WheelPickerItem[];
    /** Selected value (controlled). */
    selectedValue: WheelPickerValue;
    /** Called with the picked value and its index. */
    onValueChange: (value: WheelPickerValue, index: number) => void;
    /** Key of the single column. Defaults to `'select'`. */
    columnKey?: string;
}
/** Hour + minutes (+ am/pm) columns. */
export interface WheelPickerTimeProps extends WheelPickerBaseProps {
    mode: 'time';
    /** Selected time (controlled). */
    value: WheelPickerTimeValue;
    /** Called with the whole new time on every column change. */
    onChange: (next: WheelPickerTimeValue) => void;
    /** Hour cycle. Defaults to `'24h'`. */
    hourFormat?: WheelPickerHourFormat;
    /** Minute step. Defaults to 5. */
    minuteInterval?: number;
    /** Gap between columns. */
    columnGap?: number;
    /** Width of the am/pm column. Defaults to 96. */
    formatColumnWidth?: number;
}
/** Day / month / year columns, in the locale's order. */
export interface WheelPickerDateProps extends WheelPickerBaseProps {
    mode: 'date';
    /** Selected date as an ISO string. Defaults to today (clamped to the range). */
    value?: string;
    /** Called with the picked date as a UTC-midnight ISO string. */
    onChange: (isoDate: string) => void;
    /**
     * Month names, January first (12 entries, already translated). Replaces
     * the app's `translate('month_january')`… keys.
     */
    monthLabels: readonly string[];
    /** Locale that decides the column order (e.g. `'en-US'`). Defaults to the device locale. */
    locale?: string;
    /** Earliest date (ISO). Defaults to 100 years before the max. */
    minDateIso?: string;
    /** Latest date (ISO). Defaults to today, or 100 years after the min. */
    maxDateIso?: string;
    /** Reports the initial date through `onChange` on mount. Defaults to `true`. */
    autoInitialize?: boolean;
}
/** Weight columns: kg + grams, or one lbs column. */
export interface WheelPickerWeightProps extends WheelPickerBaseProps {
    mode: 'weight';
    /** Display unit. */
    unit: WheelPickerWeightUnit;
    /** Weight in kilograms, `null` when unknown. */
    weightKg: number | null;
    /** Called with the new weight in kilograms (2 decimals). */
    onChange: (kg: number) => void;
    /** Unit texts appended to the rows. */
    unitLabels: WheelPickerWeightLabels;
}
/** WheelPicker props, by `mode`. */
export type WheelPickerProps = WheelPickerColumnsProps | WheelPickerSelectProps | WheelPickerTimeProps | WheelPickerDateProps | WheelPickerWeightProps;
/** Props of the platform wheel every mode renders. */
export interface PlatformWheelProps extends WheelPickerBaseProps {
    columns: WheelPickerColumn[];
    columnGap?: number;
}
/** Props of DateWheel (the `date` mode on its own). */
export type DateWheelProps = Omit<WheelPickerDateProps, 'mode'>;
//# sourceMappingURL=WheelPicker.types.d.ts.map