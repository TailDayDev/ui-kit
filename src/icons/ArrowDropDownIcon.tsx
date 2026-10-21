import Svg, { Path } from 'react-native-svg';

import type { IconComponentProps } from '../primitives';

/** App icon frame: 12×8. */
const DEFAULT_WIDTH = 12;
const DEFAULT_HEIGHT = 8;
const ASPECT_RATIO = DEFAULT_HEIGHT / DEFAULT_WIDTH;

/**
 * Thin down caret, 12×8 frame (copied from the app `shared/icons/ArrowDropDown`
 * without its built-in rotation; animate the wrapper instead). Color comes from
 * `color`; `size` sets the width and keeps the aspect ratio.
 */
export const ArrowDropDownIcon = ({
  color,
  size,
  width,
  height,
}: IconComponentProps) => (
  <Svg
    width={width ?? size ?? DEFAULT_WIDTH}
    height={height ?? (size ? size * ASPECT_RATIO : DEFAULT_HEIGHT)}
    viewBox="0 0 12 8"
    fill="none"
  >
    <Path
      d="M1.4125 1.99679L5.29289 5.87718L6 6.58429L6.70711 5.87718L10.5875 1.99679L10.5883 1.99758L6 6.58587L1.41172 1.99758L1.4125 1.99679Z"
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);
