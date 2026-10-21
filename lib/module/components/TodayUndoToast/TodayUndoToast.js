"use strict";

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Easing, cancelAnimation, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { IconUndo2 } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const createStyles = theme => StyleSheet.create({
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
export const TodayUndoToast = ({
  label,
  onPress,
  isVisible = true,
  isDisabled = false,
  accessibilityLabel,
  style,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const [phase, setPhase] = useState(isVisible ? 'entering' : 'hidden');
  const isMountedRef = useRef(true);
  const transitionIdRef = useRef(0);
  const translateY = useSharedValue(TOAST_OFFSCREEN_TRANSLATE_Y);
  const opacity = useSharedValue(HIDDEN_OPACITY);
  const handleTransitionEnd = useCallback((transitionId, nextPhase) => {
    if (isMountedRef.current && transitionIdRef.current === transitionId) {
      setPhase(nextPhase);
    }
  }, []);
  const animateTo = useCallback(isShown => {
    const transitionId = ++transitionIdRef.current;
    const config = {
      duration: TOAST_ANIMATION_DURATION_MS,
      easing: isShown ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic)
    };
    const nextPhase = isShown ? 'visible' : 'hidden';
    cancelAnimation(translateY);
    cancelAnimation(opacity);
    translateY.value = withTiming(isShown ? 0 : TOAST_OFFSCREEN_TRANSLATE_Y, config);
    opacity.value = withTiming(isShown ? IDLE_OPACITY : HIDDEN_OPACITY, config, isFinished => {
      'worklet';

      if (isFinished) {
        runOnJS(handleTransitionEnd)(transitionId, nextPhase);
      }
    });
  }, [handleTransitionEnd, opacity, translateY]);

  // Declared before the animation effect so a remount (StrictMode) marks the
  // component mounted before a new transition starts.
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      transitionIdRef.current += 1;
      cancelAnimation(translateY);
      cancelAnimation(opacity);
    };
  }, [opacity, translateY]);
  useEffect(() => {
    if (isVisible) {
      setPhase('entering');
      animateTo(true);
    } else {
      setPhase(current => current === 'hidden' ? current : 'exiting');
      animateTo(false);
    }
  }, [animateTo, isVisible]);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{
      translateY: translateY.value
    }]
  }));
  if (phase === 'hidden') {
    return null;
  }
  const isBlocked = isDisabled || phase !== 'visible';
  return /*#__PURE__*/_jsx(Animated.View, {
    pointerEvents: "box-none",
    style: [animatedStyle, style],
    children: /*#__PURE__*/_jsxs(Pressable, {
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
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "headline/medium",
        color: "inverse",
        numberOfLines: 1,
        children: label
      }), /*#__PURE__*/_jsx(Icon, {
        icon: IconUndo2,
        size: TOAST_ICON_SIZE,
        color: "text.inverse"
      })]
    })
  });
};
//# sourceMappingURL=TodayUndoToast.js.map