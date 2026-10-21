"use strict";

import { DEFAULT_ICON_CONTROL_BUTTON_SIZE, IconControlButton } from "./IconControlButton.js";
import { jsx as _jsx } from "react/jsx-runtime";
const HALF = 2;

/** Circular icon control. Soft-gray fill (`bg.subtle`), diameter from `size`. */
export const IconRoundButton = ({
  size = DEFAULT_ICON_CONTROL_BUTTON_SIZE,
  ...props
}) => /*#__PURE__*/_jsx(IconControlButton, {
  ...props,
  borderRadius: size / HALF,
  size: size
});
//# sourceMappingURL=IconRoundButton.js.map