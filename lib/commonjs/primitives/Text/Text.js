"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const getTypography = (theme, variant) => {
  const [group, weight] = variant.split('/');
  const styles = theme.typography[group];
  return styles[weight];
};

/** Themed text. Every visible string in the kit goes through this component. */
const Text = ({
  variant = 'body/regular',
  color = 'primary',
  align,
  style,
  ...textProps
}) => {
  const theme = (0, _index.useTheme)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
    style: [getTypography(theme, variant), {
      color: theme.colors.text[color],
      textAlign: align
    }, style],
    ...textProps
  });
};
exports.Text = Text;
//# sourceMappingURL=Text.js.map