"use strict";

import { Pressable as RNPressable } from 'react-native';
import { useTheme } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
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
}) => {
  const theme = useTheme();
  const isBlocked = disabled || loading;
  return /*#__PURE__*/_jsx(RNPressable, {
    disabled: isBlocked,
    accessibilityRole: accessibilityRole,
    accessibilityState: {
      ...accessibilityState,
      disabled: isBlocked,
      busy: loading
    },
    style: ({
      pressed
    }) => [typeof style === 'function' ? style({
      pressed
    }) : style, disabled && {
      opacity: theme.opacity.disabled
    }, pressed && !isBlocked && !isFeedbackDisabled && {
      opacity: theme.opacity.pressed
    }],
    ...pressableProps
  });
};
//# sourceMappingURL=Pressable.js.map