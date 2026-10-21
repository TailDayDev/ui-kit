"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceHeaderTrigger = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Pressable/index.js");
var _index4 = require("../../primitives/Text/index.js");
var _index5 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma ServiceHeaderTrigger › Картинка: 40×40 circle.
const IMAGE_SIZE = 40;
// Figma ServiceHeaderTrigger › Бейдж: minW 20.
const BADGE_MIN_WIDTH = 20;
// Figma ServiceHeaderTrigger › Бейдж: placed at (22, -4) from the chevron frame.
const BADGE_LEFT = 22;
const BADGE_TOP = -4;
const createStyles = theme => _reactNative.StyleSheet.create({
  trigger: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: theme.space[2],
    minWidth: 0
  },
  image: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: theme.radius.full,
    height: IMAGE_SIZE,
    justifyContent: 'center',
    overflow: 'hidden',
    width: IMAGE_SIZE
  },
  title: {
    flexShrink: 1,
    minWidth: 0
  },
  chevron: {
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: theme.radius.full,
    height: _index2.DEFAULT_ICON_SIZE,
    width: _index2.DEFAULT_ICON_SIZE
  },
  badge: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.accent,
    borderRadius: theme.radius.lg,
    justifyContent: 'center',
    left: BADGE_LEFT,
    minWidth: BADGE_MIN_WIDTH,
    paddingHorizontal: theme.space[1],
    position: 'absolute',
    top: BADGE_TOP
  }
});
const ServiceHeaderTriggerComponent = ({
  titleSelected,
  notifications,
  hasNotificationsBadge = true,
  image,
  onPress,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = (0, _index5.useThemedStyles)(createStyles);
  const isInteractive = Boolean(onPress);
  const isBadgeVisible = hasNotificationsBadge && notifications !== undefined;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index3.Pressable, {
    onPress: onPress,
    isFeedbackDisabled: !isInteractive,
    accessibilityRole: isInteractive ? 'button' : 'none',
    accessibilityLabel: accessibilityLabel ?? titleSelected,
    style: [styles.trigger, style],
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.image,
      children: image
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.Text, {
      variant: "title/bold",
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: styles.title,
      children: titleSelected
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.chevron,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
        icon: _index.IconChevronDown
      }), isBadgeVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.badge,
        testID: testID ? `${testID}.badge` : undefined,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.Text, {
          variant: "caption/medium",
          color: "inverse",
          align: "center",
          children: notifications
        })
      }) : null]
    })]
  });
};

/** Hotel selector: photo, name, chevron and a new-bookings badge. Figma `ServiceHeaderTrigger`. */
const ServiceHeaderTrigger = exports.ServiceHeaderTrigger = /*#__PURE__*/(0, _react.memo)(ServiceHeaderTriggerComponent);
//# sourceMappingURL=ServiceHeaderTrigger.js.map