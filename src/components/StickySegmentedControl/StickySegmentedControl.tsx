import Animated from 'react-native-reanimated';

import { SegmentedControl } from '../SegmentedControl';
import type { StickySegmentedControlProps } from './StickySegmentedControl.types';

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
  syncWithScroll = true,
}: StickySegmentedControlProps) => (
  <Animated.View
    style={[style, { top }, animatedStyle]}
    testID={testID}
    onLayout={onLayout}
  >
    <SegmentedControl
      options={options}
      selectedIndex={selectedIndex}
      onChange={onChange}
      screenWidth={screenWidth}
      scrollX={scrollX}
      syncWithScroll={syncWithScroll}
      testIDs={testIDs}
    />
  </Animated.View>
);
