import { useMemo } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { useStickyTabsContext } from './StickyTabsContext';
import type {
  StickyTabsContentMode,
  StickyTabsContentProps,
} from './StickyTabs.types';

const shouldRenderPanel = ({
  contentMode,
  isActive,
  isVisited,
  keepMounted,
  lazy,
}: {
  contentMode: StickyTabsContentMode;
  isActive: boolean;
  isVisited: boolean;
  keepMounted?: boolean;
  lazy?: boolean;
}) => {
  if (
    contentMode === 'keep-mounted-hidden' ||
    contentMode === 'keep-mounted-stacked'
  ) {
    if (lazy && !isVisited) {
      return false;
    }

    return keepMounted || isVisited;
  }

  return isActive;
};

/** Renders the panels according to `contentMode`; measures the content width. */
export const StickyTabsContent = ({
  containerStyle,
  panelStyle,
}: StickyTabsContentProps) => {
  const {
    contentIndex,
    contentMode,
    handleContentWidthChange,
    isContentSynced,
    lastSyncedContentHeight,
    panelTestIDs,
    panels,
    preserveContentHeightDuringTransition,
    selectedIndex,
    setLastSyncedContentHeight,
    visitedTabIndexes,
  } = useStickyTabsContext();
  const isStackedContent = contentMode === 'keep-mounted-stacked';
  const isTargetTransitionShellShown =
    contentMode === 'active-only' &&
    !isContentSynced &&
    panels[selectedIndex]?.transitionShell != null;

  const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    if (!nativeEvent.layout.width) {
      return;
    }

    handleContentWidthChange(nativeEvent.layout.width);
  };

  const handleContentHeightLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    if (!isContentSynced) {
      return;
    }

    setLastSyncedContentHeight(nativeEvent.layout.height);
  };

  const containerStyles = useMemo(
    () => [
      styles.container,
      isStackedContent ? styles.stackedContainer : null,
      containerStyle,
      !isContentSynced &&
      preserveContentHeightDuringTransition &&
      lastSyncedContentHeight > 0
        ? { minHeight: lastSyncedContentHeight }
        : null,
    ],
    [
      containerStyle,
      isContentSynced,
      isStackedContent,
      lastSyncedContentHeight,
      preserveContentHeightDuringTransition,
    ],
  );

  return (
    <View style={containerStyles} onLayout={handleLayout}>
      <View
        style={isStackedContent ? styles.stackedContent : null}
        onLayout={handleContentHeightLayout}
      >
        {panels.map((panel, index) => {
          const isTargetTransitionShell =
            isTargetTransitionShellShown && index === selectedIndex;
          const isActive =
            contentMode === 'keep-mounted-hidden' ||
            contentMode === 'immediate' ||
            isStackedContent
              ? index === selectedIndex
              : index === contentIndex;
          const isVisited = visitedTabIndexes.has(index);
          const shouldRender =
            isTargetTransitionShell ||
            (!isTargetTransitionShellShown &&
              shouldRenderPanel({
                contentMode,
                isActive,
                isVisited,
                keepMounted: panel.keepMounted,
                lazy: panel.lazy,
              }));

          if (!shouldRender) {
            return null;
          }

          const isHidden = contentMode === 'keep-mounted-hidden' && !isActive;

          return (
            <View
              key={panelTestIDs[index]}
              pointerEvents={isStackedContent && !isActive ? 'none' : 'auto'}
              style={[
                styles.panel,
                isStackedContent ? styles.stackedPanel : null,
                panelStyle,
                isHidden ? styles.hiddenPanel : null,
                isStackedContent
                  ? isActive
                    ? styles.activeStackedPanel
                    : styles.inactiveStackedPanel
                  : null,
              ]}
              testID={panelTestIDs[index]}
            >
              {isTargetTransitionShell ? panel.transitionShell : panel.children}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  hiddenPanel: {
    display: 'none',
  },
  panel: {
    width: '100%',
  },
  activeStackedPanel: {
    opacity: 1,
    zIndex: 1,
  },
  inactiveStackedPanel: {
    opacity: 0,
    zIndex: 0,
  },
  stackedContainer: {
    flex: 1,
  },
  stackedContent: {
    flex: 1,
  },
  stackedPanel: {
    ...StyleSheet.absoluteFillObject,
  },
});
