"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputMaxHeight = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../SyncedTextInput/index.js");
var _resolveCoveredKeyboardTop = require("./resolveCoveredKeyboardTop.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Keep at least this much of the field visible when the keyboard overlap is
 * applied, so a stale keyboard frame can never collapse the input to zero height.
 */const MIN_VISIBLE_INPUT_HEIGHT = 80;
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
const InputMaxHeight = ({
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
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const {
    height: screenHeight
  } = (0, _reactNative.useWindowDimensions)();
  const internalRef = (0, _react.useRef)(null);
  const containerRef = (0, _react.useRef)(null);
  const keyboardTopRef = (0, _react.useRef)(null);
  const isFocusedRef = (0, _react.useRef)(false);
  const [keyboardOverlap, setKeyboardOverlap] = (0, _react.useState)(0);
  const inputRef = restRef ?? internalRef;
  const isMedium = inputSize === 'medium';
  const isNumericKeyboard = keyboardType === 'numeric' || keyboardType === 'number-pad' || keyboardType === 'decimal-pad';
  const isSingleLineInput = Boolean(unitText) || isNumericKeyboard;
  const isCounterVisible = isMaxLengthVisible ?? Boolean(maxLength && maxLength > 0);
  const counterMax = maxLengthValue ?? maxLength ?? 0;
  const counterCurrent = Math.max(0, currentLengthValue ?? value?.length ?? 0);
  const updateKeyboardOverlap = (0, _react.useCallback)(() => {
    if (!isFocusedRef.current || keyboardTopRef.current === null) {
      setKeyboardOverlap(0);
      return;
    }
    containerRef.current?.measureInWindow((_x, y, _width, height) => {
      const keyboardTop = keyboardTopRef.current;
      setKeyboardOverlap(!isFocusedRef.current || keyboardTop === null ? 0 : Math.min(Math.max(0, height - MIN_VISIBLE_INPUT_HEIGHT), Math.max(0, y + height - keyboardTop)));
    });
  }, []);
  (0, _react.useEffect)(() => {
    // Keyboard.metrics() can stay stale after a missed hide event (step change
    // inside a wizard modal); trust it only while the keyboard is visible.
    const initialKeyboardTop = _reactNative.Keyboard.isVisible() ? _reactNative.Keyboard.metrics()?.screenY : undefined;
    keyboardTopRef.current = initialKeyboardTop == null ? null : (0, _resolveCoveredKeyboardTop.resolveCoveredKeyboardTop)(initialKeyboardTop, keyboardAccessoryHeight);
    const onShow = event => {
      keyboardTopRef.current = (0, _resolveCoveredKeyboardTop.resolveCoveredKeyboardTop)(event.endCoordinates.screenY, keyboardAccessoryHeight);
      updateKeyboardOverlap();
    };
    const onHide = () => {
      keyboardTopRef.current = null;
      setKeyboardOverlap(0);
    };
    const isIOS = _reactNative.Platform.OS === 'ios';
    const show = _reactNative.Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow', onShow);
    const frame = isIOS ? _reactNative.Keyboard.addListener('keyboardWillChangeFrame', onShow) : undefined;
    const settled = isIOS ? _reactNative.Keyboard.addListener('keyboardDidShow', onShow) : undefined;
    const hide = _reactNative.Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide', onHide);
    updateKeyboardOverlap();
    return () => {
      keyboardTopRef.current = null;
      show.remove();
      frame?.remove();
      settled?.remove();
      hide.remove();
    };
  }, [updateKeyboardOverlap, keyboardAccessoryHeight]);
  (0, _react.useEffect)(() => {
    if (!autoFocus || !inputRef.current) {
      return undefined;
    }
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, AUTO_FOCUS_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [autoFocus, inputRef]);
  const handleBlur = (0, _react.useCallback)(() => {
    if (!isFocusedRef.current) {
      return;
    }
    isFocusedRef.current = false;
    setKeyboardOverlap(0);
    onBlur?.();
  }, [onBlur]);
  (0, _react.useEffect)(() => {
    const keyboardHideListener = _reactNative.Keyboard.addListener('keyboardDidHide', () => {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    ref: containerRef
    // The text input inside is the screen-reader stop.
    ,
    accessible: false,
    onLayout: updateKeyboardOverlap,
    onPressIn: handlePressIn,
    style: [styles.root, {
      minHeight: isFullScreenHeight ? screenHeight : undefined
    }],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.viewport, {
        marginBottom: keyboardOverlap
      }],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.row,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: [styles.container, {
            width: fullWidth ? '100%' : FIELD_WIDTH_NARROW
          }],
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: styles.inputRow,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.SyncedTextInput, {
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
            }), unitText ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
              variant: isMedium ? 'numbers/bold' : 'title/medium',
              style: styles.unitText,
              children: unitText
            }) : null]
          })
        })
      }), isCounterVisible && counterMax > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Text, {
        variant: "caption/medium",
        color: "secondary",
        style: styles.counter,
        children: [counterCurrent, "/", counterMax]
      }) : null]
    })
  });
};
exports.InputMaxHeight = InputMaxHeight;
const createStyles = theme => _reactNative.StyleSheet.create({
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