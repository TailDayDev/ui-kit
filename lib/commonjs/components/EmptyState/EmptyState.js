"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyState = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App action pressed opacity (differs from `opacity.pressed`). */
const ACTION_PRESSED_OPACITY = 0.8;
/** App action minimum width (off-scale). */
const ACTION_MIN_WIDTH = 120;
const createStyles = theme => _reactNative.StyleSheet.create({
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
const EmptyState = ({
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
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const shouldShowAction = isActionVisible && Boolean(onAction);
  const illustrationElement = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.iconContainer,
    children: illustration
  });
  const textElement = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.textContainer, textContainerStyle],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "title/bold",
      color: "primary",
      align: "center",
      style: titleStyle,
      children: title
    }), description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "body/regular",
      color: "secondary",
      align: "center",
      style: descriptionStyle,
      children: description
    }) : null]
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.container, style],
    testID: testID,
    children: [messageStyle ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: messageStyle,
      children: [illustrationElement, textElement]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [illustrationElement, textElement]
    }), shouldShowAction ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      activeOpacity: ACTION_PRESSED_OPACITY,
      accessibilityLabel: actionTitle,
      accessibilityRole: "button",
      onPress: onAction,
      style: [styles.actionButton, actionButtonStyle],
      testID: actionTestID,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "headline/medium",
        color: "inverse",
        align: "center",
        style: actionTextStyle,
        children: actionTitle
      })
    }) : null]
  });
};
exports.EmptyState = EmptyState;
//# sourceMappingURL=EmptyState.js.map