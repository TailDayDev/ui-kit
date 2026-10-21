import type { StyleProp, ViewStyle } from 'react-native';

/** Floating «scroll to today» circle (Figma `ScrollToTodayButton`). */
export interface ScrollToTodayButtonProps {
  /** Called on tap: scroll the feed to today's tasks. */
  onPress: () => void;
  /** Screen-reader text, e.g. «Сегодня». Required: the button has no visible label. */
  accessibilityLabel: string;
  /** Outer style, e.g. absolute positioning above the tab bar. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}
