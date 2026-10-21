"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areNormalizedIdsEqual = void 0;
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
const areNormalizedIdsEqual = (left, right) => {
  const leftId = toIdString(left);
  if (!leftId) {
    return false;
  }
  return leftId === toIdString(right);
};
exports.areNormalizedIdsEqual = areNormalizedIdsEqual;
//# sourceMappingURL=areNormalizedIdsEqual.js.map