"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlusIcon = void 0;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** App icon frame for `PlusIcon` (viewBox 20×20). */
const PLUS_ICON_DEFAULT_SIZE = 20;

/** Plus sign (copied from the app `shared/icons/PlusIcon`). Color comes from `color`. */
const PlusIcon = ({
  color,
  size = PLUS_ICON_DEFAULT_SIZE,
  width,
  height
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.default, {
  width: width ?? size,
  height: height ?? size,
  viewBox: "0 0 20 20",
  fill: "none",
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
    d: "M15.8332 10.8332H10.8332V15.8332H9.1665V10.8332H4.1665V9.1665H9.1665V4.1665H10.8332V9.1665H15.8332V10.8332Z",
    fill: color
  })
});
exports.PlusIcon = PlusIcon;
//# sourceMappingURL=PlusIcon.js.map