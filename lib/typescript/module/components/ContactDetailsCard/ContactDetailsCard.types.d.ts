import type { ReactNode } from 'react';
/** One label / value row of the card (rendered as `LabeledDetailRow`). */
export interface ContactDetailsRow {
    /** Stable key. */
    id: string;
    /** Left label. */
    label: string;
    /** Right accent value. */
    value: string;
    /** Caption under the row. */
    description?: string | null;
    /** Limits the value column to 77% of the row. */
    isValueNarrow?: boolean;
    /** Makes the row tappable (does not trigger the card `onPress`). */
    onPress?: () => void;
    /** Makes the value tappable (call, mail…). */
    onValuePress?: () => void;
    /** Test identifier of the row. */
    testID?: string;
    /** Test identifier of the value. */
    valueTestID?: string;
}
interface ContactDetailsCardBaseProps {
    /** Card title (`headline/bold`). */
    title: string;
    /** Blocks the card `onPress`. */
    disabled?: boolean;
    /** Test identifier of the card. */
    testID?: string;
    /** Draws the card `shadow/block`. Defaults to `false`. */
    withShadow?: boolean;
    /** Content above the rows (rows mode only). */
    header?: ReactNode;
    /** Divider between `header` and the rows (only when there are rows). Defaults to `false`. */
    hasHeaderDivider?: boolean;
    /** Content under the rows (rows mode only). */
    footer?: ReactNode;
    /** Makes the whole card tappable. */
    onPress?: () => void;
}
/** Message mode: the card shows only `message` (e.g. "No access"). */
export interface ContactDetailsCardMessageProps extends ContactDetailsCardBaseProps {
    /** Secondary body text instead of the rows. */
    message: string;
}
/** Rows mode: label / value rows, or `emptyText` when there are none. */
export interface ContactDetailsCardContentProps extends ContactDetailsCardBaseProps {
    /** Shown when `rows` is empty. */
    emptyText: string;
    /** Rows in display order. */
    rows: ContactDetailsRow[];
}
/** Contact card: either a message or a list of label / value rows. */
export type ContactDetailsCardProps = ContactDetailsCardMessageProps | ContactDetailsCardContentProps;
export {};
//# sourceMappingURL=ContactDetailsCard.types.d.ts.map