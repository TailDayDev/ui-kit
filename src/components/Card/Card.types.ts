import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

/** Bordered surface with an optional title row. Tappable when `onPress` is set. */
export interface CardProps {
  /** Header text (`headline/bold`). The header row is rendered only when this is set. */
  title?: string;
  /** Extra content shown in the header row next to the title (badge, action, icon). */
  additional?: ReactNode;
  /** Side of the title where `additional` is placed. Defaults to `'right'`. */
  additionalPosition?: 'left' | 'right';
  /** Card body. */
  children?: ReactNode;
  /** Style applied last, over the shadow. Kept for API compatibility with the app. */
  cardStyles?: StyleProp<ViewStyle>;
  /** Style of the header row. */
  topContainerStyles?: StyleProp<ViewStyle>;
  /** Makes the card a button. Without it the card is a static `View`. */
  onPress?: () => void;
  /** Blocks `onPress`. The card is not dimmed (same as the app). */
  disabled?: boolean;
  /** Draws the `shadow/block` drop shadow. */
  withShadow?: boolean;
  /** Touch handling of the card container. Defaults to `'auto'`. */
  pointerEvents?: ViewProps['pointerEvents'];
  /** Container style applied after the base card style, before the shadow. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the container. */
  testID?: string;
  /** Maximum lines of the title before it is truncated. Defaults to 1. */
  titleNumberOfLines?: number;
  /** Extra title text style. */
  titleStyles?: StyleProp<TextStyle>;
  /** Screen-reader label of the tappable card. */
  accessibilityLabel?: string;
}
