"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrowDropDownIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** App icon frame: 12×8. */
const DEFAULT_WIDTH = 12;
const DEFAULT_HEIGHT = 8;
const ASPECT_RATIO = DEFAULT_HEIGHT / DEFAULT_WIDTH;

/**
 * Thin down caret, 12×8 frame (copied from the app `shared/icons/ArrowDropDown`
 * without its built-in rotation; animate the wrapper instead). Color comes from
 * `color`; `size` sets the width and keeps the aspect ratio.
 */
const ArrowDropDownIcon = ({
  color,
  size,
  width,
  height
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
  width: width ?? size ?? DEFAULT_WIDTH,
  height: height ?? (size ? size * ASPECT_RATIO : DEFAULT_HEIGHT),
  viewBox: "0 0 12 8",
  fill: "none",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M1.4125 1.99679L5.29289 5.87718L6 6.58429L6.70711 5.87718L10.5875 1.99679L10.5883 1.99758L6 6.58587L1.41172 1.99758L1.4125 1.99679Z",
    stroke: color,
    strokeWidth: 2
  })
});
exports.ArrowDropDownIcon = ArrowDropDownIcon;
//# sourceMappingURL=ArrowDropDownIcon.js.map