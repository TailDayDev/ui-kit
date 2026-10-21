import { Pressable as RNPressable } from 'react-native';

import { useTheme } from '../../theme';
import type { PressableProps } from './Pressable.types';

/**
 * `Pressable` with consistent feedback: pressed opacity, disabled dimming and
 * accessibility state derived from `disabled`/`loading`.
 */
export const Pressable = ({
  disabled = false,
  loading = false,
  isFeedbackDisabled = false,
  style,
  accessibilityRole = 'button',
  accessibilityState,
  ...pressableProps
}: PressableProps) => {
  const theme = useTheme();
  const isBlocked = disabled || loading;

  return (
    <RNPressable
      disabled={isBlocked}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        ...accessibilityState,
        disabled: isBlocked,
        busy: loading,
      }}
      style={({ pressed }) => [
        typeof style === 'function' ? style({ pressed }) : style,
        disabled && { opacity: theme.opacity.disabled },
        pressed &&
          !isBlocked &&
          !isFeedbackDisabled && {
            opacity: theme.opacity.pressed,
          },
      ]}
      {...pressableProps}
    />
  );
};
