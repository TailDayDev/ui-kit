import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * - `inline`: pill sized to its content (default).
 * - `fullWidth`: stretches across the parent, content centered.
 * - `iconOnly`: 20pt badge with just the icon.
 */
export type StatusBadgeLayout = 'fullWidth' | 'iconOnly' | 'inline';

/** Side of the label the icon is drawn on. */
export type StatusBadgeIconPosition = 'left' | 'right';

/**
 * Semantic look: `success` (green, check left), `danger` (red, alert right),
 * `warning` (yellow, dark alert right), `neutral` (gray, gray alert right).
 */
export type StatusBadgeTone = 'danger' | 'neutral' | 'success' | 'warning';

interface StatusBadgeBaseProps {
  /** Overrides the tone's icon side. */
  iconPosition?: StatusBadgeIconPosition;
  /** Badge text (`caption/regular`). Not shown in `iconOnly`. */
  label: string;
  /** Badge shape. Defaults to `'inline'`. */
  layout?: StatusBadgeLayout;
  /** Container style, applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier. */
  testID?: string;
}

/** Badge whose colors and icon come from `tone`. */
export interface SemanticStatusBadgeProps extends StatusBadgeBaseProps {
  /** Semantic look. */
  tone: StatusBadgeTone;

  /** @deprecated Use `tone` instead. */
  backgroundColor?: never;

  /** @deprecated The icon is resolved from `tone`. */
  icon?: never;

  /** @deprecated The text color is resolved from `tone`. */
  textColor?: never;

  /** @deprecated Typography is resolved from `tone`. */
  textStyle?: never;
}

/** @deprecated Use `SemanticStatusBadgeProps` with `tone`. */
export interface LegacyStatusBadgeProps extends StatusBadgeBaseProps {
  tone?: never;

  /** @deprecated Use `tone` instead. */
  backgroundColor: string;

  /** @deprecated The icon is resolved from `tone`. */
  icon: ReactNode;

  /** @deprecated The text color is resolved from `tone`. */
  textColor: string;

  /** @deprecated Typography is resolved from `tone`. */
  textStyle?: TextStyle;
}

/** Status pill: semantic (`tone`) or legacy (explicit colors and icon). */
export type StatusBadgeProps =
  LegacyStatusBadgeProps | SemanticStatusBadgeProps;
