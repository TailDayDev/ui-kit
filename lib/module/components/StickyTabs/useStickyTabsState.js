"use strict";

import { Children, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { clampStickyTabIndex, DEFAULT_STICKY_TABS_BAR_HEIGHT, getStickyTabsPanelTestID, STICKY_TABS_CONTENT_TRANSITION_MS } from "./constants.js";
import { useStickyTabsScrollX } from "./useStickyTabsScrollX.js";
const resolveInitialVisitedTabs = initialIndex => new Set([initialIndex]);
export const useStickyTabsState = ({
  barMode = 'sticky-overlay',
  barStyle,
  contentMode = 'immediate',
  contentTransitionMs = STICKY_TABS_CONTENT_TRANSITION_MS,
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
  const [uncontrolledSelectedIndex, setUncontrolledSelectedIndex] = useState(defaultSelectedIndex);
  const selectedIndex = isControlled ? controlledSelectedIndex : uncontrolledSelectedIndex;
  const resolvedSelectedIndex = useMemo(() => clampStickyTabIndex(selectedIndex, panels.length), [panels.length, selectedIndex]);
  const [contentIndex, setContentIndex] = useState(resolvedSelectedIndex);
  const [barHeight, setBarHeight] = useState(DEFAULT_STICKY_TABS_BAR_HEIGHT);
  const [uncontrolledContentWidth, setUncontrolledContentWidth] = useState(0);
  const [visitedTabIndexes, setVisitedTabIndexes] = useState(() => resolveInitialVisitedTabs(resolvedSelectedIndex));
  const [lastSyncedContentHeight, setLastSyncedContentHeight] = useState(0);
  const pendingContentIndexTaskRef = useRef(null);
  const internalScrollX = useMemo(() => new Animated.Value(0), []);
  const scrollX = controlledScrollX ?? internalScrollX;
  const contentWidth = controlledContentWidth ?? uncontrolledContentWidth;
  const labels = useMemo(() => panels.map(panel => panel.label), [panels]);
  const tabTestIDs = useMemo(() => panels.map(panel => panel.testID), [panels]);
  const panelTestIDs = useMemo(() => tabTestIDs.map(getStickyTabsPanelTestID), [tabTestIDs]);
  const isVisitedStateRequired = (contentMode === 'keep-mounted-hidden' || contentMode === 'keep-mounted-stacked') && panels.some(panel => panel.lazy || !panel.keepMounted);
  const isDelayedContentMode = contentMode === 'active-only' && contentTransitionMs > 0;
  const isContentSynced = !isDelayedContentMode || resolvedSelectedIndex === contentIndex;
  useStickyTabsScrollX({
    contentWidth,
    isEnabled: contentMode !== 'keep-mounted-stacked',
    // The internal value only feeds the indicator transform; a controlled one
    // may be driven by its owner on the JS thread, so it keeps the JS driver.
    isNativeDriverSafe: controlledScrollX === undefined,
    scrollX,
    selectedIndex: resolvedSelectedIndex,
    tabCount: panels.length
  });
  useEffect(() => {
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
  useEffect(() => {
    if (panels.length <= 0) {
      return;
    }
    setContentIndex(previousContentIndex => clampStickyTabIndex(previousContentIndex, panels.length));
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
  useEffect(() => {
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
  useEffect(() => {
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
  const setSelectedIndex = useCallback(nextIndex => {
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
  const handleBarLayout = useCallback(height => {
    setBarHeight(previousHeight => Math.abs(previousHeight - height) < 1 ? previousHeight : height);
    onBarLayout?.(height);
  }, [onBarLayout]);
  const handleContentWidthChange = useCallback(width => {
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
export const collectStickyTabsPanels = (children, isPanelElement) => {
  const panels = [];
  const layoutChildren = [];
  Children.forEach(children, child => {
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
//# sourceMappingURL=useStickyTabsState.js.map