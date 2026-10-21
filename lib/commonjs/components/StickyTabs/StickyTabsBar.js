"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickyTabsBar = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../SegmentedControl/index.js");
var _index2 = require("../StickySegmentedControl/index.js");
var _StickyTabsContext = require("./StickyTabsContext.js");
var _jsxRuntime = require("react/jsx-runtime");
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
  } = (0, _StickyTabsContext.useStickyTabsBarContext)();
  const resolvedTop = top ?? stickyBar?.top ?? 0;
  const resolvedAnimatedStyle = animatedStyle ?? stickyBar?.animatedStyle;
  const resolvedStyle = (0, _react.useMemo)(() => [barStyle, stickyBar?.style, style], [barStyle, stickyBar?.style, style]);
  const resolvedSyncWithScroll = syncWithScroll ?? stickyBar?.syncWithScroll ?? true;
  if (barMode === 'inline') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.inlineBar, resolvedStyle],
      testID: testID,
      onLayout: ({
        nativeEvent
      }) => handleBarLayout(nativeEvent.layout.height),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.SegmentedControl, {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StickySegmentedControl, {
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
const styles = _reactNative.StyleSheet.create({
  inlineBar: {
    width: '100%'
  }
});
const StickyTabsBar = exports.StickyTabsBar = /*#__PURE__*/(0, _react.memo)(StickyTabsBarComponent);
//# sourceMappingURL=StickyTabsBar.js.map