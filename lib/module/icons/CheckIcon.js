"use strict";

import Svg, { Path } from 'react-native-svg';
import { jsx as _jsx } from "react/jsx-runtime";
/** Check mark (copied from the app `shared/icons/CheckIcon`). Color comes from `color`. */
export const CheckIcon = ({
  color,
  size = 24,
  width,
  height
}) => /*#__PURE__*/_jsx(Svg, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 24 24",
  fill: "none",
  children: /*#__PURE__*/_jsx(Path, {
    d: "M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z",
    fill: color
  })
});
//# sourceMappingURL=CheckIcon.js.map