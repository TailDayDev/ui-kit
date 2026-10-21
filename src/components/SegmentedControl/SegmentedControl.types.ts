import type { Animated as RNAnimated } from 'react-native';

export interface SegmentedControlProps {
  /** Segment labels, left to right. */
  options: string[];
  /** Index of the selected segment. */
  selectedIndex: number;
  /** Called with the pressed segment index (also for the already selected one). */
  onChange: (index: number) => void;
  /** Test identifiers per segment, same order as `options`. */
  testIDs?: string[];
  /**
   * Horizontal scroll offset of a paged container. With `syncWithScroll` the
   * pill follows it (`index * screenWidth` → `index * segmentWidth`).
   */
  scrollX?: RNAnimated.Value;
  /** Page width that `scrollX` advances by per segment. Defaults to 0 (no scroll link). */
  screenWidth?: number;
  /** Drive the pill from `scrollX` when it is given. Defaults to `true`. */
  syncWithScroll?: boolean;
  /**
   * Start the pill animation on press instead of waiting for the new
   * `selectedIndex`. Only used when the pill is not scroll-linked. Defaults to `false`.
   */
  isImmediatePressFeedback?: boolean;
  /** Pill animation duration in ms. Defaults to 250. */
  animationDurationMs?: number;
}
