import type { ReactNode } from 'react';
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

/** One rule of a rule list (e.g. password rules), shown with a check or a cross. */
export interface InputValidationRule {
  /** Rule text, already translated. Rules with empty text are not shown. */
  text: string;
  /** `true` → green check, `false` → red cross and the field counts as invalid. */
  isCorrect: boolean;
}

/**
 * What a validator returns: `null`/empty string for "valid", a message, or a
 * rule list. Structurally the same as the app's `string | null | ErrorItem[]`.
 */
export type InputValidationResult = string | null | InputValidationRule[];

/**
 * Single-line text field with an inner label, optional left icon, clear
 * control, password toggle, validation messages and a length counter.
 */
export interface InputProps {
  /** Current text (controlled). */
  value: string;
  /** Called with the filtered text on every change and with `''` on clear. */
  setValue: (text: string) => void;
  /** Hint shown while the field is empty. */
  placeholder?: string;
  /** Caption inside the field above the text. Also the screen-reader label. */
  label?: string;
  /**
   * Screen-reader label for the text input. Defaults to `label`.
   * (The app used `testID` here; pass it explicitly if a test relies on that.)
   */
  accessibilityLabel?: string;
  /** Keyboard type. `numeric`/`number-pad` also strip every non-digit. Defaults to `'default'`. */
  keyboardType?: TextInputProps['keyboardType'];
  /** Hides the text (password field). Disables the clear control. */
  secureTextEntry?: boolean;
  /** Shows the eye toggle for a `secureTextEntry` field. */
  showPasswordToggle?: boolean;
  /** Called with the new visibility after the eye toggle is tapped. */
  onTogglePassword?: (isVisible: boolean) => void;
  /** Screen-reader label of the eye toggle while the password is hidden. */
  showPasswordLabel?: string;
  /** Screen-reader label of the eye toggle while the password is visible. */
  hidePasswordLabel?: string;
  /** Screen-reader label of the clear control. */
  clearButtonLabel?: string;
  /** Element drawn at the left edge (already sized and colored). Reserves 52pt of left padding. */
  icon?: ReactNode;
  /** Style of the outer wrapper. Also applied to the bordered field (kept from the app). */
  containerStyle?: StyleProp<ViewStyle>;
  /** Style of the text input. */
  inputStyle?: StyleProp<TextStyle>;
  /** Style of the label. */
  labelStyle?: StyleProp<TextStyle>;
  /** Validator run 500 ms after typing stops and on blur; its result is shown under the field. */
  validate?: (text: string) => InputValidationResult;
  /** Read-only, grayed field. */
  disabled?: boolean;
  /** Focuses the field on mount. */
  autoFocus?: boolean;
  /** Shows `errorText` and the red border. */
  hasError?: boolean;
  /** Error from outside (e.g. the server), shown while `hasError` is true. */
  errorText?: InputValidationResult;
  /** Max text length; also enables the counter. */
  maxLength?: number;
  /** Shows the `length/maxLength` counter when `maxLength` is set. Defaults to `true`. */
  showCounter?: boolean;
  /** Autofill hint (Android/iOS). */
  autoComplete?: TextInputProps['autoComplete'];
  /** iOS autofill content type. */
  textContentType?: TextInputProps['textContentType'];
  /** Auto-capitalization. Defaults to `'none'`. */
  autoCapitalize?: TextInputProps['autoCapitalize'];
  /** Autocorrection. Defaults to `false`. */
  autoCorrect?: boolean;
  /** Spell check. Defaults to the platform behaviour. */
  spellCheck?: boolean;
  /** Test identifier of the text input; the clear control gets `${testID}.clear`. */
  testID?: string;
  /** Native ID of the text input (e.g. for password autofill pairing). */
  nativeID?: string;
  /** Called after the field loses focus (after validation). */
  onBlur?: () => void;
  /** Characters matching this global regex are removed from typed text. Ignored for numeric keyboards. */
  allowedChars?: RegExp;
  /** Shows the clear control while focused with text. Defaults to `true`. Reserves 52pt of right padding. */
  showClearButton?: boolean;
  /** Keeps the clear control visible while focused and empty. */
  isClearButtonVisibleWhenEmpty?: boolean;
  /** Draws the accent border and shadow while focused. Defaults to `true`. */
  showFocusStyle?: boolean;
  /** Renders validation messages under the field. Defaults to `true`. */
  showErrorText?: boolean;
  /** Keeps emoji in typed text. Defaults to `false` (emoji are stripped). */
  allowEmoji?: boolean;
  /** Return key. Defaults to `'done'` on Android and `'default'` on iOS. */
  returnKeyType?: TextInputProps['returnKeyType'];
  /** iOS strong-password rules. */
  passwordRules?: TextInputProps['passwordRules'];
}
