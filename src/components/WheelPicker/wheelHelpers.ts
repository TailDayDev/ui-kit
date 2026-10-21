import type { WheelPickerDateField } from './WheelPicker.types';

/** App `shared/lib/weightConversion`. */
const LBS_PER_KG = 2.20462;
/** App `shared/lib/formatWeight`: one decimal in weight labels. */
const WEIGHT_DISPLAY_FRACTION_DIGITS = 1;
/** Any date whose day, month and year differ (22.11.2006), to read the order. */
const ORDER_PROBE_DATE = new Date(2006, 10, 22);
const DEFAULT_DATE_FIELD_ORDER: WheelPickerDateField[] = [
  'day',
  'month',
  'year',
];
const MIN_VISIBLE_ITEM_COUNT = 3;

export const lbsToKg = (lbs: number): number => lbs / LBS_PER_KG;

export const kgToLbs = (kg: number): number => kg * LBS_PER_KG;

/** Weight label value: one decimal at most, no "-0". */
export const formatWeightDisplayValue = (weight: number): string => {
  const roundedWeight = Number(weight.toFixed(WEIGHT_DISPLAY_FRACTION_DIGITS));

  return String(Object.is(roundedWeight, -0) ? 0 : roundedWeight);
};

/** Day / month / year order of a numeric date in `locale` (app `getDateFieldOrder`). */
export const getDateFieldOrder = (locale?: string): WheelPickerDateField[] => {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })
      .formatToParts(ORDER_PROBE_DATE)
      .flatMap(part => {
        if (
          part.type === 'day' ||
          part.type === 'month' ||
          part.type === 'year'
        ) {
          return [part.type];
        }
        return [];
      });
  } catch {
    return DEFAULT_DATE_FIELD_ORDER;
  }
};

/** At least 3 rows and always odd, so one row sits in the middle. */
export const getNormalizedVisibleItemCount = (visibleItemCount: number) => {
  const safeVisibleItemCount = Math.max(
    MIN_VISIBLE_ITEM_COUNT,
    visibleItemCount,
  );

  return safeVisibleItemCount % 2 === 0
    ? safeVisibleItemCount + 1
    : safeVisibleItemCount;
};
