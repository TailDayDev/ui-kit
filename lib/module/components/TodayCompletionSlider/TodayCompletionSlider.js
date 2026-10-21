"use strict";

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { IconCheck } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
export const isCompletionReached = (offset, maximumOffset) => maximumOffset > 0 && Math.min(Math.max(offset, 0), maximumOffset) / maximumOffset >= COMPLETION_THRESHOLD;
const createStyles = theme => StyleSheet.create({
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
export const TodayCompletionSlider = ({
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
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const translateX = useSharedValue(0);
  const maximumOffset = useSharedValue(resolveMaximumOffset(theme, TRACK_WIDTH));
  const isDragging = useSharedValue(false);
  const hasCompletedRef = useRef(isCompleted);
  const animationVersionRef = useRef(0);
  const isBlockedRef = useRef(isCompleted || isDisabled);
  const onCompleteRef = useRef(onComplete);
  const onDragStartRef = useRef(onDragStart);
  isBlockedRef.current = isCompleted || isDisabled;
  onCompleteRef.current = onComplete;
  onDragStartRef.current = onDragStart;
  const stopHandle = useCallback(() => {
    animationVersionRef.current += 1;
    cancelAnimation(translateX);
  }, [translateX]);
  const resetHandle = useCallback(() => {
    stopHandle();
    translateX.value = withSpring(0);
  }, [stopHandle, translateX]);

  /** Claims the completion once; false if blocked or already claimed. */
  const claimCompletion = useCallback(() => {
    if (hasCompletedRef.current || isBlockedRef.current) {
      return false;
    }
    hasCompletedRef.current = true;
    return true;
  }, []);
  const handleSnapFinished = useCallback(animationVersion => {
    if (animationVersionRef.current === animationVersion && !isBlockedRef.current) {
      onCompleteRef.current();
    }
  }, []);
  const handleRelease = useCallback(gestureX => {
    const maximum = maximumOffset.value;
    if (!isCompletionReached(gestureX, maximum) || !claimCompletion()) {
      resetHandle();
      return;
    }
    stopHandle();
    const animationVersion = animationVersionRef.current;
    translateX.value = withTiming(maximum, {
      duration: COMPLETION_SNAP_DURATION_MS
    }, isFinished => {
      'worklet';

      if (isFinished) {
        runOnJS(handleSnapFinished)(animationVersion);
      }
    });
  }, [claimCompletion, handleSnapFinished, maximumOffset, resetHandle, stopHandle, translateX]);
  const handleDragStart = useCallback(() => {
    animationVersionRef.current += 1;
    hasCompletedRef.current = false;
    onDragStartRef.current?.();
  }, []);
  const handleDragCancel = useCallback(() => {
    hasCompletedRef.current = false;
    resetHandle();
  }, [resetHandle]);

  // A new task, state or availability puts the handle back at the start.
  useEffect(() => {
    stopHandle();
    isDragging.value = false;
    hasCompletedRef.current = isCompleted;
    translateX.value = 0;
  }, [isCompleted, isDisabled, isDragging, resetKey, stopHandle, translateX]);
  useEffect(() => () => {
    animationVersionRef.current += 1;
    cancelAnimation(translateX);
  }, [translateX]);
  const isGestureEnabled = !isCompleted && !isDisabled;
  const panGesture = useMemo(() => Gesture.Pan().enabled(isGestureEnabled).activeOffsetX([-DRAG_ACTIVATION_OFFSET_X, DRAG_ACTIVATION_OFFSET_X]).failOffsetY([-DRAG_FAIL_OFFSET_Y, DRAG_FAIL_OFFSET_Y]).onStart(() => {
    'worklet';

    cancelAnimation(translateX);
    isDragging.value = true;
    runOnJS(handleDragStart)();
  }).onUpdate(event => {
    'worklet';

    translateX.value = Math.min(Math.max(event.translationX, 0), maximumOffset.value);
  }).onEnd(event => {
    'worklet';

    isDragging.value = false;
    runOnJS(handleRelease)(event.translationX);
  }).onFinalize((_event, isSuccess) => {
    'worklet';

    if (isSuccess) {
      return;
    }
    isDragging.value = false;
    runOnJS(handleDragCancel)();
  }), [handleDragCancel, handleDragStart, handleRelease, isDragging, isGestureEnabled, maximumOffset, translateX]);
  const handleAnimatedStyle = useAnimatedStyle(() => ({
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
  return /*#__PURE__*/_jsx(GestureDetector, {
    gesture: panGesture,
    children: /*#__PURE__*/_jsx(View, {
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
      children: isCompleted ? /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Text, {
          variant: "headline/medium",
          numberOfLines: 1,
          style: styles.label,
          children: completedLabel
        }), /*#__PURE__*/_jsx(View, {
          testID: testID ? `${testID}.handle` : undefined,
          style: [styles.handle, styles.completedHandle],
          children: /*#__PURE__*/_jsx(Icon, {
            icon: IconCheck,
            size: HANDLE_ICON_SIZE,
            color: "text.inverse"
          })
        })]
      }) : /*#__PURE__*/_jsx(Animated.View, {
        testID: testID ? `${testID}.handle` : undefined,
        style: [styles.handle, handleAnimatedStyle],
        children: /*#__PURE__*/_jsx(Icon, {
          icon: IconCheck,
          size: HANDLE_ICON_SIZE,
          color: "text.inverse"
        })
      })
    })
  });
};
//# sourceMappingURL=TodayCompletionSlider.js.map