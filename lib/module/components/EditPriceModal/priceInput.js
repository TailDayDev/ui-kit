"use strict";

/** Integer digits allowed in the amount input. */
const MAX_PRICE_INTEGER_DIGITS = 10;
/** Fraction digits allowed in the amount input. */
const MAX_PRICE_FRACTION_DIGITS = 2;
/** Float tolerance for the max check (0.01 = one cent). */
export const PRICE_MAX_TOLERANCE = 0.01;
const PRICE_INPUT_PATTERN = new RegExp(`^(\\d{0,${MAX_PRICE_INTEGER_DIGITS}})([.,]\\d{0,${MAX_PRICE_FRACTION_DIGITS}})?$`);

/** Parses a typed amount (`.` or `,` separator); invalid input is 0. */
export const parseStringToNumber = value => {
  const parsed = parseFloat(value.replace(',', '.'));
  return !isNaN(parsed) ? parsed : 0;
};

/**
 * Accepts the typed amount only when it keeps the input valid (digits limit,
 * one separator, at most `max` major units); otherwise the draft stays.
 * Same rules as the app's `handleVerifyPrice`.
 */
export const verifyPriceInput = (raw, current, setPrice, max) => {
  const cleaned = raw.replace(/[^0-9.,]/g, '');
  if (current === '0' && cleaned !== '') {
    setPrice(cleaned);
    return;
  }
  if (cleaned === '' || PRICE_INPUT_PATTERN.test(cleaned)) {
    if (typeof max === 'number' && Number.isFinite(max) && cleaned !== '' && !cleaned.endsWith('.') && !cleaned.endsWith(',')) {
      const parsed = parseStringToNumber(cleaned);
      if (parsed > max + PRICE_MAX_TOLERANCE) {
        return;
      }
    }
    setPrice(cleaned);
  }
};
//# sourceMappingURL=priceInput.js.map