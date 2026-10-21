"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarOutlineIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** Outlined calendar (copied from the app `shared/icons/CalendarOutlineIcon`). Color comes from `color`. */
const CalendarOutlineIcon = ({
  color,
  size = 24,
  width,
  height
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 24 24",
  fill: "none",
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M7 6V2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6Z",
    fill: color
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M15 6V2C15 1.44772 15.4477 1 16 1C16.5523 1 17 1.44772 17 2V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6Z",
    fill: color
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M20 6C20 5.44772 19.5523 5 19 5H5C4.44772 5 4 5.44772 4 6V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V6ZM22 20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V20Z",
    fill: color
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M21 9C21.5523 9 22 9.44772 22 10C22 10.5523 21.5523 11 21 11H3C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H21Z",
    fill: color
  })]
});
exports.CalendarOutlineIcon = CalendarOutlineIcon;
//# sourceMappingURL=CalendarOutlineIcon.js.map