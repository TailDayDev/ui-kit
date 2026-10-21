"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** Check mark (copied from the app `shared/icons/CheckIcon`). Color comes from `color`. */
const CheckIcon = ({
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
    d: "M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z",
    fill: color
  })
});
exports.CheckIcon = CheckIcon;
//# sourceMappingURL=CheckIcon.js.map