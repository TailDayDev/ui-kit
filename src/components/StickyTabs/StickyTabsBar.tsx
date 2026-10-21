import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { SegmentedControl } from '../SegmentedControl';
import { StickySegmentedControl } from '../StickySegmentedControl';

import { useStickyTabsBarContext } from './StickyTabsContext';
import type { StickyTabsBarProps } from './StickyTabs.types';

const StickyTabsBarComponent = ({
  animatedStyle,
  style,
  syncWithScroll,
  top,
}: StickyTabsBarProps) => {
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
    testID,
  } = useStickyTabsBarContext();

  const resolvedTop = top ?? stickyBar?.top ?? 0;
  const resolvedAnimatedStyle = animatedStyle ?? stickyBar?.animatedStyle;
  const resolvedStyle = useMemo(
    () => [barStyle, stickyBar?.style, style],
    [barStyle, stickyBar?.style, style],
  );
  const resolvedSyncWithScroll =
    syncWithScroll ?? stickyBar?.syncWithScroll ?? true;

  if (barMode === 'inline') {
    return (
      <View
        style={[styles.inlineBar, resolvedStyle]}
        testID={testID}
        onLayout={({ nativeEvent }) =>
          handleBarLayout(nativeEvent.layout.height)
        }
      >
        <SegmentedControl
          options={labels}
          selectedIndex={selectedIndex}
          onChange={handleSelectedIndexChange}
          screenWidth={contentWidth}
          scrollX={scrollX}
          syncWithScroll={resolvedSyncWithScroll}
          isImmediatePressFeedback={!resolvedSyncWithScroll}
          testIDs={tabTestIDs}
        />
      </View>
    );
  }

  return (
    <StickySegmentedControl
      options={labels}
      selectedIndex={selectedIndex}
      onChange={handleSelectedIndexChange}
      screenWidth={contentWidth}
      scrollX={scrollX}
      style={resolvedStyle}
      syncWithScroll={resolvedSyncWithScroll}
      testID={testID}
      testIDs={tabTestIDs}
      top={resolvedTop}
      animatedStyle={resolvedAnimatedStyle}
      onLayout={({ nativeEvent }) => handleBarLayout(nativeEvent.layout.height)}
    />
  );
};

const styles = StyleSheet.create({
  inlineBar: {
    width: '100%',
  },
});

export const StickyTabsBar = memo(StickyTabsBarComponent);
