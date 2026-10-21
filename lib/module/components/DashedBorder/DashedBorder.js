"use strict";

import { StyleSheet, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useTheme } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Defaults copied from the app `shared/ui/DashedBorder`; no Figma token yet.
const DEFAULT_DASH_LENGTH = 8;
const DEFAULT_GAP_LENGTH = 5;
/** off-scale: hairline-plus stroke, not in Figma Stroke (1 / 2 / 4). */
const DEFAULT_STROKE_WIDTH = 1.5;
const HALF = 2;

/** Fixed-size box with a dashed SVG outline; children are centered inside. */
export const DashedBorder = ({
  width,
  height,
  dashLength = DEFAULT_DASH_LENGTH,
  gapLength = DEFAULT_GAP_LENGTH,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  color,
  borderRadius,
  style,
  children
}) => {
  const theme = useTheme();
  const resolvedColor = color ?? theme.palette.lightGray;
  const resolvedRadius = borderRadius ?? theme.radius.sm;
  const offset = strokeWidth / HALF;
  return /*#__PURE__*/_jsxs(View, {
    style: {
      width,
      height,
      borderRadius: resolvedRadius
    },
    children: [/*#__PURE__*/_jsx(Svg, {
      width: width,
      height: height,
      style: StyleSheet.absoluteFill,
      children: /*#__PURE__*/_jsx(Rect, {
        x: offset,
        y: offset,
        width: width - strokeWidth,
        height: height - strokeWidth,
        rx: resolvedRadius,
        ry: resolvedRadius,
        stroke: resolvedColor,
        strokeWidth: strokeWidth,
        strokeDasharray: [dashLength, gapLength],
        fill: "none"
      })
    }), /*#__PURE__*/_jsx(View, {
      style: [styles.content, {
        borderRadius: resolvedRadius
      }, style],
      children: children
    })]
  });
};
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});
//# sourceMappingURL=DashedBorder.js.map