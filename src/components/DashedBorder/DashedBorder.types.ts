import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/** Fixed-size box with a dashed SVG outline; children are centered inside. */
export interface DashedBorderProps {
  /** Outer width in points (the SVG is drawn at this size). */
  width: number;
  /** Outer height in points. */
  height: number;
  /** Dash length in points. Defaults to 8. */
  dashLength?: number;
  /** Gap between dashes in points. Defaults to 5. */
  gapLength?: number;
  /** Outline width in points. Defaults to 1.5. The stroke is drawn inside the box. */
  strokeWidth?: number;
  /**
   * Outline color (any color string; pass a theme value such as
   * `theme.palette.lightGray`). Defaults to `palette.lightGray`.
   */
  color?: string;
  /** Corner radius of the outline and the content box. Defaults to 8 (`radius.sm`). */
  borderRadius?: number;
  /** Style of the inner content box (centered, `flex: 1`). */
  style?: StyleProp<ViewStyle>;
  /** Content drawn inside the outline. */
  children?: ReactNode;
}
