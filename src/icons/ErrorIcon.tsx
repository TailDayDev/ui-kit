import Svg, { Defs, Mask, Path, Rect } from 'react-native-svg';

import type { IconComponentProps } from '../primitives';

/** Mask luminance: white keeps, black cuts out. Not rendered colors. */
const MASK_KEEP = 'white';
const MASK_CUT = 'black';

/**
 * Speech bubble with an exclamation mark (copied from the app
 * `shared/icons/ErrorIcon`). The app painted the mark white; here it is cut out
 * of the bubble so the icon has a single `color` and the mark shows the
 * background (identical on the white surfaces where it is used).
 */
export const ErrorIcon = ({
  color,
  size = 20,
  width,
  height,
}: IconComponentProps) => (
  <Svg
    width={width ?? size}
    height={height ?? size}
    viewBox="0 0 36 33"
    fill="none"
  >
    <Defs>
      <Mask id="error-icon-mask">
        <Rect width="36" height="33" fill={MASK_KEEP} />
        <Path
          d="M18 17.3334C17.5581 17.333 17.1345 17.1572 16.822 16.8448C16.5096 16.5323 16.3338 16.1086 16.3334 15.6667V7.33341C16.3334 6.89139 16.509 6.46746 16.8215 6.1549C17.1341 5.84234 17.558 5.66675 18 5.66675C18.4421 5.66675 18.866 5.84234 19.1786 6.1549C19.4911 6.46746 19.6667 6.89139 19.6667 7.33341V15.6667C19.6663 16.1086 19.4905 16.5323 19.1781 16.8448C18.8656 17.1572 18.4419 17.333 18 17.3334Z"
          fill={MASK_CUT}
        />
        <Path
          d="M18 22.3333C18.9205 22.3333 19.6667 21.5871 19.6667 20.6667C19.6667 19.7462 18.9205 19 18 19C17.0796 19 16.3334 19.7462 16.3334 20.6667C16.3334 21.5871 17.0796 22.3333 18 22.3333Z"
          fill={MASK_CUT}
        />
      </Mask>
    </Defs>
    <Path
      d="M33 0.501465H3.00004C2.22678 0.502404 1.48546 0.809996 0.938684 1.35677C0.391906 1.90355 0.0843135 2.64487 0.083374 3.41813V25.0848C0.0843135 25.8581 0.391906 26.5994 0.938684 27.1462C1.48546 27.6929 2.22678 28.0005 3.00004 28.0015H11.3969C11.4939 28.0017 11.5878 28.036 11.6622 28.0983L16.1316 31.8223C16.6561 32.2592 17.3173 32.4985 18 32.4985C18.6828 32.4985 19.3439 32.2592 19.8685 31.8223L24.3379 28.0975C24.4126 28.0357 24.5063 28.0018 24.6032 28.0015H33C33.7733 28.0005 34.5146 27.6929 35.0614 27.1462C35.6082 26.5994 35.9158 25.8581 35.9167 25.0848V3.41813C35.9158 2.64487 35.6082 1.90355 35.0614 1.35677C34.5146 0.809996 33.7733 0.502404 33 0.501465Z"
      fill={color}
      mask="url(#error-icon-mask)"
    />
  </Svg>
);
