"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBox = void 0;
var _reactNative = require("react-native");
var _CheckIcon = require("../../icons/CheckIcon.js");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App `CheckBox` box size (off-scale: not a Figma size token). */
const BOX_SIZE = 16;
/** App `CheckBox` corner radius (off-scale: below `radius.sm`). */
const BOX_RADIUS = 4;
/** App `CheckBox` check mark size. */
const CHECK_ICON_SIZE = 12;
const createStyles = theme => _reactNative.StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: BOX_RADIUS,
    borderWidth: theme.stroke[1],
    height: BOX_SIZE,
    justifyContent: 'center',
    width: BOX_SIZE
  },
  boxActive: {
    backgroundColor: theme.colors.bg.accent,
    borderWidth: 0
  },
  boxDisabled: {
    opacity: theme.opacity.disabled
  }
});

/**
 * Checkbox control. Uses `TouchableOpacity` (default pressed opacity) to keep
 * the app's press feedback 1:1.
 */
const CheckBox = ({
  isActive,
  handlePress,
  disabled = false,
  accessibilityLabel,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    onPress: handlePress,
    disabled: disabled,
    style: [styles.box, isActive && styles.boxActive, disabled && styles.boxDisabled],
    testID: testID,
    accessibilityRole: "checkbox",
    accessibilityLabel: accessibilityLabel,
    accessibilityState: {
      checked: isActive,
      disabled
    },
    children: isActive ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
      icon: _CheckIcon.CheckIcon,
      size: CHECK_ICON_SIZE,
      color: "text.inverse"
    }) : null
  });
};
exports.CheckBox = CheckBox;
//# sourceMappingURL=CheckBox.js.map