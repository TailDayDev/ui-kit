"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChevronDownIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** Down chevron (copied from the app `shared/icons/ChevronDownIcon`). Color comes from `color`. */
const ChevronDownIcon = ({
  color,
  size = 20,
  width,
  height
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 24 24",
  fill: "none",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M7.41 8.58L12 13.17L16.59 8.58L18 10L12 16L6 10L7.41 8.58Z",
    fill: color
  })
});
exports.ChevronDownIcon = ChevronDownIcon;
//# sourceMappingURL=ChevronDownIcon.js.map