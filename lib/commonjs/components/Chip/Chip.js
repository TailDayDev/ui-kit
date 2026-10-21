"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chip = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../primitives/Pressable/index.js");
var _index2 = require("../../primitives/Text/index.js");
var _index3 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma Chip › Счётчик: minW 16.
const BADGE_MIN_WIDTH = 16;
const createStyles = theme => _reactNative.StyleSheet.create({
  chip: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[1],
    paddingHorizontal: theme.space[3],
    paddingVertical: theme.space[2]
  },
  chipSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  },
  chipUnselected: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default
  },
  badge: {
    alignItems: 'center',
    borderRadius: theme.radius.lg,
    justifyContent: 'center',
    minWidth: BADGE_MIN_WIDTH,
    paddingHorizontal: theme.space[1]
  },
  badgeSelected: {
    backgroundColor: theme.colors.bg.accent
  },
  badgeUnselected: {
    backgroundColor: theme.colors.bg.accentSoft
  }
});
const ChipComponent = ({
  name,
  count,
  hasBadge = true,
  isSelected = true,
  onPress,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = (0, _index3.useThemedStyles)(createStyles);
  const isBadgeVisible = hasBadge && count !== undefined;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Pressable, {
    onPress: onPress,
    isFeedbackDisabled: !onPress,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel,
    accessibilityState: {
      selected: isSelected
    },
    testID: testID,
    style: [styles.chip, isSelected ? styles.chipSelected : styles.chipUnselected, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
      variant: isSelected ? 'caption/bold' : 'caption/medium',
      color: isSelected ? 'accent' : 'primary',
      numberOfLines: 1,
      children: name
    }), isBadgeVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.badge, isSelected ? styles.badgeSelected : styles.badgeUnselected],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
        variant: "caption/medium",
        color: isSelected ? 'inverse' : 'accent',
        align: "center",
        children: count
      })
    }) : null]
  });
};

/** Filter chip: name plus an optional count badge. Figma `Chip`. */
const Chip = exports.Chip = /*#__PURE__*/(0, _react.memo)(ChipComponent);
//# sourceMappingURL=Chip.js.map