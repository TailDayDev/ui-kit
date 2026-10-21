"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.opacity = exports.minTouchTarget = void 0;
/**
 * Interaction values that Figma does not store as variables yet.
 * Each one is taken from a Figma component state so it is not a free-floating number.
 */
const opacity = exports.opacity = {
  /** Pressed feedback on tappable surfaces (Button in the shipped app). */
  pressed: 0.85,
  /** Disabled controls (Figma `Fab` disabled=true). */
  disabled: 0.45
};

/** Minimum touch target from the platform guidelines (iOS HIG 44pt, Material 48dp). */
const minTouchTarget = exports.minTouchTarget = 44;
//# sourceMappingURL=static.js.map