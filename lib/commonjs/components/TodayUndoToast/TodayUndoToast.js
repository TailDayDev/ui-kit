"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayUndoToast = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Text/index.js");
var _index4 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// Figma TodayUndoToast: height 36 (FIXED, off the spacing scale).
const TOAST_HEIGHT = 36;
// Figma TodayUndoToast › undo-2: 20×20.
const TOAST_ICON_SIZE = 20;
// App TodayUndoToast: extra vertical touch area.
const TOAST_HIT_SLOP = {
  bottom: 4,
  top: 4
};
// App TodayUndoToast: starts/ends one toast height + 16pt below its place.
const TOAST_OFFSCREEN_GAP = 16;
const TOAST_OFFSCREEN_TRANSLATE_Y = TOAST_HEIGHT + TOAST_OFFSCREEN_GAP;
// App TodayUndoToast: 1s cubic enter and exit.
const TOAST_ANIMATION_DURATION_MS = 1000;
const IDLE_OPACITY = 1;
const HIDDEN_OPACITY = 0;
const createStyles = theme => _reactNative.StyleSheet.create({
  pill: {
    alignItems: 'center',
    // Figma: the pill HUGs its content; centered like the app positioner.
    alignSelf: 'center',
    backgroundColor: theme.colors.overlay.scrim,
    borderRadius: theme.radius.full,
    flexDirection: 'row',
    gap: theme.space[2],
    height: TOAST_HEIGHT,
    overflow: 'hidden',
    paddingBottom: theme.space[2],
    paddingLeft: theme.space[6],
    paddingRight: theme.space[3],
    paddingTop: theme.space[2]
  }
});

/**
 * «Отменить» pill at the bottom of the Today screen after a task is marked
 * done (Figma `TodayUndoToast`): translucent dark fill, white label and
 * undo-2 icon. Slides in/out with the app timing; positioning is up to the
 * caller (`style`).
 */
const TodayUndoToast = ({
  label,
  onPress,
  isVisible = true,
  isDisabled = false,
  accessibilityLabel,
  style,
  testID
}) => {
  const theme = (0, _index4.useTheme)();
  const styles = (0, _index4.useThemedStyles)(createStyles);
  const [phase, setPhase] = (0, _react.useState)(isVisible ? 'entering' : 'hidden');
  const isMountedRef = (0, _react.useRef)(true);
  const transitionIdRef = (0, _react.useRef)(0);
  const translateY = (0, _reactNativeReanimated.useSharedValue)(TOAST_OFFSCREEN_TRANSLATE_Y);
  const opacity = (0, _reactNativeReanimated.useSharedValue)(HIDDEN_OPACITY);
  const handleTransitionEnd = (0, _react.useCallback)((transitionId, nextPhase) => {
    if (isMountedRef.current && transitionIdRef.current === transitionId) {
      setPhase(nextPhase);
    }
  }, []);
  const animateTo = (0, _react.useCallback)(isShown => {
    const transitionId = ++transitionIdRef.current;
    const config = {
      duration: TOAST_ANIMATION_DURATION_MS,
      easing: isShown ? _reactNativeReanimated.Easing.out(_reactNativeReanimated.Easing.cubic) : _reactNativeReanimated.Easing.in(_reactNativeReanimated.Easing.cubic)
    };
    const nextPhase = isShown ? 'visible' : 'hidden';
    (0, _reactNativeReanimated.cancelAnimation)(translateY);
    (0, _reactNativeReanimated.cancelAnimation)(opacity);
    translateY.value = (0, _reactNativeReanimated.withTiming)(isShown ? 0 : TOAST_OFFSCREEN_TRANSLATE_Y, config);
    opacity.value = (0, _reactNativeReanimated.withTiming)(isShown ? IDLE_OPACITY : HIDDEN_OPACITY, config, isFinished => {
      'worklet';

      if (isFinished) {
        (0, _reactNativeReanimated.runOnJS)(handleTransitionEnd)(transitionId, nextPhase);
      }
    });
  }, [handleTransitionEnd, opacity, translateY]);

  // Declared before the animation effect so a remount (StrictMode) marks the
  // component mounted before a new transition starts.
  (0, _react.useEffect)(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      transitionIdRef.current += 1;
      (0, _reactNativeReanimated.cancelAnimation)(translateY);
      (0, _reactNativeReanimated.cancelAnimation)(opacity);
    };
  }, [opacity, translateY]);
  (0, _react.useEffect)(() => {
    if (isVisible) {
      setPhase('entering');
      animateTo(true);
    } else {
      setPhase(current => current === 'hidden' ? current : 'exiting');
      animateTo(false);
    }
  }, [animateTo, isVisible]);
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    transform: [{
      translateY: translateY.value
    }]
  }));
  if (phase === 'hidden') {
    return null;
  }
  const isBlocked = isDisabled || phase !== 'visible';
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
    pointerEvents: "box-none",
    style: [animatedStyle, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Pressable, {
      testID: testID,
      accessibilityRole: "button",
      accessibilityLabel: accessibilityLabel ?? label,
      accessibilityState: {
        disabled: isBlocked
      },
      disabled: isBlocked,
      hitSlop: TOAST_HIT_SLOP,
      onPress: onPress,
      style: ({
        pressed
      }) => [styles.pill, {
        opacity: pressed ? theme.opacity.pressed : IDLE_OPACITY
      }],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
        variant: "headline/medium",
        color: "inverse",
        numberOfLines: 1,
        children: label
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
        icon: _index.IconUndo2,
        size: TOAST_ICON_SIZE,
        color: "text.inverse"
      })]
    })
  });
};
exports.TodayUndoToast = TodayUndoToast;
//# sourceMappingURL=TodayUndoToast.js.map