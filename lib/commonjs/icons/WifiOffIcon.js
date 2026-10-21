"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WifiOffIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** App stroke width of the 16pt glyph. */
const STROKE_WIDTH = 1.3;

/**
 * Crossed-out Wi-Fi, 16pt frame (copied from the inline icon in the app
 * `shared/ui/offline-data-bar`). Color comes from `color`.
 */
const WifiOffIcon = ({
  color,
  size = 16,
  width,
  height
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 16 16",
  fill: "none",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M1.5 1.5 14.5 14.5M6.12 3.13A9.7 9.7 0 0 1 8 2.95c2.59 0 4.95.98 6.73 2.59M3.04 5.07A9.82 9.82 0 0 0 1.27 6.4m3.26 2.02A5.3 5.3 0 0 1 8 7.17c.83 0 1.61.19 2.31.52m-4.04 3.48A2.35 2.35 0 0 1 8 10.5c.91 0 1.7.51 2.1 1.25M8 14.1h.01",
    stroke: color,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: STROKE_WIDTH
  })
});
exports.WifiOffIcon = WifiOffIcon;
//# sourceMappingURL=WifiOffIcon.js.map