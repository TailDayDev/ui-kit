/** Id value as it arrives from the API: number, string or nothing. */
export type IdValue = string | number | null | undefined;
/**
 * Compares ids by their trimmed string form, so `5` equals `'5'` (copied from
 * the app `shared/lib/service/id`). Empty ids never match.
 */
export declare const areNormalizedIdsEqual: (left: IdValue, right: IdValue) => boolean;
//# sourceMappingURL=ids.d.ts.map