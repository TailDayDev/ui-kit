"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconRoundButton = void 0;
var _IconControlButton = require("./IconControlButton.js");
var _jsxRuntime = require("react/jsx-runtime");
const HALF = 2;

/** Circular icon control. Soft-gray fill (`bg.subtle`), diameter from `size`. */
const IconRoundButton = ({
  size = _IconControlButton.DEFAULT_ICON_CONTROL_BUTTON_SIZE,
  ...props
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconControlButton.IconControlButton, {
  ...props,
  borderRadius: size / HALF,
  size: size
});
exports.IconRoundButton = IconRoundButton;
//# sourceMappingURL=IconRoundButton.js.map