"use strict";

import { useId } from 'react';
import Svg, { Circle, ClipPath, Defs, G, LinearGradient, Mask, Path, Rect, Stop } from 'react-native-svg';
import { useTheme } from "../../theme/index.js";
import { HILL_PATH, LEAF_LEFT_PATH, LEAF_RIGHT_PATH, LETTER_A_PATH, LETTER_D_PATH, LETTER_T_PATH, LETTER_Y_OUTLINE_PATH, LETTER_Y_PATH } from "./loadingScreenPaths.js";

/**
 * Illustration-only gradient stops of the startup wallpaper
 * (`LoadingScreen.svg`, `paint0_linear`). They are not in the Figma palette;
 * the middle stop is `palette.primary`.
 */
// eslint-disable-next-line no-restricted-syntax -- illustration color, not a token (see JSDoc)
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LOADING_GRADIENT_TOP_COLOR = '#780DD0';
// eslint-disable-next-line no-restricted-syntax -- illustration color, not a token (see JSDoc)
export const LOADING_GRADIENT_BOTTOM_COLOR = '#8E7AFF';

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
export const LoadingScreenIllustration = () => {
  const theme = useTheme();
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const gradientId = `loading-gradient-${id}`;
  const clipId = `loading-clip-${id}`;
  const maskId = `loading-mask-${id}`;
  const leafColor = theme.palette.secondary;
  const markColor = theme.palette.white;
  return /*#__PURE__*/_jsxs(Svg, {
    width: "100%",
    height: "100%",
    viewBox: `0 0 ${ARTBOARD_WIDTH} ${ARTBOARD_HEIGHT}`,
    preserveAspectRatio: "none",
    fill: "none",
    children: [/*#__PURE__*/_jsxs(Defs, {
      children: [/*#__PURE__*/_jsxs(LinearGradient, {
        id: gradientId,
        x1: ARTBOARD_WIDTH / 2,
        y1: 0,
        x2: ARTBOARD_WIDTH / 2,
        y2: ARTBOARD_HEIGHT,
        gradientUnits: "userSpaceOnUse",
        children: [/*#__PURE__*/_jsx(Stop, {
          stopColor: LOADING_GRADIENT_TOP_COLOR
        }), /*#__PURE__*/_jsx(Stop, {
          offset: GRADIENT_MID_OFFSET,
          stopColor: theme.palette.primary
        }), /*#__PURE__*/_jsx(Stop, {
          offset: 1,
          stopColor: LOADING_GRADIENT_BOTTOM_COLOR
        })]
      }), /*#__PURE__*/_jsx(ClipPath, {
        id: clipId,
        children: /*#__PURE__*/_jsx(Rect, {
          width: ARTBOARD_WIDTH,
          height: ARTBOARD_HEIGHT
        })
      }), /*#__PURE__*/_jsxs(Mask, {
        id: maskId,
        maskUnits: "userSpaceOnUse",
        x: Y_MASK.x,
        y: Y_MASK.y,
        width: Y_MASK.width,
        height: Y_MASK.height,
        children: [/*#__PURE__*/_jsx(Rect, {
          x: Y_MASK.x,
          y: Y_MASK.y,
          width: Y_MASK.width,
          height: Y_MASK.height,
          fill: theme.palette.white
        }), /*#__PURE__*/_jsx(Path, {
          d: LETTER_Y_PATH,
          fill: theme.palette.black
        })]
      })]
    }), /*#__PURE__*/_jsxs(G, {
      clipPath: `url(#${clipId})`,
      children: [/*#__PURE__*/_jsx(Rect, {
        width: ARTBOARD_WIDTH,
        height: ARTBOARD_HEIGHT,
        fill: `url(#${gradientId})`
      }), /*#__PURE__*/_jsx(Path, {
        d: LEAF_LEFT_PATH,
        fill: leafColor
      }), /*#__PURE__*/_jsx(Path, {
        d: LEAF_RIGHT_PATH,
        fill: leafColor
      }), /*#__PURE__*/_jsx(Path, {
        d: HILL_PATH,
        fill: markColor
      }), /*#__PURE__*/_jsx(Path, {
        d: LETTER_D_PATH,
        fill: markColor
      }), /*#__PURE__*/_jsx(Path, {
        d: LETTER_A_PATH,
        fill: markColor
      }), /*#__PURE__*/_jsx(Path, {
        d: LETTER_Y_PATH,
        fill: markColor
      }), /*#__PURE__*/_jsx(Path, {
        d: LETTER_Y_OUTLINE_PATH,
        fill: theme.palette.primary,
        mask: `url(#${maskId})`
      }), /*#__PURE__*/_jsx(Path, {
        d: LETTER_T_PATH,
        fill: markColor
      }), /*#__PURE__*/_jsx(Circle, {
        cx: DOT.cx,
        cy: DOT.cy,
        r: DOT.r,
        fill: leafColor
      })]
    })]
  });
};
//# sourceMappingURL=LoadingScreenIllustration.js.map