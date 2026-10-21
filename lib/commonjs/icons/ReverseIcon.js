"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReverseIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** Circular "repeat" arrow, mirrored (copied from the app `shared/icons/ReverseIcon`). Color comes from `color`. */
const ReverseIcon = ({
  color,
  size = 24,
  width,
  height
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 24 24",
  fill: "none",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M12 4C9.79 4 7.79 4.9 6.34 6.34L4 4V10H10L7.76 7.76C8.85 6.68 10.35 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.94 18 6.42 15.71 6.05 12.75H4.03C4.4 16.82 7.82 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z",
    fill: color,
    transform: "translate(24 0) scale(-1 1)"
  })
});
exports.ReverseIcon = ReverseIcon;
//# sourceMappingURL=ReverseIcon.js.map