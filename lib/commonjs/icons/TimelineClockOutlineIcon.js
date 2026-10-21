"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineClockOutlineIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** Outlined clock (copied from the app `shared/icons/TimelineClockOutlineIcon`). Color comes from `color`. */
const TimelineClockOutlineIcon = ({
  color,
  size = 24,
  width,
  height
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 24 24",
  fill: "none",
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Circle, {
    cx: 12,
    cy: 12,
    r: 9,
    stroke: color,
    strokeWidth: 2
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M12 7.5V12H16.5",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })]
});
exports.TimelineClockOutlineIcon = TimelineClockOutlineIcon;
//# sourceMappingURL=TimelineClockOutlineIcon.js.map