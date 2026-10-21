"use strict";

import { useSyncExternalStore } from 'react';
import { useWindowDimensions } from 'react-native';
import { getModalLayerFrame, subscribeModalLayerFrame } from "./modalLayerStore.js";

/**
 * Size of the area modal layers are drawn in. A native modal window covered
 * the whole screen; the host covers the app's root view, which on Android
 * can exclude the status and navigation bars. Falls back to the window
 * before the root has been measured (and in tests).
 */
export const useModalLayerFrame = () => {
  const window = useWindowDimensions();
  const frame = useSyncExternalStore(subscribeModalLayerFrame, getModalLayerFrame, getModalLayerFrame);
  return frame ?? {
    width: window.width,
    height: window.height
  };
};
//# sourceMappingURL=useModalLayerFrame.js.map