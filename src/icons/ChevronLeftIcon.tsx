import Svg, { Path } from 'react-native-svg';

import type { IconComponentProps } from '../primitives';

/** Back chevron (copied from the app `shared/icons/ChevronLeftIcon`). Color comes from `color`. */
export const ChevronLeftIcon = ({
  color,
  size = 20,
  width,
  height,
}: IconComponentProps) => (
  <Svg width={width ?? size} height={height ?? size} viewBox="0 0 24 24">
    <Path
      d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
      fill={color}
    />
  </Svg>
);
