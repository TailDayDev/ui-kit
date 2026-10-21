import type { ViewProps } from 'react-native';

import type {
  BackgroundRole,
  RadiusKey,
  ShadowKey,
  SpaceKey,
  StrokeKey,
} from '../../tokens';

/** Layout container whose spacing, fill, border and shadow come from tokens. */
export interface BoxProps extends ViewProps {
  /** Padding on all sides, from `theme.space`. */
  padding?: SpaceKey;
  /** Horizontal padding, from `theme.space`. Overrides `padding` on the x axis. */
  paddingX?: SpaceKey;
  /** Vertical padding, from `theme.space`. Overrides `padding` on the y axis. */
  paddingY?: SpaceKey;
  /** Margin on all sides, from `theme.space`. */
  margin?: SpaceKey;
  /** Horizontal margin, from `theme.space`. */
  marginX?: SpaceKey;
  /** Vertical margin, from `theme.space`. */
  marginY?: SpaceKey;
  /** Gap between children, from `theme.space`. */
  gap?: SpaceKey;
  /** Lays children out in a row instead of a column. */
  row?: boolean;
  /** Cross-axis alignment of children. */
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  /** Main-axis distribution of children. */
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /** Fills the remaining space along the parent's main axis (`flex: 1`). */
  flex?: boolean;
  /** Background role from `theme.colors.bg`. */
  background?: BackgroundRole;
  /** Corner radius from `theme.radius`. */
  radius?: RadiusKey;
  /** Border width from `theme.stroke`; color is `theme.colors.border.default`. */
  border?: StrokeKey;
  /** Drop shadow from `theme.shadows`. */
  shadow?: ShadowKey;
}
