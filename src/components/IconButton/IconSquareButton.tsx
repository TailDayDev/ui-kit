import { useTheme } from '../../theme';
import {
  DEFAULT_ICON_CONTROL_BUTTON_SIZE,
  IconControlButton,
} from './IconControlButton';
import type { IconSquareButtonProps } from './IconButton.types';

/** Rounded-square icon control. Soft-gray fill (`bg.subtle`), `radius.sm` (8) corners. */
export const IconSquareButton = ({
  size = DEFAULT_ICON_CONTROL_BUTTON_SIZE,
  ...props
}: IconSquareButtonProps) => {
  const theme = useTheme();
  return (
    <IconControlButton {...props} borderRadius={theme.radius.sm} size={size} />
  );
};
