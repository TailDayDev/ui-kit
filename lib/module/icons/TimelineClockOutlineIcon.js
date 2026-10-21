"use strict";

import Svg, { Circle, Path } from 'react-native-svg';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Outlined clock (copied from the app `shared/icons/TimelineClockOutlineIcon`). Color comes from `color`. */
export const TimelineClockOutlineIcon = ({
  color,
  size = 24,
  width,
  height
}) => /*#__PURE__*/_jsxs(Svg, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 24 24",
  fill: "none",
  children: [/*#__PURE__*/_jsx(Circle, {
    cx: 12,
    cy: 12,
    r: 9,
    stroke: color,
    strokeWidth: 2
  }), /*#__PURE__*/_jsx(Path, {
    d: "M12 7.5V12H16.5",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
});
//# sourceMappingURL=TimelineClockOutlineIcon.js.map