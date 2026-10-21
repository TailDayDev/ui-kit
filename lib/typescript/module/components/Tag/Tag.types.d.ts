/** The fields of an item that `Tag` reads. The app's `NomenclatureItem` fits it. */
export interface ITagItem {
    /** Item id; compared to `selectedItems` after trimming and string conversion. */
    id?: number | string | null;
    /** Visible label. */
    title?: string | null;
}
/** Selectable chip (single tag of a multi-select group). */
export interface TagProps {
    /** Item shown by the tag. */
    item: ITagItem;
    /** Ids of the selected items. The tag is selected when `item.id` is among them. */
    selectedItems: Array<number | string>;
    /** Called with `item.id` (or `''` when it is missing) on tap. */
    handlePress: (id: number | string) => void;
    /** Test identifier. */
    testID?: string;
}
//# sourceMappingURL=Tag.types.d.ts.map