import type { StyleProp, ViewStyle } from 'react-native';

/** One skip reason (an `OptionRow`). */
export interface TodaySkipReason {
  /** Stable reason code, e.g. `'refused_food'`, `'other'`. */
  key: string;
  /** Visible reason text. */
  label: string;
  /** Test identifier of the reason row. */
  testID?: string;
}

/**
 * Body of the skip-task modal (Figma `TodaySkipReasonContent`): title,
 * subtitle, the reasons as `OptionRow`s and an optional "other reason" field.
 *
 * Figma VARIANT `rows` (5 | 6 | 3) is `reasons.length`.
 */
export interface TodaySkipReasonContentProps {
  /** Heading, e.g. "Выберите причину пропуска" (fixed text in Figma). */
  title: string;
  /** Note under the heading. Figma TEXT `subtitle`. */
  subtitle: string;
  /** Reasons in display order. */
  reasons: readonly TodaySkipReason[];
  /** Key of the selected reason; `null`/omitted means none. */
  selectedReasonKey?: string | null;
  /** Called with the reason key when a reason is tapped. */
  onSelectReason: (key: string) => void;
  /** Shows the "other reason" field under the reasons. Figma BOOLEAN `hasOtherReason`. Defaults to `false`. */
  hasOtherReason?: boolean;
  /** Field caption, e.g. "Коротко опишите причину" (fixed text in Figma). Also the input's screen-reader label. */
  reasonLabel?: string;
  /** Text of the "other reason" field (controlled). Figma TEXT `reasonDescription`. Defaults to `''`. */
  reasonDescription?: string;
  /** Called with the new text on every change of the "other reason" field. */
  onReasonDescriptionChange?: (text: string) => void;
  /**
   * Max length of the "other reason" text (app: 130). Also draws the counter
   * `length/max` under the field: Figma TEXT `counter` is derived from it.
   */
  reasonMaxLength?: number;
  /** Hint shown while the field is empty. */
  reasonPlaceholder?: string;
  /** Test identifier of the "other reason" text input. */
  reasonInputTestID?: string;
  /** Outer layout style, applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the container. */
  testID?: string;
}
