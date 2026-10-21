"use strict";

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/** App action pressed opacity (differs from `opacity.pressed`). */
const ACTION_PRESSED_OPACITY = 0.8;
/** App action minimum width (off-scale). */
const ACTION_MIN_WIDTH = 120;
const createStyles = theme => StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.space[8],
    justifyContent: 'center',
    paddingHorizontal: theme.space[6],
    paddingVertical: theme.space[8]
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    alignItems: 'center',
    gap: theme.space[2]
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.accent,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    minHeight: theme.minTouchTarget,
    minWidth: ACTION_MIN_WIDTH,
    paddingHorizontal: theme.space[5],
    paddingVertical: theme.space[3]
  }
});

/** Centered empty / error state with an optional action. Figma pattern: `TodayScreenState`. */
export const EmptyState = ({
  title,
  description,
  actionTitle,
  illustration,
  messageStyle,
  onAction,
  style,
  textContainerStyle,
  titleStyle,
  descriptionStyle,
  actionButtonStyle,
  actionTextStyle,
  testID,
  actionTestID,
  isActionVisible = true
}) => {
  const styles = useThemedStyles(createStyles);
  const shouldShowAction = isActionVisible && Boolean(onAction);
  const illustrationElement = /*#__PURE__*/_jsx(View, {
    style: styles.iconContainer,
    children: illustration
  });
  const textElement = /*#__PURE__*/_jsxs(View, {
    style: [styles.textContainer, textContainerStyle],
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "title/bold",
      color: "primary",
      align: "center",
      style: titleStyle,
      children: title
    }), description ? /*#__PURE__*/_jsx(Text, {
      variant: "body/regular",
      color: "secondary",
      align: "center",
      style: descriptionStyle,
      children: description
    }) : null]
  });
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    testID: testID,
    children: [messageStyle ? /*#__PURE__*/_jsxs(View, {
      style: messageStyle,
      children: [illustrationElement, textElement]
    }) : /*#__PURE__*/_jsxs(_Fragment, {
      children: [illustrationElement, textElement]
    }), shouldShowAction ? /*#__PURE__*/_jsx(TouchableOpacity, {
      activeOpacity: ACTION_PRESSED_OPACITY,
      accessibilityLabel: actionTitle,
      accessibilityRole: "button",
      onPress: onAction,
      style: [styles.actionButton, actionButtonStyle],
      testID: actionTestID,
      children: /*#__PURE__*/_jsx(Text, {
        variant: "headline/medium",
        color: "inverse",
        align: "center",
        style: actionTextStyle,
        children: actionTitle
      })
    }) : null]
  });
};
//# sourceMappingURL=EmptyState.js.map