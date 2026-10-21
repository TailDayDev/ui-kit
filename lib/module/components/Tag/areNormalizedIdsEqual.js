"use strict";

const toIdString = value => {
  if (value === null || value === undefined) {
    return null;
  }
  const normalized = String(value).trim();
  return normalized.length ? normalized : null;
};

/**
 * True when both ids are present and equal after trimming and string
 * conversion (`1` equals `'1'`). Copied from the app `shared/lib/service/id`.
 */
export const areNormalizedIdsEqual = (left, right) => {
  const leftId = toIdString(left);
  if (!leftId) {
    return false;
  }
  return leftId === toIdString(right);
};
//# sourceMappingURL=areNormalizedIdsEqual.js.map