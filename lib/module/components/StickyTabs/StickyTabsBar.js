"use strict";

import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SegmentedControl } from "../SegmentedControl/index.js";
import { StickySegmentedControl } from "../StickySegmentedControl/index.js";
import { useStickyTabsBarContext } from "./StickyTabsContext.js";
import { jsx as _jsx } from "react/jsx-runtime";
const StickyTabsBarComponent = ({
  animatedStyle,
  style,
  syncWithScroll,
  top
}) => {
  const {
    barMode,
    barStyle,
    contentWidth,
    handleBarLayout,
    handleSelectedIndexChange,
    labels,
    scrollX,
    selectedIndex,
    stickyBar,
    tabTestIDs,
    testID
  } = useStickyTabsBarContext();
  const resolvedTop = top ?? stickyBar?.top ?? 0;
  const resolvedAnimatedStyle = animatedStyle ?? stickyBar?.animatedStyle;
  const resolvedStyle = useMemo(() => [barStyle, stickyBar?.style, style], [barStyle, stickyBar?.style, style]);
  const resolvedSyncWithScroll = syncWithScroll ?? stickyBar?.syncWithScroll ?? true;
  if (barMode === 'inline') {
    return /*#__PURE__*/_jsx(View, {
      style: [styles.inlineBar, resolvedStyle],
      testID: testID,
      onLayout: ({
        nativeEvent
      }) => handleBarLayout(nativeEvent.layout.height),
      children: /*#__PURE__*/_jsx(SegmentedControl, {
        options: labels,
        selectedIndex: selectedIndex,
        onChange: handleSelectedIndexChange,
        screenWidth: contentWidth,
        scrollX: scrollX,
        syncWithScroll: resolvedSyncWithScroll,
        isImmediatePressFeedback: !resolvedSyncWithScroll,
        testIDs: tabTestIDs
      })
    });
  }
  return /*#__PURE__*/_jsx(StickySegmentedControl, {
    options: labels,
    selectedIndex: selectedIndex,
    onChange: handleSelectedIndexChange,
    screenWidth: contentWidth,
    scrollX: scrollX,
    style: resolvedStyle,
    syncWithScroll: resolvedSyncWithScroll,
    testID: testID,
    testIDs: tabTestIDs,
    top: resolvedTop,
    animatedStyle: resolvedAnimatedStyle,
    onLayout: ({
      nativeEvent
    }) => handleBarLayout(nativeEvent.layout.height)
  });
};
const styles = StyleSheet.create({
  inlineBar: {
    width: '100%'
  }
});
export const StickyTabsBar = /*#__PURE__*/memo(StickyTabsBarComponent);
//# sourceMappingURL=StickyTabsBar.js.map