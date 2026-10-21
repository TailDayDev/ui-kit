"use strict";

import { memo, useEffect, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from "../../primitives/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// All values below are copied from the app `shared/ui/FloatingButton` and have
// no Figma token yet.
/** Default distance from the container bottom. */
const DEFAULT_BOTTOM_OFFSET = 40;
/** Pill radius (renders fully round at the pill's 43pt height). */
const FLOATING_BUTTON_RADIUS = 40;
/** off-scale: disabled pill opacity (kit `opacity.disabled` is 0.45). */
const FLOATING_BUTTON_DISABLED_OPACITY = 0.5;
/** off-scale: pressed opacity (kit `opacity.pressed` is 0.85). */
const FLOATING_BUTTON_ACTIVE_OPACITY = 0.9;
/** Slide distance of the show/hide animation. */
const HIDDEN_TRANSLATE_Y = 12;
const SHOW_DURATION_MS = 180;
const HIDE_DURATION_MS = 160;
/** iOS stacking above scroll content; Android uses zIndex only. */
const IOS_WRAPPER_ELEVATION = 20;
const WRAPPER_Z_INDEX = 200;
const FloatingButtonComponent = ({
  icon,
  onPress,
  title,
  visible = true,
  bottomOffset,
  disabled = false,
  buttonStyle,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const [isMounted, setIsMounted] = useState(visible);
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const translateY = useRef(new Animated.Value(visible ? 0 : HIDDEN_TRANSLATE_Y)).current;
  const isInitialRenderRef = useRef(true);
  useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      return;
    }
    if (visible) {
      setIsMounted(true);
      Animated.parallel([Animated.timing(opacity, {
        toValue: 1,
        duration: SHOW_DURATION_MS,
        useNativeDriver: true
      }), Animated.timing(translateY, {
        toValue: 0,
        duration: SHOW_DURATION_MS,
        useNativeDriver: true
      })]).start();
    } else {
      Animated.parallel([Animated.timing(opacity, {
        toValue: 0,
        duration: HIDE_DURATION_MS,
        useNativeDriver: true
      }), Animated.timing(translateY, {
        toValue: HIDDEN_TRANSLATE_Y,
        duration: HIDE_DURATION_MS,
        useNativeDriver: true
      })]).start(({
        finished
      }) => {
        if (finished) {
          setIsMounted(false);
        }
      });
    }
  }, [visible, opacity, translateY]);
  if (!isMounted) {
    return null;
  }
  return /*#__PURE__*/_jsx(Animated.View, {
    style: [styles.floatingWrapper, {
      opacity,
      transform: [{
        translateY
      }],
      bottom: bottomOffset ?? DEFAULT_BOTTOM_OFFSET
    }]
    // Full-width wrapper: let taps beside a narrower pill reach the content.
    ,
    pointerEvents: visible ? 'box-none' : 'none',
    children: /*#__PURE__*/_jsxs(TouchableOpacity, {
      testID: testID,
      style: [styles.floatingButton, buttonStyle, disabled && styles.floatingButtonDisabled],
      onPress: onPress,
      disabled: disabled,
      accessibilityRole: "button",
      accessibilityLabel: title,
      accessibilityState: {
        disabled
      },
      activeOpacity: FLOATING_BUTTON_ACTIVE_OPACITY,
      children: [icon, /*#__PURE__*/_jsx(Text, {
        variant: "headline/medium",
        color: "inverse",
        children: title
      })]
    })
  });
};

/** Floating accent pill pinned to the bottom of its container. */
export const FloatingButton = /*#__PURE__*/memo(FloatingButtonComponent);
const createStyles = theme => StyleSheet.create({
  floatingButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.accent,
    borderRadius: FLOATING_BUTTON_RADIUS,
    flexDirection: 'row',
    gap: theme.space[3],
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[3]
  },
  floatingButtonDisabled: {
    opacity: FLOATING_BUTTON_DISABLED_OPACITY
  },
  floatingWrapper: {
    alignItems: 'center',
    elevation: Platform.OS === 'android' ? 0 : IOS_WRAPPER_ELEVATION,
    left: 0,
    position: 'absolute',
    right: 0,
    width: '100%',
    zIndex: WRAPPER_Z_INDEX
  }
});
//# sourceMappingURL=FloatingButton.js.map