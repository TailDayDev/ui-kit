/** Id value as it arrives from the API: number, string or nothing. */
export type IdValue = string | number | null | undefined;

const toIdString = (value: IdValue): string | null => {
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
export const areNormalizedIdsEqual = (
  left: IdValue,
  right: IdValue,
): boolean => {
  const leftId = toIdString(left);
  if (!leftId) {
    return false;
  }
  return leftId === toIdString(right);
};
