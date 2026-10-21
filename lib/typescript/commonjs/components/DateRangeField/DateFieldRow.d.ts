import type { DateRangeFieldRowConfig } from './DateRangeField.types';
interface DateFieldRowProps extends DateRangeFieldRowConfig {
    boundary: 'start' | 'end';
    dateValue: string | null;
    isDisabled: boolean;
    isReadOnly: boolean;
    onPress: () => void;
}
export declare const DateFieldRow: import("react").NamedExoticComponent<DateFieldRowProps>;
export {};
//# sourceMappingURL=DateFieldRow.d.ts.map