export interface IModalSequence<K extends string> {
    /** The modal to render (open or still dismissing); null renders nothing. */
    activeKey: K | null;
    /** Pass to the active modal's `visible`. */
    visible: boolean;
    /** Pass to the active modal's `onDismissed`. */
    onDismissed: () => void;
}
/**
 * Shows one modal of a multi-step flow at a time: when the target step
 * switches to another modal, the current one dismisses first and the next one
 * is presented only after its `onDismissed`, so the steps never overlap.
 *
 * `onSequenceEnd` fires once the last modal has dismissed with no target left,
 * so the owner can unmount the whole flow.
 */
export declare const useModalSequence: <K extends string>(targetKey: K | null, onSequenceEnd?: () => void) => IModalSequence<K>;
//# sourceMappingURL=useModalSequence.d.ts.map