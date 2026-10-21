"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingScreenIllustration = exports.LOADING_GRADIENT_TOP_COLOR = exports.LOADING_GRADIENT_BOTTOM_COLOR = void 0;
var _react = require("react");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _index = require("../../theme/index.js");
var _loadingScreenPaths = require("./loadingScreenPaths.js");
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/**
 * Illustration-only gradient stops of the startup wallpaper
 * (`LoadingScreen.svg`, `paint0_linear`). They are not in the Figma palette;
 * the middle stop is `palette.primary`.
 */
// eslint-disable-next-line no-restricted-syntax -- illustration color, not a token (see JSDoc)
const LOADING_GRADIENT_TOP_COLOR = exports.LOADING_GRADIENT_TOP_COLOR = '#780DD0';
// eslint-disable-next-line no-restricted-syntax -- illustration color, not a token (see JSDoc)
const LOADING_GRADIENT_BOTTOM_COLOR = exports.LOADING_GRADIENT_BOTTOM_COLOR = '#8E7AFF';

// Source artboard of LoadingScreen.svg.
const ARTBOARD_WIDTH = 430;
const ARTBOARD_HEIGHT = 932;
const GRADIENT_MID_OFFSET = 0.54;
// "y" letter outline mask region from the SVG export.
const Y_MASK = {
  x: 219.944,
  y: 405.116,
  width: 57,
  height: 67
};
// Green dot after the logo.
const DOT = {
  cx: 271.515,
  cy: 446.871,
  r: 7.69528
};

/**
 * Startup wallpaper: purple gradient, "TailDay" wordmark and leaves.
 * Stretched to fill the frame (`preserveAspectRatio="none"`), as in the app.
 */
const LoadingScreenIllustration = () => {
  const theme = (0, _index.useTheme)();
  const id = (0, _react.useId)().replace(/[^a-zA-Z0-9_-]/g, '');
  const gradientId = `loading-gradient-${id}`;
  const clipId = `loading-clip-${id}`;
  const maskId = `loading-mask-${id}`;
  const leafColor = theme.palette.secondary;
  const markColor = theme.palette.white;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
    width: "100%",
    height: "100%",
    viewBox: `0 0 ${ARTBOARD_WIDTH} ${ARTBOARD_HEIGHT}`,
    preserveAspectRatio: "none",
    fill: "none",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.Defs, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.LinearGradient, {
        id: gradientId,
        x1: ARTBOARD_WIDTH / 2,
        y1: 0,
        x2: ARTBOARD_WIDTH / 2,
        y2: ARTBOARD_HEIGHT,
        gradientUnits: "userSpaceOnUse",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
          stopColor: LOADING_GRADIENT_TOP_COLOR
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
          offset: GRADIENT_MID_OFFSET,
          stopColor: theme.palette.primary
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
          offset: 1,
          stopColor: LOADING_GRADIENT_BOTTOM_COLOR
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.ClipPath, {
        id: clipId,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
          width: ARTBOARD_WIDTH,
          height: ARTBOARD_HEIGHT
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.Mask, {
        id: maskId,
        maskUnits: "userSpaceOnUse",
        x: Y_MASK.x,
        y: Y_MASK.y,
        width: Y_MASK.width,
        height: Y_MASK.height,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
          x: Y_MASK.x,
          y: Y_MASK.y,
          width: Y_MASK.width,
          height: Y_MASK.height,
          fill: theme.palette.white
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
          d: _loadingScreenPaths.LETTER_Y_PATH,
          fill: theme.palette.black
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.G, {
      clipPath: `url(#${clipId})`,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
        width: ARTBOARD_WIDTH,
        height: ARTBOARD_HEIGHT,
        fill: `url(#${gradientId})`
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: _loadingScreenPaths.LEAF_LEFT_PATH,
        fill: leafColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: _loadingScreenPaths.LEAF_RIGHT_PATH,
        fill: leafColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: _loadingScreenPaths.HILL_PATH,
        fill: markColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: _loadingScreenPaths.LETTER_D_PATH,
        fill: markColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: _loadingScreenPaths.LETTER_A_PATH,
        fill: markColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: _loadingScreenPaths.LETTER_Y_PATH,
        fill: markColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: _loadingScreenPaths.LETTER_Y_OUTLINE_PATH,
        fill: theme.palette.primary,
        mask: `url(#${maskId})`
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
        d: _loadingScreenPaths.LETTER_T_PATH,
        fill: markColor
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Circle, {
        cx: DOT.cx,
        cy: DOT.cy,
        r: DOT.r,
        fill: leafColor
      })]
    })]
  });
};
exports.LoadingScreenIllustration = LoadingScreenIllustration;
//# sourceMappingURL=LoadingScreenIllustration.js.map