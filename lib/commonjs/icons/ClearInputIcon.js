"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearInputIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/**
 * Circled cross of a text field's clear control (copied from the app
 * `shared/icons/ClearInputIcon`, which hard-coded mediumGray). Color comes from `color`.
 */
const ClearInputIcon = ({
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
    cx: "12",
    cy: "12",
    r: "10",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M15 9L9 15M9 9L15 15",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  })]
});
exports.ClearInputIcon = ClearInputIcon;
//# sourceMappingURL=ClearInputIcon.js.map