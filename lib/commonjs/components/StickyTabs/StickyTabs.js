"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickyTabs = void 0;
var _react = require("react");
var _StickyTabsBar = require("./StickyTabsBar.js");
var _StickyTabsContent = require("./StickyTabsContent.js");
var _StickyTabsPanel = require("./StickyTabsPanel.js");
var _StickyTabsSpacer = require("./StickyTabsSpacer.js");
var _StickyTabsContext = require("./StickyTabsContext.js");
var _useStickyTabsState = require("./useStickyTabsState.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Unified tab shell for screen-level segmented navigation.
 *
 * ```tsx
 * <StickyTabs selectedIndex={tab} onSelectedIndexChange={setTab} stickyBar={{ top, animatedStyle, style }}>
 *   <StickyTabs.Panel label="Care" testID="screen.tabs.care"><CareInfoTab /></StickyTabs.Panel>
 *   <StickyTabs.Panel label="Pet" testID="screen.tabs.pet"><PetCardTab /></StickyTabs.Panel>
 *   Panel content wrappers expose `${testID}.panel` selectors.
 *
 *   <Animated.ScrollView>
 *     <StickyTabs.Spacer />
 *     <StickyTabs.Content />
 *   </Animated.ScrollView>
 *   <StickyTabs.Bar />
 * </StickyTabs>
 * ```
 */const StickyTabsRoot = ({
  barMode = 'sticky-overlay',
  barStyle,
  children,
  contentMode = 'immediate',
  contentTransitionMs,
  contentWidth,
  defaultSelectedIndex,
  onBarLayout,
  onBeforeTabChange,
  onContentWidthChange,
  onSelectedIndexChange,
  preserveContentHeightDuringTransition,
  scrollX,
  selectedIndex,
  stickyBar,
  testID
}) => {
  const {
    layoutChildren,
    panels
  } = (0, _react.useMemo)(() => (0, _useStickyTabsState.collectStickyTabsPanels)(children, _StickyTabsPanel.isStickyTabsPanelElement), [children]);
  const contextValue = (0, _useStickyTabsState.useStickyTabsState)({
    barMode,
    barStyle,
    contentMode,
    contentTransitionMs,
    contentWidth,
    defaultSelectedIndex,
    onBarLayout,
    onBeforeTabChange,
    onContentWidthChange,
    onSelectedIndexChange,
    panels,
    preserveContentHeightDuringTransition,
    scrollX,
    selectedIndex,
    stickyBar,
    testID
  });
  const barContextValue = (0, _react.useMemo)(() => ({
    barMode: contextValue.barMode,
    barStyle: contextValue.barStyle,
    contentWidth: contextValue.contentWidth,
    handleBarLayout: contextValue.handleBarLayout,
    handleSelectedIndexChange: contextValue.handleSelectedIndexChange,
    labels: contextValue.labels,
    scrollX: contextValue.scrollX,
    selectedIndex: contextValue.selectedIndex,
    stickyBar: contextValue.stickyBar,
    tabTestIDs: contextValue.tabTestIDs,
    testID: contextValue.testID
  }), [contextValue.barMode, contextValue.barStyle, contextValue.contentWidth, contextValue.handleBarLayout, contextValue.handleSelectedIndexChange, contextValue.labels, contextValue.scrollX, contextValue.selectedIndex, contextValue.stickyBar, contextValue.tabTestIDs, contextValue.testID]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_StickyTabsContext.StickyTabsProvider, {
    value: contextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_StickyTabsContext.StickyTabsBarProvider, {
      value: barContextValue,
      children: layoutChildren
    })
  });
};
const StickyTabs = exports.StickyTabs = Object.assign(StickyTabsRoot, {
  Bar: _StickyTabsBar.StickyTabsBar,
  Content: _StickyTabsContent.StickyTabsContent,
  Panel: _StickyTabsPanel.StickyTabsPanel,
  Spacer: _StickyTabsSpacer.StickyTabsSpacer
});
//# sourceMappingURL=StickyTabs.js.map