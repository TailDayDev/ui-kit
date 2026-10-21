import Svg, { Circle, Path } from 'react-native-svg';

import type { IconComponentProps } from '../primitives';

/**
 * Circled cross of a text field's clear control (copied from the app
 * `shared/icons/ClearInputIcon`, which hard-coded mediumGray). Color comes from `color`.
 */
export const ClearInputIcon = ({
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
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path
      d="M15 9L9 15M9 9L15 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);
