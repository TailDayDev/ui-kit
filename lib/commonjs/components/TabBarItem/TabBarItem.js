"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabBarItem = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TabBarItem: FIXED width 92.
const TAB_BAR_ITEM_WIDTH = 92;
// Figma TabBarItem › Badge: 6×6 ellipse.
const BADGE_SIZE = 6;
// Figma TabBarItem › Badge: placed at (23, -2) from the icon origin.
const BADGE_LEFT = 23;
const BADGE_TOP = -2;
const createStyles = theme => _reactNative.StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: theme.space[3],
    width: TAB_BAR_ITEM_WIDTH
  },
  iconWrapper: {
    height: _index2.DEFAULT_ICON_SIZE,
    width: _index2.DEFAULT_ICON_SIZE
  },
  badge: {
    backgroundColor: theme.colors.bg.accent,
    borderRadius: theme.radius.full,
    height: BADGE_SIZE,
    left: BADGE_LEFT,
    position: 'absolute',
    top: BADGE_TOP,
    width: BADGE_SIZE
  }
});
const TabBarItemComponent = ({
  icon = _index.IconTabToday,
  isFocused = true,
  hasBadge = false,
  accessibilityLabel,
  onPress,
  onPressIn,
  onLongPress,
  style,
  testID
}) => {
  const styles = (0, _index3.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    accessibilityRole: "tab",
    accessibilityLabel: accessibilityLabel,
    accessibilityState: {
      selected: isFocused
    },
    onPress: onPress,
    onPressIn: onPressIn,
    onLongPress: onLongPress,
    style: [styles.item, style],
    testID: testID,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.iconWrapper,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
        icon: icon,
        color: isFocused ? 'accent' : 'default'
      }), hasBadge ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.badge,
        testID: testID ? `${testID}.badge` : undefined
      }) : null]
    })
  });
};

/** Icon-only bottom tab with an accent focused state and a dot badge. Figma `TabBarItem`. */
const TabBarItem = exports.TabBarItem = /*#__PURE__*/(0, _react.memo)(TabBarItemComponent);
//# sourceMappingURL=TabBarItem.js.map