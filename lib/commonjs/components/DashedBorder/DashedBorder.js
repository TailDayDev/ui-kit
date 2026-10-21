"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashedBorder = void 0;
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _index = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// Defaults copied from the app `shared/ui/DashedBorder`; no Figma token yet.
const DEFAULT_DASH_LENGTH = 8;
const DEFAULT_GAP_LENGTH = 5;
/** off-scale: hairline-plus stroke, not in Figma Stroke (1 / 2 / 4). */
const DEFAULT_STROKE_WIDTH = 1.5;
const HALF = 2;

/** Fixed-size box with a dashed SVG outline; children are centered inside. */
const DashedBorder = ({
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
  const theme = (0, _index.useTheme)();
  const resolvedColor = color ?? theme.palette.lightGray;
  const resolvedRadius = borderRadius ?? theme.radius.sm;
  const offset = strokeWidth / HALF;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: {
      width,
      height,
      borderRadius: resolvedRadius
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
      width: width,
      height: height,
      style: _reactNative.StyleSheet.absoluteFill,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.content, {
        borderRadius: resolvedRadius
      }, style],
      children: children
    })]
  });
};
exports.DashedBorder = DashedBorder;
const styles = _reactNative.StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});
//# sourceMappingURL=DashedBorder.js.map