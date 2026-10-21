"use strict";

import Svg, { Path } from 'react-native-svg';
import { jsx as _jsx } from "react/jsx-runtime";
/** App icon frame for `PlusIcon` (viewBox 20×20). */
const PLUS_ICON_DEFAULT_SIZE = 20;

/** Plus sign (copied from the app `shared/icons/PlusIcon`). Color comes from `color`. */
export const PlusIcon = ({
  color,
  size = PLUS_ICON_DEFAULT_SIZE,
  width,
  height
}) => /*#__PURE__*/_jsx(Svg, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 20 20",
  fill: "none",
  children: /*#__PURE__*/_jsx(Path, {
    d: "M15.8332 10.8332H10.8332V15.8332H9.1665V10.8332H4.1665V9.1665H9.1665V4.1665H10.8332V9.1665H15.8332V10.8332Z",
    fill: color
  })
});
//# sourceMappingURL=PlusIcon.js.map