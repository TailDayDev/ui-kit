import type { StyleProp, ViewStyle } from 'react-native';

import type { IconComponent } from '../../primitives';

/** Floating action button: 56pt green circle with a white glyph (Figma `Fab`). */
export interface FabProps {
  /** Called on tap. Not called while `disabled`. */
  onPress?: () => void;
  /** Screen-reader text. Required: the button has no visible label. */
  accessibilityLabel: string;
  /** Blocks interaction and dims the whole button (`opacity.disabled`, 0.45). */
  disabled?: boolean;
  /** Glyph drawn in white at 28pt. Defaults to `PlusIcon`. */
  icon?: IconComponent;
  /**
   * Outer style. Positioning (`position: 'absolute'`, `right`, `bottom`) stays
   * in the app; do not override size, fill or radius.
   */
  style?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}
