import { useId } from 'react';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

import { useTheme } from '../../theme';
import {
  HILL_PATH,
  LEAF_LEFT_PATH,
  LEAF_RIGHT_PATH,
  LETTER_A_PATH,
  LETTER_D_PATH,
  LETTER_T_PATH,
  LETTER_Y_OUTLINE_PATH,
  LETTER_Y_PATH,
} from './loadingScreenPaths';

/**
 * Illustration-only gradient stops of the startup wallpaper
 * (`LoadingScreen.svg`, `paint0_linear`). They are not in the Figma palette;
 * the middle stop is `palette.primary`.
 */
// eslint-disable-next-line no-restricted-syntax -- illustration color, not a token (see JSDoc)
export const LOADING_GRADIENT_TOP_COLOR = '#780DD0';
// eslint-disable-next-line no-restricted-syntax -- illustration color, not a token (see JSDoc)
export const LOADING_GRADIENT_BOTTOM_COLOR = '#8E7AFF';

// Source artboard of LoadingScreen.svg.
const ARTBOARD_WIDTH = 430;
const ARTBOARD_HEIGHT = 932;
const GRADIENT_MID_OFFSET = 0.54;
// "y" letter outline mask region from the SVG export.
const Y_MASK = { x: 219.944, y: 405.116, width: 57, height: 67 } as const;
// Green dot after the logo.
const DOT = { cx: 271.515, cy: 446.871, r: 7.69528 } as const;

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

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${ARTBOARD_WIDTH} ${ARTBOARD_HEIGHT}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <Defs>
        <LinearGradient
          id={gradientId}
          x1={ARTBOARD_WIDTH / 2}
          y1={0}
          x2={ARTBOARD_WIDTH / 2}
          y2={ARTBOARD_HEIGHT}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={LOADING_GRADIENT_TOP_COLOR} />
          <Stop
            offset={GRADIENT_MID_OFFSET}
            stopColor={theme.palette.primary}
          />
          <Stop offset={1} stopColor={LOADING_GRADIENT_BOTTOM_COLOR} />
        </LinearGradient>
        <ClipPath id={clipId}>
          <Rect width={ARTBOARD_WIDTH} height={ARTBOARD_HEIGHT} />
        </ClipPath>
        <Mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x={Y_MASK.x}
          y={Y_MASK.y}
          width={Y_MASK.width}
          height={Y_MASK.height}
        >
          <Rect
            x={Y_MASK.x}
            y={Y_MASK.y}
            width={Y_MASK.width}
            height={Y_MASK.height}
            fill={theme.palette.white}
          />
          <Path d={LETTER_Y_PATH} fill={theme.palette.black} />
        </Mask>
      </Defs>
      <G clipPath={`url(#${clipId})`}>
        <Rect
          width={ARTBOARD_WIDTH}
          height={ARTBOARD_HEIGHT}
          fill={`url(#${gradientId})`}
        />
        <Path d={LEAF_LEFT_PATH} fill={leafColor} />
        <Path d={LEAF_RIGHT_PATH} fill={leafColor} />
        <Path d={HILL_PATH} fill={markColor} />
        <Path d={LETTER_D_PATH} fill={markColor} />
        <Path d={LETTER_A_PATH} fill={markColor} />
        <Path d={LETTER_Y_PATH} fill={markColor} />
        <Path
          d={LETTER_Y_OUTLINE_PATH}
          fill={theme.palette.primary}
          mask={`url(#${maskId})`}
        />
        <Path d={LETTER_T_PATH} fill={markColor} />
        <Circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill={leafColor} />
      </G>
    </Svg>
  );
};
