"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayDoorButton = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const IDLE_OPACITY = 1;
const createStyles = theme => _reactNative.StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    height: theme.space[12],
    justifyContent: 'center',
    paddingHorizontal: theme.space[8],
    paddingVertical: theme.space[4]
  }
});

/**
 * Footer action of a Today card that works with a booking: check in, check
 * out, move (Figma `TodayDoorButton`). Soft-gray 48pt bar, radius 8,
 * centered `headline/medium` label.
 */
const TodayDoorButton = ({
  label,
  onPress,
  isDisabled = false,
  accessibilityLabel,
  style,
  testID
}) => {
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    testID: testID,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityState: {
      disabled: isDisabled
    },
    disabled: isDisabled,
    onPress: onPress,
    style: ({
      pressed
    }) => [styles.button, {
      opacity: isDisabled ? theme.opacity.disabled : pressed ? theme.opacity.pressed : IDLE_OPACITY
    }, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "headline/medium",
      align: "center",
      numberOfLines: 1,
      children: label
    })
  });
};
exports.TodayDoorButton = TodayDoorButton;
//# sourceMappingURL=TodayDoorButton.js.map