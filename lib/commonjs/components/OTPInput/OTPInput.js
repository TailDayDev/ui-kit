"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OTPInput = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../SyncedTextInput/index.js");
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** Active-cell glow pulse from the app `OTPInput`. */
const PULSE_MAX_OPACITY = 0.3;
const PULSE_HALF_PERIOD_MS = 500;
const PULSE_MAX_ELEVATION = 2;
/** Active-cell glow radius (app value; no Figma effect). */
const ACTIVE_SHADOW_RADIUS = 4;
/** Cell height from the app `OTPInput` (off-scale: not in Figma Spacing). */
const CELL_HEIGHT = 69;
/** Default gap between cells (app default, space[4]). */
const DEFAULT_CELL_GAP = 16;
/** Focus is deferred so the screen transition settles first (app value). */
const AUTO_FOCUS_DELAY_MS = 50;
/** The hidden input sits above the cells to receive taps. */
const HIDDEN_INPUT_Z_INDEX = 2;

/**
 * One-time-code field (app `shared/ui/OTPInput`): a transparent input over a
 * row of digit cells. The active cell's glow pulses on the UI thread.
 */
const OTPInput = ({
  length = 6,
  onCodeFilled,
  errorText = null,
  cellGap = DEFAULT_CELL_GAP,
  cellWidth,
  emptyPlaceholder = '',
  autoFocus = true,
  readClipboard = true,
  onRequestClipboardText,
  resetVersion,
  accessibilityLabel
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const cellSizeStyle = (0, _react.useMemo)(() => cellWidth ? {
    flex: 0,
    width: cellWidth
  } : {
    flex: 1
  }, [cellWidth]);
  const cellMarginStyle = (0, _react.useMemo)(() => ({
    marginRight: cellGap
  }), [cellGap]);
  const [code, setCode] = (0, _react.useState)('');
  const [selection, setSelection] = (0, _react.useState)({
    start: 0,
    end: 0
  });
  const [isFocused, setIsFocused] = (0, _react.useState)(false);
  const [showError, setShowError] = (0, _react.useState)(!!errorText);
  const hiddenInputRef = (0, _react.useRef)(null);
  // Read through a ref so an inline function from the app does not re-run the
  // mount effect (focus + clipboard) on every render.
  const requestClipboardTextRef = (0, _react.useRef)(onRequestClipboardText);
  requestClipboardTextRef.current = onRequestClipboardText;

  // The active-cell glow pulses on the UI thread; a typed digit restarts the
  // pulse from zero so the glow moves with the caret.
  const pulse = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _react.useEffect)(() => {
    (0, _reactNativeReanimated.cancelAnimation)(pulse);
    pulse.value = 0;
    if (isFocused) {
      pulse.value = (0, _reactNativeReanimated.withRepeat)((0, _reactNativeReanimated.withSequence)((0, _reactNativeReanimated.withTiming)(PULSE_MAX_OPACITY, {
        duration: PULSE_HALF_PERIOD_MS
      }), (0, _reactNativeReanimated.withTiming)(0, {
        duration: PULSE_HALF_PERIOD_MS
      })), -1);
    }
    return () => {
      (0, _reactNativeReanimated.cancelAnimation)(pulse);
    };
  }, [isFocused, code, pulse]);
  const pulseStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    elevation: pulse.value * PULSE_MAX_ELEVATION,
    shadowOpacity: pulse.value
  }));
  (0, _react.useEffect)(() => {
    setShowError(!!errorText);
  }, [errorText]);
  (0, _react.useEffect)(() => {
    if (resetVersion !== undefined) {
      setCode('');
    }
  }, [resetVersion]);
  (0, _react.useEffect)(() => {
    if (autoFocus) {
      setTimeout(() => hiddenInputRef.current?.focus(), AUTO_FOCUS_DELAY_MS);
    }
    const requestClipboardText = requestClipboardTextRef.current;
    if (!readClipboard || !requestClipboardText) {
      return;
    }
    (async () => {
      const clip = await requestClipboardText();
      if (new RegExp(`^\\d{${length}}$`).test(clip)) {
        setCode(clip);
        onCodeFilled(clip);
      }
    })();
  }, [autoFocus, length, onCodeFilled, readClipboard]);
  (0, _react.useEffect)(() => {
    setSelection({
      start: code.length,
      end: code.length
    });
    onCodeFilled(code);
  }, [code, onCodeFilled]);
  const handleChange = text => {
    setCode(text.replace(/\D/g, '').slice(0, length));
  };
  const handleKeyPress = e => {
    if (e.nativeEvent.key === 'Backspace' && code.length > 0) {
      setCode(prev => prev.slice(0, -1));
    }
  };
  const handleSelectionChange = e => {
    const sel = e.nativeEvent.selection;
    if (sel.start !== code.length || sel.end !== code.length) {
      setSelection({
        start: code.length,
        end: code.length
      });
    }
  };
  const activeIndex = code.length < length ? code.length : length - 1;
  const cells = Array.from({
    length
  }, (_, i) => code[i] || '');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.containerWrapper,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.wrapper,
      children: [cells.map((digit, idx) => {
        const isActive = isFocused && idx === activeIndex;
        const shadowStyle = isActive ? [styles.activeCell, pulseStyle] : null;
        const cellError = showError ? styles.cellError : null;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
          style: [styles.cell, cellSizeStyle, shadowStyle, cellError, idx < length - 1 && cellMarginStyle],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
            variant: "headline/bold",
            style: !digit && emptyPlaceholder ? styles.placeholderCellText : undefined,
            children: digit || emptyPlaceholder
          })
        }, idx);
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.SyncedTextInput, {
        ref: hiddenInputRef,
        value: code,
        onChangeText: handleChange,
        onKeyPress: handleKeyPress,
        keyboardType: "number-pad",
        maxLength: length,
        style: styles.hiddenInput,
        selection: selection,
        onSelectionChange: handleSelectionChange,
        onFocus: () => {
          setIsFocused(true);
          setShowError(false);
        },
        onBlur: () => {
          setIsFocused(false);
          if (errorText) {
            setShowError(true);
          }
        },
        accessibilityLabel: accessibilityLabel,
        contextMenuHidden: false,
        editable: true,
        caretHidden: true
      })]
    }), showError && /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "caption/regular",
      color: "error",
      style: styles.errorText,
      children: errorText
    })]
  });
};
exports.OTPInput = OTPInput;
const createStyles = theme => _reactNative.StyleSheet.create({
  cell: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.palette.lightGray,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    height: CELL_HEIGHT,
    justifyContent: 'center'
  },
  activeCell: {
    borderColor: theme.colors.bg.accent,
    shadowColor: theme.colors.bg.accent,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: ACTIVE_SHADOW_RADIUS
  },
  cellError: {
    borderColor: theme.colors.text.error,
    shadowColor: 'transparent',
    shadowOpacity: 0
  },
  placeholderCellText: {
    color: theme.palette.lightGray
  },
  containerWrapper: {
    width: '100%'
  },
  errorText: {
    alignSelf: 'flex-start',
    marginTop: theme.space[2]
  },
  hiddenInput: {
    backgroundColor: 'transparent',
    bottom: 0,
    color: 'transparent',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: HIDDEN_INPUT_Z_INDEX
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%'
  }
});
//# sourceMappingURL=OTPInput.js.map