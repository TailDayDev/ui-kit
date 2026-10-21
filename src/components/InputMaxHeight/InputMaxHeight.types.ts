import type { RefObject } from 'react';
import type {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
} from 'react-native';

/**
 * Big centered text field that fills its parent's height (wizard steps:
 * names, descriptions, amounts). Shrinks its inner area so the focused field
 * stays above the keyboard.
 */
export interface InputMaxHeightProps {
  /** Current text (controlled). */
  value: string;
  /** Called with the filtered text on every change. */
  setValue: (text: string) => void;
  /** Hint shown while the field is empty. */
  placeholder?: string;
  /** Screen-reader label of the text input. Without it, platforms read the placeholder. */
  accessibilityLabel?: string;
  /**
   * Keyboard type. Defaults to `'default'`. Numeric keyboards make the field
   * single-line; `number-pad` keeps digits, `numeric` keeps digits, `.` and `,`.
   */
  keyboardType?: TextInputProps['keyboardType'];
  /** Hides the text. */
  secureTextEntry?: boolean;
  /** Read-only field; taps do not focus it. */
  disabled?: boolean;
  /** Focuses the field 300 ms after mount (after modal/step transitions). */
  autoFocus?: boolean;
  /**
   * Marks the value as invalid. The field draws no error itself (same as the
   * app); `errorText` is announced to screen readers while this is true.
   */
  hasError?: boolean;
  /** Error announced to screen readers while `hasError` is true. */
  errorText?: string | null;
  /** Max text length; also shows the counter unless `isMaxLengthVisible` is false. */
  maxLength?: number;
  /** Autofill hint (Android/iOS). */
  autoComplete?: TextInputProps['autoComplete'];
  /** iOS autofill content type. */
  textContentType?: TextInputProps['textContentType'];
  /** Auto-capitalization. Defaults to `'none'`. */
  autoCapitalize?: TextInputProps['autoCapitalize'];
  /** Autocorrection and spell check (also hides the iOS QuickType bar when false). Defaults to `false`. */
  autoCorrect?: boolean;
  /** Called once when the focused field loses focus or the keyboard hides. */
  onBlur?: () => void;
  /** Called when the native input gains focus. */
  onFocus?: () => void;
  /** External ref to the text input; used instead of the internal one. */
  restRef?: RefObject<TextInput | null>;
  /** `'small'`: title/medium text. `'medium'`: numbers/bold (44pt) amounts. Defaults to `'small'`. */
  inputSize?: 'small' | 'medium';
  /** Unit after the value (e.g. currency); makes the field single-line. */
  unitText?: string;
  /** Characters matching this global regex are removed. Ignored for numeric keyboards. */
  allowedChars?: RegExp;
  /** Field width 100 % instead of 90 %. Defaults to `false`. */
  fullWidth?: boolean;
  /** Extra style of the text input. */
  inputTextStyle?: StyleProp<TextStyle>;
  /** Forces the counter on/off. Defaults to "on when `maxLength` > 0". */
  isMaxLengthVisible?: boolean;
  /** Counter maximum. Defaults to `maxLength`. */
  maxLengthValue?: number;
  /** Counter current value. Defaults to `value.length`. */
  currentLengthValue?: number;
  /** Makes the field at least as tall as the window. */
  isFullScreenHeight?: boolean;
  /**
   * Height of a view the app draws on top of the keyboard that keyboard
   * events do not report (e.g. a "Done" bar). The field keeps clear of it.
   * Defaults to 0. The TailDay app passes its `KEYBOARD_DONE_TOOLBAR_UNREPORTED_HEIGHT` (43).
   */
  keyboardAccessoryHeight?: number;
  /** Test identifier of the text input. */
  testID?: string;
}
