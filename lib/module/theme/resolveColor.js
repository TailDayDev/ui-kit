"use strict";

/** Resolves a semantic role such as `'text.primary'` to its color value. */
export const resolveColor = (theme, role) => {
  const [group, name] = role.split('.');
  const groupColors = theme.colors[group];
  const value = groupColors[name];
  if (value === undefined) {
    throw new Error(`Unknown color role "${role}"`);
  }
  return value;
};
//# sourceMappingURL=resolveColor.js.map