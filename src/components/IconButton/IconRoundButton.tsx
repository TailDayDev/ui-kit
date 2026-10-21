import {
  DEFAULT_ICON_CONTROL_BUTTON_SIZE,
  IconControlButton,
} from './IconControlButton';
import type { IconRoundButtonProps } from './IconButton.types';

const HALF = 2;

/** Circular icon control. Soft-gray fill (`bg.subtle`), diameter from `size`. */
export const IconRoundButton = ({
  size = DEFAULT_ICON_CONTROL_BUTTON_SIZE,
  ...props
}: IconRoundButtonProps) => (
  <IconControlButton {...props} borderRadius={size / HALF} size={size} />
);
