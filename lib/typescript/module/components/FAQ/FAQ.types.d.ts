/** One question with its answer. */
export interface FAQItem {
    /** Unique id; also tracks which items are expanded. */
    id: string;
    /** Question (`headline/medium`). */
    title: string;
    /** Answer shown when expanded (`body/regular`). */
    description: string;
}
/** Section title and its questions. */
export interface FAQState {
    /** Section title (`largeTitle/semibold`). */
    title: string;
    /** Questions in display order. */
    items: FAQItem[];
}
/** Accordion list of questions on a subtle background. */
export interface FAQProps {
    /** Title and questions. Nothing is rendered when `items` is empty (unless loading). */
    faqData: FAQState;
    /** Shows a title + three rows skeleton instead of the list. */
    loading?: boolean;
    /**
     * Test id prefix: `${testID}.skeleton` while loading, `${testID}.loaded`
     * on the list, `${testID}.item.${index}` on each question.
     */
    testID?: string;
}
//# sourceMappingURL=FAQ.types.d.ts.map