"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconControlButton = exports.DEFAULT_ICON_CONTROL_BUTTON_SIZE = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App `DEFAULT_ICON_CONTROL_BUTTON_SIZE` (Figma IconRoundButton size=40). */
const DEFAULT_ICON_CONTROL_BUTTON_SIZE = exports.DEFAULT_ICON_CONTROL_BUTTON_SIZE = 40;

// off-scale: the app icon buttons dim to 0.6 and press to 0.9, not the kit
// `opacity.disabled` (0.45) / `opacity.pressed` (0.85). Kept for pixel parity.
const ICON_BUTTON_DISABLED_OPACITY = 0.6;
const ICON_BUTTON_PRESSED_OPACITY = 0.9;
const ICON_BUTTON_IDLE_OPACITY = 1;
/**
 * Shared pressable shell for the icon buttons. Shape comes from the public
 * wrappers, not a type prop. Not exported from the kit.
 *
 * Uses React Native `Pressable` rather than the kit primitive because the kit
 * primitive's opacities (0.45 / 0.85) would change the shipped look.
 */
const IconControlButton = ({
  accessibilityLabel,
  borderRadius,
  disabled = false,
  loading = false,
  icon,
  onPress,
  size = DEFAULT_ICON_CONTROL_BUTTON_SIZE,
  style,
  testID
}) => {
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  const isBlocked = disabled || loading;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    accessibilityState: {
      disabled: isBlocked,
      busy: loading
    },
    disabled: isBlocked,
    onPress: onPress,
    testID: testID,
    style: ({
      pressed
    }) => [styles.container, {
      borderRadius,
      height: size,
      width: size
    }, {
      opacity: disabled ? ICON_BUTTON_DISABLED_OPACITY : pressed ? ICON_BUTTON_PRESSED_OPACITY : ICON_BUTTON_IDLE_OPACITY
    }, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      pointerEvents: "none",
      children: loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
        size: "small",
        color: theme.colors.icon.default
      }) : icon
    })
  });
};
exports.IconControlButton = IconControlButton;
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    justifyContent: 'center'
  }
});
//# sourceMappingURL=IconControlButton.js.map