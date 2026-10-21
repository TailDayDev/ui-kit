export interface IModalPresence<T> {
    /** Render the modal while this is true (open or still dismissing). */
    isMounted: boolean;
    /** Pass to `CustomModal` `visible`. */
    visible: boolean;
    /** The open value, or the last open value while the modal dismisses. */
    value: T | null;
    /** Pass to `CustomModal` `onDismissed`; unmounts after the real dismiss. */
    onDismissed: () => void;
}
/**
 * Mounts a modal while it is open and keeps it mounted until it has fully
 * dismissed, so each opening starts with fresh state, the close animation
 * plays, `onDismissed` fires and the content keeps its last value while the
 * sheet leaves. The way to mount a modal conditionally:
 *
 * const presence = useModalPresence(selectedItem);
 * {presence.isMounted && (
 *   <CustomModal visible={presence.visible} onDismissed={presence.onDismissed}>
 *     <Content item={presence.value} />
 *   </CustomModal>
 * )}
 */
export declare const useModalPresence: <T = true>(openValue: T | null | undefined | false) => IModalPresence<T>;
//# sourceMappingURL=useModalPresence.d.ts.map