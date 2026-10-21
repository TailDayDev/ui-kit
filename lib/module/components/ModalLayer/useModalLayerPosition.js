"use strict";

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { getModalLayers, resolveModalLayerPosition, subscribeModalLayers } from "./modalLayerStore.js";
const CLOSED_SNAPSHOT = '-1|0';
const subscribeNothing = () => () => undefined;
const getClosedSnapshot = () => CLOSED_SNAPSHOT;

/**
 * Position of a layer in the stack; re-renders only when it changes. A modal
 * whose layer is not mounted (`isMounted` false) does not subscribe, so the
 * many closed modals on a screen are not woken by every stack change.
 */
export const useModalLayerPosition = (id, isMounted = true) => {
  const getSnapshot = useCallback(() => {
    const {
      index,
      isTop
    } = resolveModalLayerPosition(getModalLayers(), id);
    return `${index}|${isTop ? 1 : 0}`;
  }, [id]);
  const snapshot = useSyncExternalStore(isMounted ? subscribeModalLayers : subscribeNothing, isMounted ? getSnapshot : getClosedSnapshot, isMounted ? getSnapshot : getClosedSnapshot);
  return useMemo(() => {
    const [index, isTop] = snapshot.split('|');
    return {
      index: Number(index),
      isTop: isTop === '1'
    };
  }, [snapshot]);
};
//# sourceMappingURL=useModalLayerPosition.js.map