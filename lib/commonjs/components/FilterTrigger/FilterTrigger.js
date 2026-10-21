"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterTrigger = void 0;
var _reactNative = require("react-native");
var _FilterIcon = require("../../icons/FilterIcon.js");
var _index = require("../../primitives/Icon/index.js");
var _index2 = require("../../primitives/Text/index.js");
var _index3 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Counts above this show as "999+". */
const MAX_FILTER_BADGE_COUNT = 999;
/** App filter button diameter (Figma IconRoundButton size=40). */
const BUTTON_SIZE = 40;
const ICON_SIZE = 24;
// off-scale: badge pill geometry from the app (no Figma tokens).
const BADGE_OFFSET = -4;
const BADGE_MIN_WIDTH = 20;
const BADGE_HEIGHT = 14;
// off-scale: the app dims to 0.6 and presses to 0.9, not the kit opacity tokens.
const DISABLED_OPACITY = 0.6;
const PRESSED_OPACITY = 0.9;
const IDLE_OPACITY = 1;
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: theme.radius.full,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    width: BUTTON_SIZE
  },
  badge: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.accent,
    borderRadius: theme.radius.full,
    height: BADGE_HEIGHT,
    justifyContent: 'center',
    minWidth: BADGE_MIN_WIDTH,
    paddingHorizontal: theme.space[1],
    position: 'absolute',
    right: BADGE_OFFSET,
    top: BADGE_OFFSET
  }
});

/** Round filter button; a purple badge shows the active filter count. */
const FilterTrigger = ({
  accessibilityLabel,
  testID,
  count = 0,
  disabled = false,
  onPress,
  style
}) => {
  const styles = (0, _index3.useThemedStyles)(createStyles);
  const badgeText = count > MAX_FILTER_BADGE_COUNT ? `${MAX_FILTER_BADGE_COUNT}+` : String(count);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Pressable, {
    testID: testID,
    onPress: onPress,
    disabled: disabled,
    style: ({
      pressed
    }) => [styles.container, {
      opacity: disabled ? DISABLED_OPACITY : pressed ? PRESSED_OPACITY : IDLE_OPACITY
    }, style],
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel,
    accessibilityState: {
      disabled
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
      icon: _FilterIcon.FilterIcon,
      size: ICON_SIZE
    }), count > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.badge,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
        variant: "caption/medium",
        color: "inverse",
        align: "center",
        numberOfLines: 1,
        children: badgeText
      })
    }) : null]
  });
};
exports.FilterTrigger = FilterTrigger;
//# sourceMappingURL=FilterTrigger.js.map