import { useMemo } from 'react';

import { StickyTabsBar } from './StickyTabsBar';
import { StickyTabsContent } from './StickyTabsContent';
import { isStickyTabsPanelElement, StickyTabsPanel } from './StickyTabsPanel';
import { StickyTabsSpacer } from './StickyTabsSpacer';
import { StickyTabsBarProvider, StickyTabsProvider } from './StickyTabsContext';
import type {
  StickyTabsBarContextValue,
  StickyTabsProps,
} from './StickyTabs.types';
import {
  collectStickyTabsPanels,
  useStickyTabsState,
} from './useStickyTabsState';

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
  testID,
}: StickyTabsProps) => {
  const { layoutChildren, panels } = useMemo(
    () => collectStickyTabsPanels(children, isStickyTabsPanelElement),
    [children],
  );

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
    testID,
  });
  const barContextValue = useMemo<StickyTabsBarContextValue>(
    () => ({
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
      testID: contextValue.testID,
    }),
    [
      contextValue.barMode,
      contextValue.barStyle,
      contextValue.contentWidth,
      contextValue.handleBarLayout,
      contextValue.handleSelectedIndexChange,
      contextValue.labels,
      contextValue.scrollX,
      contextValue.selectedIndex,
      contextValue.stickyBar,
      contextValue.tabTestIDs,
      contextValue.testID,
    ],
  );

  return (
    <StickyTabsProvider value={contextValue}>
      <StickyTabsBarProvider value={barContextValue}>
        {layoutChildren}
      </StickyTabsBarProvider>
    </StickyTabsProvider>
  );
};

export const StickyTabs = Object.assign(StickyTabsRoot, {
  Bar: StickyTabsBar,
  Content: StickyTabsContent,
  Panel: StickyTabsPanel,
  Spacer: StickyTabsSpacer,
});
