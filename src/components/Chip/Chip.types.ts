import type { StyleProp, ViewStyle } from 'react-native';

/** Props of `Chip` (Figma `Chip`): a filter chip with a name and a count badge. */
export interface ChipProps {
  /** Chip label. Figma TEXT `name`. */
  name: string;
  /** Count shown in the badge, already formatted by the caller. Figma TEXT `count`. */
  count?: string;
  /** Shows the count badge. Figma BOOLEAN `hasBadge`. Defaults to `true`. */
  hasBadge?: boolean;
  /** Selected look: accent border, soft-accent fill, bold label. Figma VARIANT `isSelected`. Defaults to `true`. */
  isSelected?: boolean;
  /** Called on tap. Without it the chip is static. */
  onPress?: () => void;
  /** Screen-reader text. Defaults to the visible name and count. */
  accessibilityLabel?: string;
  /** Outer style, e.g. margins. Applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}
