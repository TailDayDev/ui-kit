"use strict";

import { colors, minTouchTarget, opacity, palette, radius, shadows, space, stroke, typography } from "../tokens/index.js";

/**
 * Keeps the token keys but widens the literal values, so a custom theme can
 * supply different values. Font enums stay narrow because React Native needs them.
 */

/** One text style: what `typography.<group>.<weight>` holds. */

/**
 * The full set of design values a component may read.
 * Components reference values by key (`theme.colors.text.primary`), never by literal,
 * so another theme (e.g. dark) can be added later without touching components.
 */

/** The only theme today: light, as defined in Figma. */
export const lightTheme = {
  colors,
  palette,
  space,
  radius,
  stroke,
  typography,
  shadows,
  opacity,
  minTouchTarget
};
//# sourceMappingURL=theme.js.map