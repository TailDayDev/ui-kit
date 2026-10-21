"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** Padlock (copied from the app `shared/icons/LockIcon`). Color comes from `color`. */
const LockIcon = ({
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
    d: "M7 10V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10H18C19.1046 10 20 10.8954 20 12V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V12C4 10.8954 4.89543 10 6 10H7ZM9 10H15V8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8V10ZM6 12V19H18V12H6Z",
    fill: color
  })
});
exports.LockIcon = LockIcon;
//# sourceMappingURL=LockIcon.js.map