"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areNormalizedIdsEqual = void 0;
/** Id value as it arrives from the API: number, string or nothing. */

const toIdString = value => {
  if (value === null || value === undefined) {
    return null;
  }
  const normalized = String(value).trim();
  return normalized.length ? normalized : null;
};

/**
 * Compares ids by their trimmed string form, so `5` equals `'5'` (copied from
 * the app `shared/lib/service/id`). Empty ids never match.
 */
const areNormalizedIdsEqual = (left, right) => {
  const leftId = toIdString(left);
  if (!leftId) {
    return false;
  }
  return leftId === toIdString(right);
};
exports.areNormalizedIdsEqual = areNormalizedIdsEqual;
//# sourceMappingURL=ids.js.map