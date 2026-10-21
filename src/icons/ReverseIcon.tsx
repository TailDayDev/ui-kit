import Svg, { Path } from 'react-native-svg';

import type { IconComponentProps } from '../primitives';

/** Circular "repeat" arrow, mirrored (copied from the app `shared/icons/ReverseIcon`). Color comes from `color`. */
export const ReverseIcon = ({
  color,
  size = 24,
  width,
  height,
}: IconComponentProps) => (
  <Svg
    width={width ?? size}
    height={height ?? size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M12 4C9.79 4 7.79 4.9 6.34 6.34L4 4V10H10L7.76 7.76C8.85 6.68 10.35 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.94 18 6.42 15.71 6.05 12.75H4.03C4.4 16.82 7.82 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z"
      fill={color}
      transform="translate(24 0) scale(-1 1)"
    />
  </Svg>
);
