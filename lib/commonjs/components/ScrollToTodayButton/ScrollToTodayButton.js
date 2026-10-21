"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollToTodayButton = void 0;
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma ScrollToTodayButton: layer opacity 0.8.
const BUTTON_OPACITY = 0.8;
// Figma ScrollToTodayButton › arrow-down: 16×16.
const ARROW_ICON_SIZE = 16;
// App scroll-to-today button: 8pt extra touch area around the 32pt circle.
const BUTTON_HIT_SLOP = 8;
const createStyles = theme => _reactNative.StyleSheet.create({
  button: {
    alignItems: 'center',
    // Figma: HUG — the circle never stretches with its parent.
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.full,
    borderWidth: theme.stroke[1],
    justifyContent: 'center',
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    padding: theme.space[2] - theme.stroke[1]
  }
});

/**
 * Floating 32pt circle with a down arrow that scrolls the Today feed back to
 * today's tasks (Figma `ScrollToTodayButton`). White fill, pale border,
 * 80% opacity.
 */
const ScrollToTodayButton = ({
  onPress,
  accessibilityLabel,
  style,
  testID
}) => {
  const theme = (0, _index3.useTheme)();
  const styles = (0, _index3.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    testID: testID,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel,
    hitSlop: BUTTON_HIT_SLOP,
    onPress: onPress,
    style: ({
      pressed
    }) => [styles.button, {
      opacity: BUTTON_OPACITY * (pressed ? theme.opacity.pressed : 1)
    }, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
      icon: _index.IconArrowDown,
      size: ARROW_ICON_SIZE
    })
  });
};
exports.ScrollToTodayButton = ScrollToTodayButton;
//# sourceMappingURL=ScrollToTodayButton.js.map