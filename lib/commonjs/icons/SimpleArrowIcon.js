"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleArrowIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** Default frame of the app arrow (viewBox 7×11). */
const DEFAULT_WIDTH = 7;
const DEFAULT_HEIGHT = 11;
/**
 * Thin chevron used by calendar month arrows (copied from the app
 * `shared/icons/SimpleArrowIcon`). 7×11 unless `width`/`height` are set; `size`
 * is ignored because the glyph is not square. Color comes from `color`.
 */
const SimpleArrowIcon = ({
  direction = 'left',
  color,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
  width: width,
  height: height,
  viewBox: "0 0 7 11",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.G, {
    transform: direction === 'right' ? 'translate(7, 0) scale(-1, 1)' : undefined,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: "M6.84175 9.31667L3.02508 5.5L6.84175 1.675L5.66675 0.5L0.666748 5.5L5.66675 10.5L6.84175 9.31667Z",
      fill: color
    })
  })
});
exports.SimpleArrowIcon = SimpleArrowIcon;
//# sourceMappingURL=SimpleArrowIcon.js.map