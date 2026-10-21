"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStickyTabsScrollX = void 0;
var _react = require("react");
var _reactNative = require("react-native");
/** Tab-switch timing of the internal `scrollX` (app value). */
const SCROLL_X_TIMING_MS = 200;
const useStickyTabsScrollX = ({
  contentWidth,
  isEnabled = true,
  isNativeDriverSafe = false,
  scrollX,
  selectedIndex,
  tabCount
}) => {
  const isFirstRenderRef = (0, _react.useRef)(true);
  const scrollTimingRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
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
    scrollTimingRef.current = _reactNative.Animated.timing(scrollX, {
      duration: SCROLL_X_TIMING_MS,
      toValue: nextValue,
      useNativeDriver: isNativeDriverSafe
    });
    scrollTimingRef.current.start();
  }, [contentWidth, isEnabled, isNativeDriverSafe, scrollX, selectedIndex, tabCount]);
};
exports.useStickyTabsScrollX = useStickyTabsScrollX;
//# sourceMappingURL=useStickyTabsScrollX.js.map