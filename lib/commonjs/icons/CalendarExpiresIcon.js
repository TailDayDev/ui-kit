"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarExpiresIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** Glyph viewBox of the app icon: 18 × 20 (not square). */
const VIEWBOX_WIDTH = 18;
const VIEWBOX_HEIGHT = 20;

/**
 * Calendar with a cross (copied from the app `shared/icons/CalendarExpiresIcon`).
 * `size` sets the height; the width keeps the 18:20 glyph ratio, as in the app.
 * Color comes from `color`.
 */
const CalendarExpiresIcon = ({
  color,
  size = VIEWBOX_HEIGHT,
  width,
  height
}) => {
  const resolvedHeight = height ?? size;
  const resolvedWidth = width ?? resolvedHeight * VIEWBOX_WIDTH / VIEWBOX_HEIGHT;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
    width: resolvedWidth,
    height: resolvedHeight,
    viewBox: "0 0 18 20",
    fill: "none",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: "M16 2H15V0H13V2H5V0H3V2H2C0.9 2 0 2.9 0 4V18C0 19.11 0.9 20 2 20H16C17.11 20 18 19.11 18 18V4C18 2.9 17.11 2 16 2ZM16 18H2V8H16V18ZM2 6V4H16V6H2ZM5.23 15.41L6.29 16.47L8.73 14.03L11.17 16.47L12.23 15.41L9.79 12.97L12.23 10.53L11.17 9.47L8.73 11.91L6.29 9.47L5.23 10.53L7.67 12.97L5.23 15.41Z",
      fill: color
    })
  });
};
exports.CalendarExpiresIcon = CalendarExpiresIcon;
//# sourceMappingURL=CalendarExpiresIcon.js.map