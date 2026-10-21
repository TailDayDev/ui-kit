"use strict";

import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

/** Tab-switch timing of the internal `scrollX` (app value). */
const SCROLL_X_TIMING_MS = 200;
export const useStickyTabsScrollX = ({
  contentWidth,
  isEnabled = true,
  isNativeDriverSafe = false,
  scrollX,
  selectedIndex,
  tabCount
}) => {
  const isFirstRenderRef = useRef(true);
  const scrollTimingRef = useRef(null);
  useEffect(() => {
    if (!isEnabled || tabCount <= 0) {
      scrollTimingRef.current?.stop();
      scrollTimingRef.current = null;
      return;
    }
    const clampedIndex = Math.max(0, Math.min(selectedIndex, tabCount - 1));
    const effectiveWidth = Math.max(contentWidth, 1);
    const nextValue = clampedIndex * effectiveWidth;
    if (isFirstRenderRef.current) {
      scrollX.setValue(nextValue);
      isFirstRenderRef.current = false;
      return;
    }
    scrollTimingRef.current?.stop();
    scrollTimingRef.current = Animated.timing(scrollX, {
      duration: SCROLL_X_TIMING_MS,
      toValue: nextValue,
      useNativeDriver: isNativeDriverSafe
    });
    scrollTimingRef.current.start();
  }, [contentWidth, isEnabled, isNativeDriverSafe, scrollX, selectedIndex, tabCount]);
};
//# sourceMappingURL=useStickyTabsScrollX.js.map