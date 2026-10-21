"use strict";

import Animated from 'react-native-reanimated';
import { SegmentedControl } from "../SegmentedControl/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * `SegmentedControl` inside a Reanimated wrapper positioned at `top`
 * (app `shared/ui/sticky-segmented-control`). Used as the sticky overlay bar
 * of `StickyTabs`.
 */
export const StickySegmentedControl = ({
  animatedStyle,
  onChange,
  onLayout,
  options,
  screenWidth,
  selectedIndex,
  style,
  testID,
  testIDs,
  top,
  scrollX,
  syncWithScroll = true
}) => /*#__PURE__*/_jsx(Animated.View, {
  style: [style, {
    top
  }, animatedStyle],
  testID: testID,
  onLayout: onLayout,
  children: /*#__PURE__*/_jsx(SegmentedControl, {
    options: options,
    selectedIndex: selectedIndex,
    onChange: onChange,
    screenWidth: screenWidth,
    scrollX: scrollX,
    syncWithScroll: syncWithScroll,
    testIDs: testIDs
  })
});
//# sourceMappingURL=StickySegmentedControl.js.map