import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Visual radio indicator: a ring with an accent dot when active.
 *
 * It is not tappable and has no accessibility role of its own: the row that
 * contains it owns `accessibilityRole="radio"` and `accessibilityState.checked`
 * (see `ScheduleRadioRow`).
 */
export interface RadioProps {
  /** Shows the accent ring and the inner dot. */
  isActive: boolean;
  /** Diameter of the inner dot in points. Defaults to 12. */
  dotSize?: number;
  /** Outer diameter in points. Defaults to 24 (Figma `Radio` size=24). */
  size?: number;
  /** Extra style for the outer ring (e.g. margins from the parent layout). */
  style?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}
