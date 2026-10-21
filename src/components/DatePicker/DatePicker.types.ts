/** Titled date wheel (day / month / year). */
export interface DatePickerProps {
  /** Selected date as an ISO string. Defaults to today (clamped to the range). */
  value?: string;
  /** Called with the picked date as a UTC-midnight ISO string. */
  onChange: (newDateIso: string) => void;
  /**
   * Month names, January first (12 entries, already translated). New: the
   * app filled them from `translate('month_*')` inside the wheel.
   */
  monthLabels: readonly string[];
  /** Locale that decides the column order (the app's `currentLanguage`). Defaults to the device locale. */
  locale?: string;
  /** Title above the wheel. */
  label?: string;
  /** Secondary text under the title. */
  description?: string;
  /** Reports the initial date through `onChange` on mount. Defaults to `true`. */
  autoInitialize?: boolean;
  /** Earliest date (ISO). */
  minDateIso?: string;
  /** Latest date (ISO). Defaults to today. */
  maxDateIso?: string;
  /** Test identifier of the wheel. */
  testID?: string;
}
