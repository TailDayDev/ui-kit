import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type TextInput,
} from 'react-native';

import { CheckIcon } from '../../icons/CheckIcon';
import { CloseIcon } from '../../icons/CloseIcon';
import { EyeIcon } from '../../icons/EyeIcon';
import { EyeWithSlashIcon } from '../../icons/EyeWithSlashIcon';
import { Icon, Text } from '../../primitives';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { InputClearButton } from '../InputClearButton';
import type { InputProps, InputValidationResult } from './Input.types';
import { SyncedTextInput } from '../SyncedTextInput';

/** Field height from the app `Input` (off-scale: not in Figma Spacing). */
const FIELD_HEIGHT = 62;
/** Field side padding and control padding from the app `Input` (off-scale). */
const FIELD_PADDING_X = 14;
/** Left inset of rule rows from the app `Input` (off-scale). */
const RULE_INSET = 3;
/** Rule check/cross glyph size from the app `Input`. */
const RULE_ICON_SIZE = 16;
/** Validation runs this long after typing stops (app `Input`). */
const VALIDATION_DEBOUNCE_MS = 500;
/**
 * Focused-field shadow from the app `Input`/`Textarea` (accent, offset 0/4,
 * 15 %, radius 8, Android elevation 8). Figma `shadow/focus` (0 0 8 #7962FF33)
 * differs in offset and opacity, so the app look is kept here.
 */
const FOCUS_SHADOW_OFFSET = { width: 0, height: 4 };
const FOCUS_SHADOW_OPACITY = 0.15;
const FOCUS_SHADOW_RADIUS = 8;
const FOCUS_ELEVATION = 8;

const EMOJI_REGEX =
  /[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
// Alternation, not a character class: these are lone combining marks.
const EMOJI_JOINERS_REGEX = /\u200D|\uFE0F|\u20E3/g;
const NON_DIGIT_REGEX = /[^0-9]/g;

const removeEmoji = (text: string) =>
  text.replace(EMOJI_REGEX, '').replace(EMOJI_JOINERS_REGEX, '');

const normalizeValidationResult = (
  result: InputValidationResult,
): InputValidationResult => (result == null || result === '' ? null : result);

/** Text a screen reader announces for the current validation result. */
const describeValidationError = (
  result: InputValidationResult,
): string | undefined => {
  if (typeof result === 'string') {
    return result.trim() || undefined;
  }
  if (Array.isArray(result)) {
    const failed = result
      .filter(rule => !rule.isCorrect && rule.text?.trim())
      .map(rule => rule.text);
    return failed.length > 0 ? failed.join('. ') : undefined;
  }
  return undefined;
};

/**
 * Single-line text field (app `shared/ui/Input`). Label sits inside the
 * bordered field; validation messages and the counter render under it.
 */
export const Input = ({
  value,
  setValue,
  placeholder,
  label,
  accessibilityLabel,
  keyboardType = 'default',
  secureTextEntry = false,
  showPasswordToggle = false,
  onTogglePassword,
  showPasswordLabel,
  hidePasswordLabel,
  clearButtonLabel,
  containerStyle,
  inputStyle,
  labelStyle,
  validate,
  disabled = false,
  autoFocus = false,
  hasError = false,
  errorText,
  maxLength,
  showCounter = true,
  autoComplete,
  textContentType,
  autoCapitalize = 'none',
  autoCorrect = false,
  spellCheck,
  testID,
  nativeID,
  onBlur,
  icon,
  allowedChars,
  showClearButton = true,
  isClearButtonVisibleWhenEmpty = false,
  showFocusStyle = true,
  showErrorText = true,
  allowEmoji = false,
  returnKeyType,
  passwordRules,
}: InputProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const inputRef = useRef<TextInput>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [validationResult, setValidationResult] =
    useState<InputValidationResult>(errorText ?? null);

  const hasRuleArray = Array.isArray(validationResult);
  const hasRuleErrors =
    hasRuleArray &&
    validationResult.some(
      rule => rule.isCorrect === false && Boolean(rule.text?.trim()),
    );
  const isEveryRuleValid =
    hasRuleArray &&
    validationResult.length > 0 &&
    validationResult.every(rule => rule.isCorrect === true);
  const hasStringError =
    typeof validationResult === 'string' && Boolean(validationResult.trim());
  const hasInternalValidationError = hasStringError || hasRuleErrors;
  const hasExternalError = Boolean(hasError && errorText);
  const hasValidationError = hasExternalError
    ? true
    : validate
      ? hasInternalValidationError
      : false;
  const shouldShowValidationMessages =
    typeof validationResult === 'string'
      ? Boolean(validationResult)
      : hasRuleArray;
  const shouldShowClearControl =
    showClearButton &&
    isFocused &&
    !secureTextEntry &&
    !disabled &&
    (value?.length > 0 || isClearButtonVisibleWhenEmpty);
  const shouldShowPasswordControl = secureTextEntry && showPasswordToggle;
  const shouldReserveRightSpace = showClearButton || shouldShowPasswordControl;
  const isCounterVisible = Boolean(maxLength) && showCounter;
  const shouldRenderValidationArea =
    isCounterVisible || (showErrorText && shouldShowValidationMessages);
  const errorDescription = hasValidationError
    ? describeValidationError(validationResult)
    : undefined;

  useEffect(
    () => () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (hasError && errorText && errorText.length > 0) {
      setValidationResult(errorText);
      return;
    }
    setValidationResult(null);
  }, [hasError, errorText]);

  const handleTogglePassword = () => {
    const next = !isPasswordVisible;
    setIsPasswordVisible(next);
    onTogglePassword?.(next);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (validate) {
      setValidationResult(normalizeValidationResult(validate(value)));
    }
    onBlur?.();
  };

  const handleFocus = () => {
    if (disabled) {
      return;
    }
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleChange = (text: string) => {
    let filteredText = allowEmoji ? text : removeEmoji(text);

    if (keyboardType === 'numeric' || keyboardType === 'number-pad') {
      filteredText = filteredText.replace(NON_DIGIT_REGEX, '');
    } else if (allowedChars) {
      filteredText = filteredText.replace(allowedChars, '');
    }

    setValue(filteredText);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (validate) {
        setValidationResult(normalizeValidationResult(validate(filteredText)));
      }
    }, VALIDATION_DEBOUNCE_MS);
  };

  const clearValue = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setValue('');
  };

  const renderValidationMessages = () => {
    if (!showErrorText) {
      return null;
    }
    if (Array.isArray(validationResult)) {
      return validationResult
        .filter(rule => Boolean(rule.text?.trim()))
        .map((rule, index) => (
          <View style={styles.ruleRow} key={`${index}-${rule.text}`}>
            <Icon
              icon={rule.isCorrect ? CheckIcon : CloseIcon}
              size={RULE_ICON_SIZE}
              color={rule.isCorrect ? 'text.success' : 'text.error'}
            />
            <Text
              variant="smallCaption/medium"
              color={rule.isCorrect ? 'success' : 'error'}
            >
              {rule.text}
            </Text>
          </View>
        ));
    }
    if (typeof validationResult === 'string' && validationResult) {
      return (
        <Text
          variant="caption/regular"
          color="error"
          accessibilityLiveRegion="polite"
        >
          {validationResult}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={containerStyle}>
      <Pressable
        // The field itself is not a screen-reader stop; the text input inside is.
        accessible={false}
        style={[
          styles.container,
          {
            paddingLeft: icon ? theme.space[13] : FIELD_PADDING_X,
            paddingRight: shouldReserveRightSpace
              ? theme.space[13]
              : FIELD_PADDING_X,
          },
          containerStyle,
          showFocusStyle && isFocused && styles.focusedContainer,
          disabled && styles.disabledContainer,
          !disabled && hasValidationError ? styles.errorContainer : undefined,
          !disabled && !hasValidationError && isEveryRuleValid
            ? styles.successContainer
            : undefined,
        ]}
        onPress={handleFocus}
      >
        {label ? (
          <Text
            variant="caption/regular"
            // Announced through the text input's accessibilityLabel.
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={[styles.label, labelStyle, disabled && styles.disabledLabel]}
          >
            {label}
          </Text>
        ) : null}

        <SyncedTextInput
          ref={inputRef}
          style={[styles.input, inputStyle, disabled && styles.disabledInput]}
          placeholder={placeholder}
          placeholderTextColor={theme.palette.lightGray}
          value={value}
          autoComplete={autoComplete}
          editable={!disabled}
          onChangeText={handleChange}
          onPressIn={handleFocus}
          keyboardType={
            Platform.OS === 'ios' && secureTextEntry ? 'default' : keyboardType
          }
          autoCapitalize={autoCapitalize}
          textContentType={textContentType}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          autoFocus={autoFocus}
          maxLength={maxLength}
          secureTextEntry={!isPasswordVisible && secureTextEntry}
          passwordRules={passwordRules}
          autoCorrect={autoCorrect}
          spellCheck={spellCheck}
          returnKeyType={
            returnKeyType ?? (Platform.OS === 'android' ? 'done' : 'default')
          }
          submitBehavior="blurAndSubmit"
          onSubmitEditing={() => Keyboard.dismiss()}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityHint={errorDescription}
          accessibilityState={{ disabled }}
          nativeID={nativeID}
          testID={testID}
        />
        {icon ? <View style={styles.iconLeft}>{icon}</View> : null}

        {shouldShowPasswordControl ? (
          <Pressable
            onPress={handleTogglePassword}
            style={styles.iconRight}
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordVisible ? hidePasswordLabel : showPasswordLabel
            }
          >
            <Icon icon={isPasswordVisible ? EyeWithSlashIcon : EyeIcon} />
          </Pressable>
        ) : null}

        {shouldShowClearControl ? (
          <InputClearButton
            onClear={clearValue}
            inputRef={inputRef}
            style={styles.iconRight}
            testID={testID ? `${testID}.clear` : undefined}
            accessibilityLabel={clearButtonLabel}
          />
        ) : null}
      </Pressable>
      {shouldRenderValidationArea ? (
        <View style={styles.validationArea}>
          {renderValidationMessages()}
          {isCounterVisible ? (
            <Text variant="caption/regular" color="secondary">
              {value?.length}/{maxLength}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.palette.lightGray,
      borderRadius: theme.radius.sm,
      borderWidth: theme.stroke[1],
      height: FIELD_HEIGHT,
      justifyContent: 'center',
      paddingVertical: theme.space[2.5],
      position: 'relative',
      width: '100%',
    },
    disabledContainer: {
      backgroundColor: theme.colors.bg.subtle,
    },
    disabledInput: {
      color: theme.colors.text.secondary,
    },
    disabledLabel: {
      color: theme.palette.lightGray,
    },
    errorContainer: {
      borderColor: theme.colors.text.error,
      shadowColor: 'transparent',
    },
    successContainer: {
      borderColor: theme.colors.text.success,
      shadowColor: 'transparent',
    },
    focusedContainer: {
      borderColor: theme.colors.bg.accent,
      elevation: FOCUS_ELEVATION,
      shadowColor: theme.colors.bg.accent,
      shadowOffset: FOCUS_SHADOW_OFFSET,
      shadowOpacity: FOCUS_SHADOW_OPACITY,
      shadowRadius: FOCUS_SHADOW_RADIUS,
    },
    iconRight: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      paddingHorizontal: FIELD_PADDING_X,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    iconLeft: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      left: 0,
      paddingHorizontal: theme.space[4],
      position: 'absolute',
      top: 0,
    },
    input: {
      ...theme.typography.headline.regular,
      borderWidth: 0,
      color: theme.colors.text.primary,
      paddingHorizontal: 0,
      paddingVertical: 0,
      textAlignVertical: 'center',
      width: '100%',
    },
    ruleRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[1],
      marginLeft: RULE_INSET,
    },
    label: {
      marginBottom: theme.space[1],
    },
    validationArea: {
      gap: theme.space[1],
      paddingTop: theme.space[1],
    },
  });
