"use strict";

import Svg, { Path } from 'react-native-svg';
import { jsx as _jsx } from "react/jsx-runtime";
/** Down chevron (copied from the app `shared/icons/ChevronDownIcon`). Color comes from `color`. */
export const ChevronDownIcon = ({
  color,
  size = 20,
  width,
  height
}) => /*#__PURE__*/_jsx(Svg, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 24 24",
  fill: "none",
  children: /*#__PURE__*/_jsx(Path, {
    d: "M7.41 8.58L12 13.17L16.59 8.58L18 10L12 16L6 10L7.41 8.58Z",
    fill: color
  })
});
//# sourceMappingURL=ChevronDownIcon.js.map