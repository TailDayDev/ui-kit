"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lightTheme = void 0;
var _index = require("../tokens/index.js");
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
const lightTheme = exports.lightTheme = {
  colors: _index.colors,
  palette: _index.palette,
  space: _index.space,
  radius: _index.radius,
  stroke: _index.stroke,
  typography: _index.typography,
  shadows: _index.shadows,
  opacity: _index.opacity,
  minTouchTarget: _index.minTouchTarget
};
//# sourceMappingURL=theme.js.map