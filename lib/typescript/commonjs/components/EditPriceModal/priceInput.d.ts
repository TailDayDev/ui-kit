/** Float tolerance for the max check (0.01 = one cent). */
export declare const PRICE_MAX_TOLERANCE = 0.01;
/** Parses a typed amount (`.` or `,` separator); invalid input is 0. */
export declare const parseStringToNumber: (value: string) => number;
/**
 * Accepts the typed amount only when it keeps the input valid (digits limit,
 * one separator, at most `max` major units); otherwise the draft stays.
 * Same rules as the app's `handleVerifyPrice`.
 */
export declare const verifyPriceInput: (raw: string, current: string, setPrice: (value: string) => void, max?: number) => void;
//# sourceMappingURL=priceInput.d.ts.map