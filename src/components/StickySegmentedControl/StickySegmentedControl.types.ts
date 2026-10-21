import type {
  Animated as RNAnimated,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { AnimatedStyle } from 'react-native-reanimated';

export interface StickySegmentedControlProps {
  /** Reanimated style for the wrapper (e.g. collapse/translate driven by scroll). */
  animatedStyle?: AnimatedStyle<ViewStyle>;
  /** Called with the pressed segment index. */
  onChange: (index: number) => void;
  /** Segment labels. */
  options: string[];
  /** Page width that `scrollX` advances by per segment. */
  screenWidth: number;
  /** Index of the selected segment. */
  selectedIndex: number;
  /** Wrapper style (usually absolute positioning over the scroll content). */
  style: StyleProp<ViewStyle>;
  /** Wrapper test identifier. */
  testID?: string;
  /** Test identifiers per segment. */
  testIDs?: string[];
  /** Wrapper `top` offset. */
  top: number;
  /** Wrapper layout callback (used to measure the bar height). */
  onLayout?: (event: LayoutChangeEvent) => void;
  /** Horizontal scroll offset the pill follows when `syncWithScroll`. */
  scrollX?: RNAnimated.Value;
  /** Drive the pill from `scrollX`. Defaults to `true`. */
  syncWithScroll?: boolean;
}
