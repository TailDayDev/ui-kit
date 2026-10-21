/** Detail row: label left, accent value right, optional caption under it, divider after. */
export interface LabeledDetailRowProps {
    /** Left label (`body/regular`, one line). */
    label: string;
    /** Right value (`body/regular`, accent, up to two lines). */
    value: string;
    /** Caption under the row (`caption/regular`, secondary). Hidden when empty. */
    description?: string | null;
    /** Last row of a list: no divider after it. */
    isLast: boolean;
    /** Limits the value column to 77% of the row. Defaults to `false`. */
    isValueNarrow?: boolean;
    /** Makes the row tappable. The press does not reach a tappable parent (e.g. a card). */
    onPress?: () => void;
    /** Makes the value tappable (call, mail…). The press does not reach the row. */
    onValuePress?: () => void;
    /** Test identifier of the row. */
    testID?: string;
    /** Test identifier of the value pressable. */
    valueTestID?: string;
}
//# sourceMappingURL=LabeledDetailRow.types.d.ts.map