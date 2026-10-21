"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCompletionReached = exports.TodayCompletionSlider = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Text/index.js");
var _index4 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// Figma TodayCompletionSlider: track 180×48 (FIXED, no width token).
const TRACK_WIDTH = 180;
// Figma TodayCompletionSlider › Ручка › check: 20×20.
const HANDLE_ICON_SIZE = 20;
// Figma TodayCompletionSlider isDisabled=true: layer opacity 0.6 (kit `opacity.disabled` is 0.45).
const DISABLED_OPACITY = 0.6;
const IDLE_OPACITY = 1;
// App TodayCompletionSlider: the handle dims slightly while dragged.
const DRAGGING_HANDLE_OPACITY = 0.9;
// App TodayCompletionSlider: releasing past 80% of the track completes the task.
const COMPLETION_THRESHOLD = 0.8;
// App TodayCompletionSlider: snap to the end after a successful release.
const COMPLETION_SNAP_DURATION_MS = 140;
// App TodayCompletionSlider: a horizontal drag activates after 8pt; a vertical
// move of 12pt fails the pan first, so the parent list can scroll.
const DRAG_ACTIVATION_OFFSET_X = 8;
const DRAG_FAIL_OFFSET_Y = 12;
const ACCESSIBILITY_VALUE_MIN = 0;
const ACCESSIBILITY_VALUE_MAX = 100;
const COMPLETE_ACTION_NAMES = new Set(['activate', 'increment']);

/** Distance the handle travels: track minus the 4pt inset on both sides and the handle. */
const resolveMaximumOffset = (theme, trackWidth) => Math.max(0, trackWidth - theme.space[1] * 2 - theme.space[10]);

/** True when a release at `offset` is far enough to complete. */
const isCompletionReached = (offset, maximumOffset) => maximumOffset > 0 && Math.min(Math.max(offset, 0), maximumOffset) / maximumOffset >= COMPLETION_THRESHOLD;
exports.isCompletionReached = isCompletionReached;
const createStyles = theme => _reactNative.StyleSheet.create({
  completedHandle: {
    backgroundColor: theme.palette.secondary
  },
  completedTrack: {
    justifyContent: 'space-between',
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    paddingLeft: theme.space[6] - theme.stroke[1],
    paddingRight: theme.space[1] - theme.stroke[1]
  },
  handle: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.accent,
    borderRadius: theme.radius.full,
    height: theme.space[10],
    justifyContent: 'center',
    width: theme.space[10]
  },
  label: {
    flexShrink: 1
  },
  track: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.full,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    height: theme.space[12],
    overflow: 'hidden',
    paddingLeft: theme.space[1] - theme.stroke[1],
    width: TRACK_WIDTH
  }
});

/**
 * «Готово!» slider of a Today task (Figma `TodayCompletionSlider`): drag the
 * purple handle to the right to mark the task done. The handle follows the
 * finger on the UI thread (gesture handler + Reanimated); JS is reached once
 * on release and once when the handle lands. Screen readers get an
 * `adjustable` element with an `activate`/`increment` action that completes
 * without swiping.
 */
const TodayCompletionSlider = ({
  completedLabel,
  isCompleted = false,
  isDisabled = false,
  onComplete,
  onDragStart,
  resetKey,
  accessibilityLabel,
  style,
  testID
}) => {
  const theme = (0, _index4.useTheme)();
  const styles = (0, _index4.useThemedStyles)(createStyles);
  const translateX = (0, _reactNativeReanimated.useSharedValue)(0);
  const maximumOffset = (0, _reactNativeReanimated.useSharedValue)(resolveMaximumOffset(theme, TRACK_WIDTH));
  const isDragging = (0, _reactNativeReanimated.useSharedValue)(false);
  const hasCompletedRef = (0, _react.useRef)(isCompleted);
  const animationVersionRef = (0, _react.useRef)(0);
  const isBlockedRef = (0, _react.useRef)(isCompleted || isDisabled);
  const onCompleteRef = (0, _react.useRef)(onComplete);
  const onDragStartRef = (0, _react.useRef)(onDragStart);
  isBlockedRef.current = isCompleted || isDisabled;
  onCompleteRef.current = onComplete;
  onDragStartRef.current = onDragStart;
  const stopHandle = (0, _react.useCallback)(() => {
    animationVersionRef.current += 1;
    (0, _reactNativeReanimated.cancelAnimation)(translateX);
  }, [translateX]);
  const resetHandle = (0, _react.useCallback)(() => {
    stopHandle();
    translateX.value = (0, _reactNativeReanimated.withSpring)(0);
  }, [stopHandle, translateX]);

  /** Claims the completion once; false if blocked or already claimed. */
  const claimCompletion = (0, _react.useCallback)(() => {
    if (hasCompletedRef.current || isBlockedRef.current) {
      return false;
    }
    hasCompletedRef.current = true;
    return true;
  }, []);
  const handleSnapFinished = (0, _react.useCallback)(animationVersion => {
    if (animationVersionRef.current === animationVersion && !isBlockedRef.current) {
      onCompleteRef.current();
    }
  }, []);
  const handleRelease = (0, _react.useCallback)(gestureX => {
    const maximum = maximumOffset.value;
    if (!isCompletionReached(gestureX, maximum) || !claimCompletion()) {
      resetHandle();
      return;
    }
    stopHandle();
    const animationVersion = animationVersionRef.current;
    translateX.value = (0, _reactNativeReanimated.withTiming)(maximum, {
      duration: COMPLETION_SNAP_DURATION_MS
    }, isFinished => {
      'worklet';

      if (isFinished) {
        (0, _reactNativeReanimated.runOnJS)(handleSnapFinished)(animationVersion);
      }
    });
  }, [claimCompletion, handleSnapFinished, maximumOffset, resetHandle, stopHandle, translateX]);
  const handleDragStart = (0, _react.useCallback)(() => {
    animationVersionRef.current += 1;
    hasCompletedRef.current = false;
    onDragStartRef.current?.();
  }, []);
  const handleDragCancel = (0, _react.useCallback)(() => {
    hasCompletedRef.current = false;
    resetHandle();
  }, [resetHandle]);

  // A new task, state or availability puts the handle back at the start.
  (0, _react.useEffect)(() => {
    stopHandle();
    isDragging.value = false;
    hasCompletedRef.current = isCompleted;
    translateX.value = 0;
  }, [isCompleted, isDisabled, isDragging, resetKey, stopHandle, translateX]);
  (0, _react.useEffect)(() => () => {
    animationVersionRef.current += 1;
    (0, _reactNativeReanimated.cancelAnimation)(translateX);
  }, [translateX]);
  const isGestureEnabled = !isCompleted && !isDisabled;
  const panGesture = (0, _react.useMemo)(() => _reactNativeGestureHandler.Gesture.Pan().enabled(isGestureEnabled).activeOffsetX([-DRAG_ACTIVATION_OFFSET_X, DRAG_ACTIVATION_OFFSET_X]).failOffsetY([-DRAG_FAIL_OFFSET_Y, DRAG_FAIL_OFFSET_Y]).onStart(() => {
    'worklet';

    (0, _reactNativeReanimated.cancelAnimation)(translateX);
    isDragging.value = true;
    (0, _reactNativeReanimated.runOnJS)(handleDragStart)();
  }).onUpdate(event => {
    'worklet';

    translateX.value = Math.min(Math.max(event.translationX, 0), maximumOffset.value);
  }).onEnd(event => {
    'worklet';

    isDragging.value = false;
    (0, _reactNativeReanimated.runOnJS)(handleRelease)(event.translationX);
  }).onFinalize((_event, isSuccess) => {
    'worklet';

    if (isSuccess) {
      return;
    }
    isDragging.value = false;
    (0, _reactNativeReanimated.runOnJS)(handleDragCancel)();
  }), [handleDragCancel, handleDragStart, handleRelease, isDragging, isGestureEnabled, maximumOffset, translateX]);
  const handleAnimatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: isDragging.value ? DRAGGING_HANDLE_OPACITY : IDLE_OPACITY,
    transform: [{
      translateX: translateX.value
    }]
  }));
  const handleLayout = event => {
    const nextMaximum = resolveMaximumOffset(theme, event.nativeEvent.layout.width);
    if (maximumOffset.value !== nextMaximum) {
      maximumOffset.value = nextMaximum;
      stopHandle();
      translateX.value = 0;
    }
  };
  const handleAccessibilityAction = event => {
    if (!COMPLETE_ACTION_NAMES.has(event.nativeEvent.actionName) || !claimCompletion()) {
      return;
    }
    stopHandle();
    translateX.value = maximumOffset.value;
    onCompleteRef.current();
  };
  const label = accessibilityLabel ?? completedLabel;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.GestureDetector, {
    gesture: panGesture,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      testID: testID,
      accessible: true,
      accessibilityRole: "adjustable",
      accessibilityLabel: label,
      accessibilityActions: isCompleted || isDisabled ? [] : [{
        name: 'activate',
        label: completedLabel
      }, {
        name: 'increment',
        label: completedLabel
      }],
      accessibilityValue: {
        min: ACCESSIBILITY_VALUE_MIN,
        max: ACCESSIBILITY_VALUE_MAX,
        now: isCompleted ? ACCESSIBILITY_VALUE_MAX : ACCESSIBILITY_VALUE_MIN,
        text: isCompleted ? completedLabel : undefined
      },
      accessibilityState: {
        disabled: isDisabled,
        checked: isCompleted
      },
      onAccessibilityAction: handleAccessibilityAction,
      onLayout: handleLayout,
      style: [styles.track, isCompleted && styles.completedTrack, {
        opacity: isDisabled ? DISABLED_OPACITY : IDLE_OPACITY
      }, style],
      children: isCompleted ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
          variant: "headline/medium",
          numberOfLines: 1,
          style: styles.label,
          children: completedLabel
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          testID: testID ? `${testID}.handle` : undefined,
          style: [styles.handle, styles.completedHandle],
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
            icon: _index.IconCheck,
            size: HANDLE_ICON_SIZE,
            color: "text.inverse"
          })
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
        testID: testID ? `${testID}.handle` : undefined,
        style: [styles.handle, handleAnimatedStyle],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
          icon: _index.IconCheck,
          size: HANDLE_ICON_SIZE,
          color: "text.inverse"
        })
      })
    })
  });
};
exports.TodayCompletionSlider = TodayCompletionSlider;
//# sourceMappingURL=TodayCompletionSlider.js.map