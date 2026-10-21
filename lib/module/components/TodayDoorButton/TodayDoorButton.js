"use strict";

import { Pressable, StyleSheet } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const IDLE_OPACITY = 1;
const createStyles = theme => StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    height: theme.space[12],
    justifyContent: 'center',
    paddingHorizontal: theme.space[8],
    paddingVertical: theme.space[4]
  }
});

/**
 * Footer action of a Today card that works with a booking: check in, check
 * out, move (Figma `TodayDoorButton`). Soft-gray 48pt bar, radius 8,
 * centered `headline/medium` label.
 */
export const TodayDoorButton = ({
  label,
  onPress,
  isDisabled = false,
  accessibilityLabel,
  style,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(Pressable, {
    testID: testID,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityState: {
      disabled: isDisabled
    },
    disabled: isDisabled,
    onPress: onPress,
    style: ({
      pressed
    }) => [styles.button, {
      opacity: isDisabled ? theme.opacity.disabled : pressed ? theme.opacity.pressed : IDLE_OPACITY
    }, style],
    children: /*#__PURE__*/_jsx(Text, {
      variant: "headline/medium",
      align: "center",
      numberOfLines: 1,
      children: label
    })
  });
};
//# sourceMappingURL=TodayDoorButton.js.map