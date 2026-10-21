"use strict";

import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Text } from "../../primitives/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { SyncedTextInput } from "../SyncedTextInput/index.js";
import { resolveCoveredKeyboardTop } from "./resolveCoveredKeyboardTop.js";

/**
 * Keep at least this much of the field visible when the keyboard overlap is
 * applied, so a stale keyboard frame can never collapse the input to zero height.
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MIN_VISIBLE_INPUT_HEIGHT = 80;
/** Field corner radius from the app `InputMaxHeight` (off-scale: not in Figma Radius). */
const FIELD_RADIUS = 6;
/** Line height of the `medium` (44pt numbers) text from the app `InputMaxHeight`. */
const MEDIUM_LINE_HEIGHT = 53;
/** Delay before `autoFocus` focuses the field, so modal/step transitions finish first. */
const AUTO_FOCUS_DELAY_MS = 300;
/** Field width when not `fullWidth` (app `InputMaxHeight`). */
const FIELD_WIDTH_NARROW = '90%';
/** Input filters for numeric keyboards (app `InputMaxHeight`). */
const NON_DIGIT_REGEX = /[^0-9]/g;
const NON_DECIMAL_REGEX = /[^0-9.,]/g;

/**
 * Big centered text field that fills its parent (app `shared/ui/InputMaxHeight`).
 * While focused, its inner area shrinks so the text stays above the keyboard.
 */
export const InputMaxHeight = ({
  value,
  setValue,
  placeholder,
  accessibilityLabel,
  keyboardType = 'default',
  secureTextEntry = false,
  disabled = false,
  autoFocus = false,
  hasError = false,
  errorText,
  maxLength,
  autoComplete,
  textContentType,
  autoCapitalize = 'none',
  autoCorrect = false,
  onBlur,
  onFocus,
  restRef,
  inputSize = 'small',
  allowedChars,
  unitText,
  fullWidth = false,
  inputTextStyle,
  isMaxLengthVisible,
  maxLengthValue,
  currentLengthValue,
  isFullScreenHeight = false,
  keyboardAccessoryHeight = 0,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const {
    height: screenHeight
  } = useWindowDimensions();
  const internalRef = useRef(null);
  const containerRef = useRef(null);
  const keyboardTopRef = useRef(null);
  const isFocusedRef = useRef(false);
  const [keyboardOverlap, setKeyboardOverlap] = useState(0);
  const inputRef = restRef ?? internalRef;
  const isMedium = inputSize === 'medium';
  const isNumericKeyboard = keyboardType === 'numeric' || keyboardType === 'number-pad' || keyboardType === 'decimal-pad';
  const isSingleLineInput = Boolean(unitText) || isNumericKeyboard;
  const isCounterVisible = isMaxLengthVisible ?? Boolean(maxLength && maxLength > 0);
  const counterMax = maxLengthValue ?? maxLength ?? 0;
  const counterCurrent = Math.max(0, currentLengthValue ?? value?.length ?? 0);
  const updateKeyboardOverlap = useCallback(() => {
    if (!isFocusedRef.current || keyboardTopRef.current === null) {
      setKeyboardOverlap(0);
      return;
    }
    containerRef.current?.measureInWindow((_x, y, _width, height) => {
      const keyboardTop = keyboardTopRef.current;
      setKeyboardOverlap(!isFocusedRef.current || keyboardTop === null ? 0 : Math.min(Math.max(0, height - MIN_VISIBLE_INPUT_HEIGHT), Math.max(0, y + height - keyboardTop)));
    });
  }, []);
  useEffect(() => {
    // Keyboard.metrics() can stay stale after a missed hide event (step change
    // inside a wizard modal); trust it only while the keyboard is visible.
    const initialKeyboardTop = Keyboard.isVisible() ? Keyboard.metrics()?.screenY : undefined;
    keyboardTopRef.current = initialKeyboardTop == null ? null : resolveCoveredKeyboardTop(initialKeyboardTop, keyboardAccessoryHeight);
    const onShow = event => {
      keyboardTopRef.current = resolveCoveredKeyboardTop(event.endCoordinates.screenY, keyboardAccessoryHeight);
      updateKeyboardOverlap();
    };
    const onHide = () => {
      keyboardTopRef.current = null;
      setKeyboardOverlap(0);
    };
    const isIOS = Platform.OS === 'ios';
    const show = Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow', onShow);
    const frame = isIOS ? Keyboard.addListener('keyboardWillChangeFrame', onShow) : undefined;
    const settled = isIOS ? Keyboard.addListener('keyboardDidShow', onShow) : undefined;
    const hide = Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide', onHide);
    updateKeyboardOverlap();
    return () => {
      keyboardTopRef.current = null;
      show.remove();
      frame?.remove();
      settled?.remove();
      hide.remove();
    };
  }, [updateKeyboardOverlap, keyboardAccessoryHeight]);
  useEffect(() => {
    if (!autoFocus || !inputRef.current) {
      return undefined;
    }
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, AUTO_FOCUS_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [autoFocus, inputRef]);
  const handleBlur = useCallback(() => {
    if (!isFocusedRef.current) {
      return;
    }
    isFocusedRef.current = false;
    setKeyboardOverlap(0);
    onBlur?.();
  }, [onBlur]);
  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (isFocusedRef.current) {
        inputRef.current?.blur();
        handleBlur();
      }
    });
    return () => keyboardHideListener.remove();
  }, [handleBlur, inputRef]);
  const handlePressIn = () => {
    if (disabled) {
      return;
    }
    inputRef.current?.focus();
  };
  const handleInputFocus = () => {
    isFocusedRef.current = true;
    updateKeyboardOverlap();
    onFocus?.();
  };
  const handleChange = text => {
    let filteredText = text;
    if (keyboardType === 'number-pad') {
      filteredText = text.replace(NON_DIGIT_REGEX, '');
    } else if (keyboardType === 'numeric') {
      filteredText = text.replace(NON_DECIMAL_REGEX, '');
    } else if (allowedChars) {
      filteredText = text.replace(allowedChars, '');
    }
    setValue(filteredText);
  };
  return /*#__PURE__*/_jsx(Pressable, {
    ref: containerRef
    // The text input inside is the screen-reader stop.
    ,
    accessible: false,
    onLayout: updateKeyboardOverlap,
    onPressIn: handlePressIn,
    style: [styles.root, {
      minHeight: isFullScreenHeight ? screenHeight : undefined
    }],
    children: /*#__PURE__*/_jsxs(View, {
      style: [styles.viewport, {
        marginBottom: keyboardOverlap
      }],
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.row,
        children: /*#__PURE__*/_jsx(View, {
          style: [styles.container, {
            width: fullWidth ? '100%' : FIELD_WIDTH_NARROW
          }],
          children: /*#__PURE__*/_jsxs(View, {
            style: styles.inputRow,
            children: [/*#__PURE__*/_jsx(SyncedTextInput, {
              ref: inputRef,
              testID: testID,
              style: [styles.input, isMedium ? styles.mediumText : styles.smallText,
              // `small` has no line height in the app (native default).
              {
                lineHeight: isMedium ? MEDIUM_LINE_HEIGHT : undefined
              }, inputTextStyle, styles.centered],
              placeholder: placeholder,
              placeholderTextColor: theme.palette.lightGray,
              value: value,
              autoComplete: autoComplete,
              editable: !disabled,
              onChangeText: handleChange,
              underlineColorAndroid: "transparent",
              keyboardType: keyboardType,
              autoCapitalize: autoCapitalize,
              textContentType: textContentType,
              onBlur: handleBlur,
              onFocus: handleInputFocus,
              autoFocus: autoFocus,
              spellCheck: autoCorrect,
              maxLength: maxLength,
              secureTextEntry: secureTextEntry,
              autoCorrect: autoCorrect,
              multiline: !isSingleLineInput,
              scrollEnabled: !isSingleLineInput,
              numberOfLines: isSingleLineInput ? 1 : undefined,
              lineBreakStrategyIOS: isSingleLineInput ? undefined : 'standard',
              textBreakStrategy: isSingleLineInput ? undefined : 'highQuality',
              returnKeyType: "default",
              submitBehavior: "blurAndSubmit",
              accessibilityLabel: accessibilityLabel,
              accessibilityHint: hasError && errorText ? errorText : undefined,
              accessibilityState: {
                disabled
              }
            }), unitText ? /*#__PURE__*/_jsx(Text, {
              variant: isMedium ? 'numbers/bold' : 'title/medium',
              style: styles.unitText,
              children: unitText
            }) : null]
          })
        })
      }), isCounterVisible && counterMax > 0 ? /*#__PURE__*/_jsxs(Text, {
        variant: "caption/medium",
        color: "secondary",
        style: styles.counter,
        children: [counterCurrent, "/", counterMax]
      }) : null]
    })
  });
};
const createStyles = theme => StyleSheet.create({
  root: {
    flex: 1
  },
  viewport: {
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
    width: '100%'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  container: {
    alignSelf: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderRadius: FIELD_RADIUS,
    flex: 1,
    maxWidth: '100%',
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[3]
  },
  counter: {
    marginBottom: theme.space[4],
    textAlign: 'center',
    width: '100%'
  },
  inputRow: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  input: {
    color: theme.colors.text.primary,
    flex: 1,
    flexBasis: 0,
    flexShrink: 1,
    includeFontPadding: false,
    padding: 0
  },
  smallText: theme.typography.title.medium,
  mediumText: theme.typography.numbers.bold,
  centered: {
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  unitText: {
    marginLeft: theme.space[2]
  }
});
//# sourceMappingURL=InputMaxHeight.js.map