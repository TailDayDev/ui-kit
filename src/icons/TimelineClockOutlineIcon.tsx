import Svg, { Circle, Path } from 'react-native-svg';

import type { IconComponentProps } from '../primitives';

/** Outlined clock (copied from the app `shared/icons/TimelineClockOutlineIcon`). Color comes from `color`. */
export const TimelineClockOutlineIcon = ({
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
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
    <Path
      d="M12 7.5V12H16.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
