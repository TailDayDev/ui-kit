import type { StyleProp, ViewStyle } from 'react-native';

/** Figma `TodayTaskTime` › `tone` options. */
export type TodayTaskTimeTone = 'default' | 'overdue' | 'completed';

/**
 * Task time at the right of a Today task card header and a caption under it:
 * time left, delay or completion time (Figma `TodayTaskTime`).
 */
export interface TodayTaskTimeProps {
  /** Time, e.g. "10:00" (`headline/bold`). Figma `title`. */
  title: string;
  /** Caption under the time (`smallCaption/regular`). Figma `subtitle`. */
  subtitle?: string;
  /** Shows the caption. Figma `hasSubtitle`. Defaults to `true`. */
  hasSubtitle?: boolean;
  /** Color tone: `overdue` paints both lines red. Figma `tone`. Defaults to `'default'`. */
  tone?: TodayTaskTimeTone;
  /** Outer style. Applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the container. */
  testID?: string;
}
