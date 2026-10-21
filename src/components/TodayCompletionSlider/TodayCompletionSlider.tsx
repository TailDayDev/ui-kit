import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  StyleSheet,
  View,
  type AccessibilityActionEvent,
  type LayoutChangeEvent,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { IconCheck } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { TodayCompletionSliderProps } from './TodayCompletionSlider.types';

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
const resolveMaximumOffset = (theme: Theme, trackWidth: number): number =>
  Math.max(0, trackWidth - theme.space[1] * 2 - theme.space[10]);

/** True when a release at `offset` is far enough to complete. */
export const isCompletionReached = (
  offset: number,
  maximumOffset: number,
): boolean =>
  maximumOffset > 0 &&
  Math.min(Math.max(offset, 0), maximumOffset) / maximumOffset >=
    COMPLETION_THRESHOLD;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    completedHandle: {
      backgroundColor: theme.palette.secondary,
    },
    completedTrack: {
      justifyContent: 'space-between',
      // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
      paddingLeft: theme.space[6] - theme.stroke[1],
      paddingRight: theme.space[1] - theme.stroke[1],
    },
    handle: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.accent,
      borderRadius: theme.radius.full,
      height: theme.space[10],
      justifyContent: 'center',
      width: theme.space[10],
    },
    label: {
      flexShrink: 1,
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
      width: TRACK_WIDTH,
    },
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
  testID,
}: TodayCompletionSliderProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const translateX = useSharedValue(0);
  const maximumOffset = useSharedValue(
    resolveMaximumOffset(theme, TRACK_WIDTH),
  );
  const isDragging = useSharedValue(false);
  const hasCompletedRef = useRef(isCompleted);
  const animationVersionRef = useRef(0);
  const isBlockedRef = useRef(isCompleted || isDisabled);
  const onCompleteRef = useRef(onComplete);
  const onDragStartRef = useRef(onDragStart);

  isBlockedRef.current = isCompleted || isDisabled;
  onCompleteRef.current = onComplete;
  onDragStartRef.current = onDragStart;

  const stopHandle = useCallback((): void => {
    animationVersionRef.current += 1;
    cancelAnimation(translateX);
  }, [translateX]);

  const resetHandle = useCallback((): void => {
    stopHandle();
    translateX.value = withSpring(0);
  }, [stopHandle, translateX]);

  /** Claims the completion once; false if blocked or already claimed. */
  const claimCompletion = useCallback((): boolean => {
    if (hasCompletedRef.current || isBlockedRef.current) {
      return false;
    }
    hasCompletedRef.current = true;
    return true;
  }, []);

  const handleSnapFinished = useCallback((animationVersion: number): void => {
    if (
      animationVersionRef.current === animationVersion &&
      !isBlockedRef.current
    ) {
      onCompleteRef.current();
    }
  }, []);

  const handleRelease = useCallback(
    (gestureX: number): void => {
      const maximum = maximumOffset.value;
      if (!isCompletionReached(gestureX, maximum) || !claimCompletion()) {
        resetHandle();
        return;
      }
      stopHandle();
      const animationVersion = animationVersionRef.current;
      translateX.value = withTiming(
        maximum,
        { duration: COMPLETION_SNAP_DURATION_MS },
        isFinished => {
          'worklet';
          if (isFinished) {
            runOnJS(handleSnapFinished)(animationVersion);
          }
        },
      );
    },
    [
      claimCompletion,
      handleSnapFinished,
      maximumOffset,
      resetHandle,
      stopHandle,
      translateX,
    ],
  );

  const handleDragStart = useCallback((): void => {
    animationVersionRef.current += 1;
    hasCompletedRef.current = false;
    onDragStartRef.current?.();
  }, []);

  const handleDragCancel = useCallback((): void => {
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

  useEffect(
    () => () => {
      animationVersionRef.current += 1;
      cancelAnimation(translateX);
    },
    [translateX],
  );

  const isGestureEnabled = !isCompleted && !isDisabled;
  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(isGestureEnabled)
        .activeOffsetX([-DRAG_ACTIVATION_OFFSET_X, DRAG_ACTIVATION_OFFSET_X])
        .failOffsetY([-DRAG_FAIL_OFFSET_Y, DRAG_FAIL_OFFSET_Y])
        .onStart(() => {
          'worklet';
          cancelAnimation(translateX);
          isDragging.value = true;
          runOnJS(handleDragStart)();
        })
        .onUpdate(event => {
          'worklet';
          translateX.value = Math.min(
            Math.max(event.translationX, 0),
            maximumOffset.value,
          );
        })
        .onEnd(event => {
          'worklet';
          isDragging.value = false;
          runOnJS(handleRelease)(event.translationX);
        })
        .onFinalize((_event, isSuccess) => {
          'worklet';
          if (isSuccess) {
            return;
          }
          isDragging.value = false;
          runOnJS(handleDragCancel)();
        }),
    [
      handleDragCancel,
      handleDragStart,
      handleRelease,
      isDragging,
      isGestureEnabled,
      maximumOffset,
      translateX,
    ],
  );

  const handleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: isDragging.value ? DRAGGING_HANDLE_OPACITY : IDLE_OPACITY,
    transform: [{ translateX: translateX.value }],
  }));

  const handleLayout = (event: LayoutChangeEvent): void => {
    const nextMaximum = resolveMaximumOffset(
      theme,
      event.nativeEvent.layout.width,
    );
    if (maximumOffset.value !== nextMaximum) {
      maximumOffset.value = nextMaximum;
      stopHandle();
      translateX.value = 0;
    }
  };

  const handleAccessibilityAction = (event: AccessibilityActionEvent): void => {
    if (
      !COMPLETE_ACTION_NAMES.has(event.nativeEvent.actionName) ||
      !claimCompletion()
    ) {
      return;
    }
    stopHandle();
    translateX.value = maximumOffset.value;
    onCompleteRef.current();
  };

  const label = accessibilityLabel ?? completedLabel;

  return (
    <GestureDetector gesture={panGesture}>
      <View
        testID={testID}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityActions={
          isCompleted || isDisabled
            ? []
            : [
                { name: 'activate', label: completedLabel },
                { name: 'increment', label: completedLabel },
              ]
        }
        accessibilityValue={{
          min: ACCESSIBILITY_VALUE_MIN,
          max: ACCESSIBILITY_VALUE_MAX,
          now: isCompleted ? ACCESSIBILITY_VALUE_MAX : ACCESSIBILITY_VALUE_MIN,
          text: isCompleted ? completedLabel : undefined,
        }}
        accessibilityState={{ disabled: isDisabled, checked: isCompleted }}
        onAccessibilityAction={handleAccessibilityAction}
        onLayout={handleLayout}
        style={[
          styles.track,
          isCompleted && styles.completedTrack,
          { opacity: isDisabled ? DISABLED_OPACITY : IDLE_OPACITY },
          style,
        ]}
      >
        {isCompleted ? (
          <>
            <Text
              variant="headline/medium"
              numberOfLines={1}
              style={styles.label}
            >
              {completedLabel}
            </Text>
            <View
              testID={testID ? `${testID}.handle` : undefined}
              style={[styles.handle, styles.completedHandle]}
            >
              <Icon
                icon={IconCheck}
                size={HANDLE_ICON_SIZE}
                color="text.inverse"
              />
            </View>
          </>
        ) : (
          <Animated.View
            testID={testID ? `${testID}.handle` : undefined}
            style={[styles.handle, handleAnimatedStyle]}
          >
            <Icon
              icon={IconCheck}
              size={HANDLE_ICON_SIZE}
              color="text.inverse"
            />
          </Animated.View>
        )}
      </View>
    </GestureDetector>
  );
};
