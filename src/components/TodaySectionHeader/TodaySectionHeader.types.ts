import type { StyleProp, ViewStyle } from 'react-native';

/** Today feed section divider (Figma `TodaySectionHeader`): line, title with count, collapse chevron, line. */
export interface TodaySectionHeaderProps {
  /**
   * Section label including the task count, e.g. `"Overdue: 3"`
   * (Figma TEXT `title`, layer "Раздел: счётчик"). `caption/regular`.
   * Also the screen-reader label of the toggle.
   */
  title: string;
  /** Shows the round collapse chevron and makes the row a toggle. Figma BOOLEAN `isCollapsible`. Defaults to `true`. */
  isCollapsible?: boolean;
  /** Section is open: chevron points up. Figma VARIANT `isExpanded` (`true` | `false`). Defaults to `true`. */
  isExpanded?: boolean;
  /** Overdue section from a past day: title in red. Figma VARIANT `isPastDate` (`false` | `true`). Defaults to `false`. */
  isPastDate?: boolean;
  /** Called when a collapsible row is tapped. Without it the row is static. */
  onToggle?: () => void;
  /** Outer style, applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the row. */
  testID?: string;
}
