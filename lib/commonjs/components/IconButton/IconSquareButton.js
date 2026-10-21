"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconSquareButton = void 0;
var _index = require("../../theme/index.js");
var _IconControlButton = require("./IconControlButton.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Rounded-square icon control. Soft-gray fill (`bg.subtle`), `radius.sm` (8) corners. */
const IconSquareButton = ({
  size = _IconControlButton.DEFAULT_ICON_CONTROL_BUTTON_SIZE,
  ...props
}) => {
  const theme = (0, _index.useTheme)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconControlButton.IconControlButton, {
    ...props,
    borderRadius: theme.radius.sm,
    size: size
  });
};
exports.IconSquareButton = IconSquareButton;
//# sourceMappingURL=IconSquareButton.js.map