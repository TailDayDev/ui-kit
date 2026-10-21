"use strict";

import { Pressable, StyleSheet } from 'react-native';
import { IconArrowDown } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
// Figma ScrollToTodayButton: layer opacity 0.8.
const BUTTON_OPACITY = 0.8;
// Figma ScrollToTodayButton › arrow-down: 16×16.
const ARROW_ICON_SIZE = 16;
// App scroll-to-today button: 8pt extra touch area around the 32pt circle.
const BUTTON_HIT_SLOP = 8;
const createStyles = theme => StyleSheet.create({
  button: {
    alignItems: 'center',
    // Figma: HUG — the circle never stretches with its parent.
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.full,
    borderWidth: theme.stroke[1],
    justifyContent: 'center',
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    padding: theme.space[2] - theme.stroke[1]
  }
});

/**
 * Floating 32pt circle with a down arrow that scrolls the Today feed back to
 * today's tasks (Figma `ScrollToTodayButton`). White fill, pale border,
 * 80% opacity.
 */
export const ScrollToTodayButton = ({
  onPress,
  accessibilityLabel,
  style,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(Pressable, {
    testID: testID,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel,
    hitSlop: BUTTON_HIT_SLOP,
    onPress: onPress,
    style: ({
      pressed
    }) => [styles.button, {
      opacity: BUTTON_OPACITY * (pressed ? theme.opacity.pressed : 1)
    }, style],
    children: /*#__PURE__*/_jsx(Icon, {
      icon: IconArrowDown,
      size: ARROW_ICON_SIZE
    })
  });
};
//# sourceMappingURL=ScrollToTodayButton.js.map