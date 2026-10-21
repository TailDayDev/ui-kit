import { useCallback, useEffect, useRef, useState } from 'react';

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

const isPresentValue = <T>(value: T | null | undefined | false): value is T =>
  value !== null && value !== undefined && value !== false;

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
export const useModalPresence = <T = true>(
  openValue: T | null | undefined | false,
): IModalPresence<T> => {
  const isOpen = isPresentValue(openValue);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;
  const lastValueRef = useRef<T | null>(isOpen ? openValue : null);
  if (isOpen) {
    lastValueRef.current = openValue;
  }
  const [isRetained, setIsRetained] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRetained(true);
    }
  }, [isOpen]);

  const onDismissed = useCallback(() => {
    // A reopen during the close animation keeps the modal mounted.
    if (isOpenRef.current) {
      return;
    }
    lastValueRef.current = null;
    setIsRetained(false);
  }, []);

  return {
    isMounted: isOpen || isRetained,
    visible: isOpen,
    value: isOpen ? openValue : lastValueRef.current,
    onDismissed,
  };
};
