"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/**
 * Funnel (copied from the app `shared/icons/FilterIcon`). Color comes from `color`.
 * The app default frame was 16×18 with a 24×24 viewBox; the kit uses `size` (24)
 * like every other icon. `FilterTrigger` renders it at 24×24, as the app does.
 */
const FilterIcon = ({
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
    d: "M15.0001 19.88C15.0401 20.18 14.9401 20.5 14.7101 20.71C14.3201 21.1 13.6901 21.1 13.3001 20.71L9.2901 16.7C9.0601 16.47 8.9601 16.16 9.0001 15.87V10.75L4.2101 4.62C3.8701 4.19 3.9501 3.56 4.3801 3.22C4.5701 3.08 4.7801 3 5.0001 3H19.0001C19.2201 3 19.4301 3.08 19.6201 3.22C20.0501 3.56 20.1301 4.19 19.7901 4.62L15.0001 10.75V19.88ZM7.0401 5L11.0001 10.06V15.58L13.0001 17.58V10.05L16.9601 5H7.0401Z",
    fill: color
  })
});
exports.FilterIcon = FilterIcon;
//# sourceMappingURL=FilterIcon.js.map