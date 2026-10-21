"use strict";

import { useMemo } from 'react';
import { StickyTabsBar } from "./StickyTabsBar.js";
import { StickyTabsContent } from "./StickyTabsContent.js";
import { isStickyTabsPanelElement, StickyTabsPanel } from "./StickyTabsPanel.js";
import { StickyTabsSpacer } from "./StickyTabsSpacer.js";
import { StickyTabsBarProvider, StickyTabsProvider } from "./StickyTabsContext.js";
import { collectStickyTabsPanels, useStickyTabsState } from "./useStickyTabsState.js";

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
 */
import { jsx as _jsx } from "react/jsx-runtime";
const StickyTabsRoot = ({
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
  } = useMemo(() => collectStickyTabsPanels(children, isStickyTabsPanelElement), [children]);
  const contextValue = useStickyTabsState({
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
  const barContextValue = useMemo(() => ({
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
  return /*#__PURE__*/_jsx(StickyTabsProvider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(StickyTabsBarProvider, {
      value: barContextValue,
      children: layoutChildren
    })
  });
};
export const StickyTabs = Object.assign(StickyTabsRoot, {
  Bar: StickyTabsBar,
  Content: StickyTabsContent,
  Panel: StickyTabsPanel,
  Spacer: StickyTabsSpacer
});
//# sourceMappingURL=StickyTabs.js.map