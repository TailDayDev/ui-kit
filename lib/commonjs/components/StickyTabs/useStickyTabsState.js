"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStickyTabsState = exports.collectStickyTabsPanels = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _constants = require("./constants.js");
var _useStickyTabsScrollX = require("./useStickyTabsScrollX.js");
const resolveInitialVisitedTabs = initialIndex => new Set([initialIndex]);
const useStickyTabsState = ({
  barMode = 'sticky-overlay',
  barStyle,
  contentMode = 'immediate',
  contentTransitionMs = _constants.STICKY_TABS_CONTENT_TRANSITION_MS,
  contentWidth: controlledContentWidth,
  defaultSelectedIndex = 0,
  onBarLayout,
  onBeforeTabChange,
  onContentWidthChange,
  onSelectedIndexChange,
  panels,
  preserveContentHeightDuringTransition = true,
  scrollX: controlledScrollX,
  selectedIndex: controlledSelectedIndex,
  stickyBar,
  testID
}) => {
  const isControlled = controlledSelectedIndex !== undefined;
  const [uncontrolledSelectedIndex, setUncontrolledSelectedIndex] = (0, _react.useState)(defaultSelectedIndex);
  const selectedIndex = isControlled ? controlledSelectedIndex : uncontrolledSelectedIndex;
  const resolvedSelectedIndex = (0, _react.useMemo)(() => (0, _constants.clampStickyTabIndex)(selectedIndex, panels.length), [panels.length, selectedIndex]);
  const [contentIndex, setContentIndex] = (0, _react.useState)(resolvedSelectedIndex);
  const [barHeight, setBarHeight] = (0, _react.useState)(_constants.DEFAULT_STICKY_TABS_BAR_HEIGHT);
  const [uncontrolledContentWidth, setUncontrolledContentWidth] = (0, _react.useState)(0);
  const [visitedTabIndexes, setVisitedTabIndexes] = (0, _react.useState)(() => resolveInitialVisitedTabs(resolvedSelectedIndex));
  const [lastSyncedContentHeight, setLastSyncedContentHeight] = (0, _react.useState)(0);
  const pendingContentIndexTaskRef = (0, _react.useRef)(null);
  const internalScrollX = (0, _react.useMemo)(() => new _reactNative.Animated.Value(0), []);
  const scrollX = controlledScrollX ?? internalScrollX;
  const contentWidth = controlledContentWidth ?? uncontrolledContentWidth;
  const labels = (0, _react.useMemo)(() => panels.map(panel => panel.label), [panels]);
  const tabTestIDs = (0, _react.useMemo)(() => panels.map(panel => panel.testID), [panels]);
  const panelTestIDs = (0, _react.useMemo)(() => tabTestIDs.map(_constants.getStickyTabsPanelTestID), [tabTestIDs]);
  const isVisitedStateRequired = (contentMode === 'keep-mounted-hidden' || contentMode === 'keep-mounted-stacked') && panels.some(panel => panel.lazy || !panel.keepMounted);
  const isDelayedContentMode = contentMode === 'active-only' && contentTransitionMs > 0;
  const isContentSynced = !isDelayedContentMode || resolvedSelectedIndex === contentIndex;
  (0, _useStickyTabsScrollX.useStickyTabsScrollX)({
    contentWidth,
    isEnabled: contentMode !== 'keep-mounted-stacked',
    // The internal value only feeds the indicator transform; a controlled one
    // may be driven by its owner on the JS thread, so it keeps the JS driver.
    isNativeDriverSafe: controlledScrollX === undefined,
    scrollX,
    selectedIndex: resolvedSelectedIndex,
    tabCount: panels.length
  });
  (0, _react.useEffect)(() => {
    if (panels.length <= 0) {
      return;
    }
    if (resolvedSelectedIndex !== selectedIndex) {
      if (__DEV__) {
        console.warn('[StickyTabs] Clamping selectedIndex after panels change', {
          clampedIndex: resolvedSelectedIndex,
          panelCount: panels.length,
          previousIndex: selectedIndex
        });
      }
      if (!isControlled) {
        setUncontrolledSelectedIndex(resolvedSelectedIndex);
      }
      onSelectedIndexChange?.(resolvedSelectedIndex);
    }
  }, [isControlled, onSelectedIndexChange, panels.length, resolvedSelectedIndex, selectedIndex]);
  (0, _react.useEffect)(() => {
    if (panels.length <= 0) {
      return;
    }
    setContentIndex(previousContentIndex => (0, _constants.clampStickyTabIndex)(previousContentIndex, panels.length));
    if (!isVisitedStateRequired) {
      return;
    }
    setVisitedTabIndexes(previousVisitedTabs => {
      const nextVisitedTabs = [...previousVisitedTabs].filter(index => index < panels.length);
      if (nextVisitedTabs.length === previousVisitedTabs.size) {
        return previousVisitedTabs;
      }
      return new Set(nextVisitedTabs);
    });
  }, [isVisitedStateRequired, panels.length]);
  (0, _react.useEffect)(() => {
    if (!isVisitedStateRequired) {
      return;
    }
    setVisitedTabIndexes(previousVisitedTabs => {
      if (previousVisitedTabs.has(resolvedSelectedIndex)) {
        return previousVisitedTabs;
      }
      return new Set([...previousVisitedTabs, resolvedSelectedIndex]);
    });
  }, [isVisitedStateRequired, resolvedSelectedIndex]);
  (0, _react.useEffect)(() => {
    if (contentMode !== 'active-only') {
      return;
    }
    if (!isDelayedContentMode) {
      setContentIndex(resolvedSelectedIndex);
      return;
    }
    if (resolvedSelectedIndex === contentIndex) {
      return;
    }
    pendingContentIndexTaskRef.current?.cancel();
    const timeoutId = setTimeout(() => {
      setContentIndex(resolvedSelectedIndex);
    }, contentTransitionMs);
    pendingContentIndexTaskRef.current = {
      cancel: () => clearTimeout(timeoutId)
    };
    return () => {
      pendingContentIndexTaskRef.current?.cancel();
    };
  }, [contentIndex, contentMode, contentTransitionMs, isDelayedContentMode, resolvedSelectedIndex]);
  const setSelectedIndex = (0, _react.useCallback)(nextIndex => {
    if (nextIndex === resolvedSelectedIndex) {
      return;
    }
    if (nextIndex < 0 || nextIndex >= panels.length) {
      return;
    }
    onBeforeTabChange?.(resolvedSelectedIndex, nextIndex);
    if (!isControlled) {
      setUncontrolledSelectedIndex(nextIndex);
    }
    onSelectedIndexChange?.(nextIndex);
  }, [isControlled, onBeforeTabChange, onSelectedIndexChange, panels.length, resolvedSelectedIndex]);
  const handleBarLayout = (0, _react.useCallback)(height => {
    setBarHeight(previousHeight => Math.abs(previousHeight - height) < 1 ? previousHeight : height);
    onBarLayout?.(height);
  }, [onBarLayout]);
  const handleContentWidthChange = (0, _react.useCallback)(width => {
    if (controlledContentWidth === undefined) {
      setUncontrolledContentWidth(width);
    }
    onContentWidthChange?.(width);
  }, [controlledContentWidth, onContentWidthChange]);
  return {
    barHeight,
    barMode,
    barStyle,
    contentIndex,
    contentMode,
    contentTransitionMs,
    contentWidth,
    handleBarLayout,
    handleContentWidthChange,
    handleSelectedIndexChange: setSelectedIndex,
    isContentSynced,
    labels,
    lastSyncedContentHeight,
    panelTestIDs,
    panels,
    preserveContentHeightDuringTransition,
    scrollX,
    selectedIndex: resolvedSelectedIndex,
    setLastSyncedContentHeight,
    stickyBar,
    tabTestIDs,
    testID,
    visitedTabIndexes
  };
};
exports.useStickyTabsState = useStickyTabsState;
const collectStickyTabsPanels = (children, isPanelElement) => {
  const panels = [];
  const layoutChildren = [];
  _react.Children.forEach(children, child => {
    if (isPanelElement(child)) {
      panels.push({
        children: child.props.children,
        keepMounted: child.props.keepMounted,
        label: child.props.label,
        lazy: child.props.lazy,
        testID: child.props.testID,
        transitionShell: child.props.transitionShell
      });
      return;
    }
    if (child !== null && child !== undefined) {
      layoutChildren.push(child);
    }
  });
  return {
    layoutChildren,
    panels
  };
};
exports.collectStickyTabsPanels = collectStickyTabsPanels;
//# sourceMappingURL=useStickyTabsState.js.map