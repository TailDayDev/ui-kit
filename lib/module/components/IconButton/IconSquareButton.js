"use strict";

import { useTheme } from "../../theme/index.js";
import { DEFAULT_ICON_CONTROL_BUTTON_SIZE, IconControlButton } from "./IconControlButton.js";
import { jsx as _jsx } from "react/jsx-runtime";
/** Rounded-square icon control. Soft-gray fill (`bg.subtle`), `radius.sm` (8) corners. */
export const IconSquareButton = ({
  size = DEFAULT_ICON_CONTROL_BUTTON_SIZE,
  ...props
}) => {
  const theme = useTheme();
  return /*#__PURE__*/_jsx(IconControlButton, {
    ...props,
    borderRadius: theme.radius.sm,
    size: size
  });
};
//# sourceMappingURL=IconSquareButton.js.map