import type { ReactNode } from 'react';
/** Id of one filter option. */
export type FilterOptionId = string | number;
/** Selected option ids per group key. */
export type FiltersSelectionValue = Record<string, FilterOptionId[]>;
/** One selectable option of a filter group. */
export interface FilterOptionView {
    id: FilterOptionId;
    title: string;
    /** Image of the option; drawn through `renderOptionImage` when not blank. */
    imageUrl?: string;
    /** Caption on the right. */
    rightLabel?: string;
    /** Value (e.g. a count) on the right, under `rightLabel`. */
    rightValue?: string | number;
}
/** One section of the filters. */
export interface FilterGroupView {
    key: string;
    sectionTitle: string;
    options: FilterOptionView[];
    /** Shown instead of the section when it has no options. */
    emptyMessage?: string;
}
export interface FiltersSelectionModalProps {
    /** Shown while true. */
    visible: boolean;
    /** Close request; also called after Reset and Apply. */
    onClose: () => void;
    /** Header title. */
    title: string;
    /** Sections in display order. */
    groups: FilterGroupView[];
    /** Selected ids per group. */
    value: FiltersSelectionValue;
    /** Called with the whole next value when an option is toggled. */
    onChange: (nextValue: FiltersSelectionValue) => void;
    /** Reset button label. */
    resetTitle: string;
    /** Apply button label. */
    applyTitle: string;
    /** Reset action (then `onClose`). */
    onReset?: () => void;
    /** Apply action (then `onClose`). */
    onApply?: () => void;
    /** Modal key; also the close button test id prefix. Defaults to `'FiltersSelectionModal'`. */
    modalKey?: string;
    /**
     * Draws the image of an option with a non-blank `imageUrl` (the app passes
     * its `DinamicImage`). `size` is the 32 pt slot. Without it no image is drawn.
     */
    renderOptionImage?: (option: FilterOptionView, size: number) => ReactNode;
}
//# sourceMappingURL=FiltersSelectionModal.types.d.ts.map