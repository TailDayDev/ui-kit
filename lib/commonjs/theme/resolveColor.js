"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveColor = void 0;
/** Resolves a semantic role such as `'text.primary'` to its color value. */
const resolveColor = (theme, role) => {
  const [group, name] = role.split('.');
  const groupColors = theme.colors[group];
  const value = groupColors[name];
  if (value === undefined) {
    throw new Error(`Unknown color role "${role}"`);
  }
  return value;
};
exports.resolveColor = resolveColor;
//# sourceMappingURL=resolveColor.js.map