"use strict";

import Svg, { Circle, Path } from 'react-native-svg';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Circled cross of a text field's clear control (copied from the app
 * `shared/icons/ClearInputIcon`, which hard-coded mediumGray). Color comes from `color`.
 */
export const ClearInputIcon = ({
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
    cx: "12",
    cy: "12",
    r: "10",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/_jsx(Path, {
    d: "M15 9L9 15M9 9L15 15",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  })]
});
//# sourceMappingURL=ClearInputIcon.js.map