/** Shadowed card listing the first few items and a "+N more" line. */
export interface LimitedListCardProps {
    /** Card title (`headline/bold`). */
    title: string;
    /** Items, one per line (`body/regular`). */
    items: string[];
    /** How many items are shown. Defaults to 3. */
    maxVisible?: number;
    /** Makes the card tappable. */
    onPress?: () => void;
    /**
     * Builds the "+N more" line for the hidden items. The app wrapper fills the
     * `plus_one_more` translation with the count.
     */
    formatMoreLabel: (remainingCount: number) => string;
    /** Test identifier of the card. */
    testID?: string;
}
//# sourceMappingURL=LimitedListCard.types.d.ts.map