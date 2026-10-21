"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pressable = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * `Pressable` with consistent feedback: pressed opacity, disabled dimming and
 * accessibility state derived from `disabled`/`loading`.
 */
const Pressable = ({
  disabled = false,
  loading = false,
  isFeedbackDisabled = false,
  style,
  accessibilityRole = 'button',
  accessibilityState,
  ...pressableProps
}) => {
  const theme = (0, _index.useTheme)();
  const isBlocked = disabled || loading;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    disabled: isBlocked,
    accessibilityRole: accessibilityRole,
    accessibilityState: {
      ...accessibilityState,
      disabled: isBlocked,
      busy: loading
    },
    style: ({
      pressed
    }) => [typeof style === 'function' ? style({
      pressed
    }) : style, disabled && {
      opacity: theme.opacity.disabled
    }, pressed && !isBlocked && !isFeedbackDisabled && {
      opacity: theme.opacity.pressed
    }],
    ...pressableProps
  });
};
exports.Pressable = Pressable;
//# sourceMappingURL=Pressable.js.map