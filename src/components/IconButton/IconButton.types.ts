import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/** Icon-only control with a soft-gray fill. Shared by the round and square variants. */
export interface IconControlButtonProps {
  /**
   * The glyph, already sized and colored by the caller
   * (e.g. `<Icon icon={CloseIcon} size={20} />`). Rendered centered.
   */
  icon: ReactNode;
  /** Called on tap. Not called while `disabled` or `loading`. */
  onPress?: () => void;
  /** Blocks interaction and dims the button. */
  disabled?: boolean;
  /**
   * Replaces the icon with a spinner, blocks interaction and reports busy to
   * screen readers. Not dimmed. (Figma `IconSquareButton` loading state.)
   */
  loading?: boolean;
  /** Width and height in points. Defaults to 40. Common sizes: 28, 36, 40, 48. */
  size?: number;
  /** Screen-reader text. Required: the button has no visible label. */
  accessibilityLabel: string;
  /** Test identifier. */
  testID?: string;
  /** Outer style, e.g. margins or absolute positioning. Applied last. */
  style?: StyleProp<ViewStyle>;
}

/** Props of `IconRoundButton`: a circle with diameter `size`. */
export type IconRoundButtonProps = IconControlButtonProps;

/** Props of `IconSquareButton`: a rounded square (radius 8) of side `size`. */
export type IconSquareButtonProps = IconControlButtonProps;

/** @deprecated Use `IconRoundButtonProps` or `IconSquareButtonProps`. */
export type IconButtonProps = IconRoundButtonProps;
