import type { TextStyle } from 'react-native';

import {
  colors,
  minTouchTarget,
  opacity,
  palette,
  radius,
  shadows,
  space,
  stroke,
  typography,
} from '../tokens';

type FontWeight = NonNullable<TextStyle['fontWeight']>;
type TextDecorationLine = NonNullable<TextStyle['textDecorationLine']>;

/**
 * Keeps the token keys but widens the literal values, so a custom theme can
 * supply different values. Font enums stay narrow because React Native needs them.
 */
type Widen<T> = T extends FontWeight
  ? T extends string
    ? FontWeight
    : number
  : T extends TextDecorationLine
    ? TextDecorationLine
    : T extends string
      ? string
      : T extends number
        ? number
        : T extends boolean
          ? boolean
          : T extends readonly (infer Item)[]
            ? readonly Widen<Item>[]
            : { readonly [Key in keyof T]: Widen<T[Key]> };

/** One text style: what `typography.<group>.<weight>` holds. */
export interface TypographyToken {
  fontFamily: string;
  fontWeight: FontWeight;
  fontSize: number;
  lineHeight?: number;
  letterSpacing: number;
  textDecorationLine?: TextDecorationLine;
}

/**
 * The full set of design values a component may read.
 * Components reference values by key (`theme.colors.text.primary`), never by literal,
 * so another theme (e.g. dark) can be added later without touching components.
 */
export interface Theme {
  /** Semantic color roles. Use these first. */
  colors: Widen<typeof colors>;
  /** Raw palette for cases with no semantic role yet (e.g. badge colors). */
  palette: Widen<typeof palette>;
  space: Widen<typeof space>;
  radius: Widen<typeof radius>;
  stroke: Widen<typeof stroke>;
  typography: Widen<typeof typography>;
  shadows: Widen<typeof shadows>;
  opacity: Widen<typeof opacity>;
  minTouchTarget: number;
}

/** The only theme today: light, as defined in Figma. */
export const lightTheme: Theme = {
  colors,
  palette,
  space,
  radius,
  stroke,
  typography,
  shadows,
  opacity,
  minTouchTarget,
};
