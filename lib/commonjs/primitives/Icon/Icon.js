"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = exports.DEFAULT_ICON_SIZE = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Figma icon frames are 24×24. */
const DEFAULT_ICON_SIZE = exports.DEFAULT_ICON_SIZE = 24;
const resolveIconColor = (theme, color) => color.startsWith('text.') ? theme.colors.text[color.slice('text.'.length)] : theme.colors.icon[color];

/** Renders an SVG icon component at a token color. */
const Icon = ({
  icon: IconSvg,
  size = DEFAULT_ICON_SIZE,
  color = 'default',
  accessibilityLabel,
  style,
  testID
}) => {
  const theme = (0, _index.useTheme)();
  const isDecorative = !accessibilityLabel;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: style,
    testID: testID,
    accessible: !isDecorative,
    accessibilityRole: isDecorative ? undefined : 'image',
    accessibilityLabel: accessibilityLabel,
    importantForAccessibility: isDecorative ? 'no-hide-descendants' : 'auto',
    accessibilityElementsHidden: isDecorative,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(IconSvg, {
      color: resolveIconColor(theme, color),
      size: size,
      width: size,
      height: size
    })
  });
};
exports.Icon = Icon;
//# sourceMappingURL=Icon.js.map