"use strict";

import Svg, { G, Path } from 'react-native-svg';
import { jsx as _jsx } from "react/jsx-runtime";
/** Default frame of the app arrow (viewBox 7×11). */
const DEFAULT_WIDTH = 7;
const DEFAULT_HEIGHT = 11;
/**
 * Thin chevron used by calendar month arrows (copied from the app
 * `shared/icons/SimpleArrowIcon`). 7×11 unless `width`/`height` are set; `size`
 * is ignored because the glyph is not square. Color comes from `color`.
 */
export const SimpleArrowIcon = ({
  direction = 'left',
  color,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
}) => /*#__PURE__*/_jsx(Svg, {
  width: width,
  height: height,
  viewBox: "0 0 7 11",
  children: /*#__PURE__*/_jsx(G, {
    transform: direction === 'right' ? 'translate(7, 0) scale(-1, 1)' : undefined,
    children: /*#__PURE__*/_jsx(Path, {
      d: "M6.84175 9.31667L3.02508 5.5L6.84175 1.675L5.66675 0.5L0.666748 5.5L5.66675 10.5L6.84175 9.31667Z",
      fill: color
    })
  })
});
//# sourceMappingURL=SimpleArrowIcon.js.map