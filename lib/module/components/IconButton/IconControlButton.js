"use strict";

import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
/** App `DEFAULT_ICON_CONTROL_BUTTON_SIZE` (Figma IconRoundButton size=40). */
export const DEFAULT_ICON_CONTROL_BUTTON_SIZE = 40;

// off-scale: the app icon buttons dim to 0.6 and press to 0.9, not the kit
// `opacity.disabled` (0.45) / `opacity.pressed` (0.85). Kept for pixel parity.
const ICON_BUTTON_DISABLED_OPACITY = 0.6;
const ICON_BUTTON_PRESSED_OPACITY = 0.9;
const ICON_BUTTON_IDLE_OPACITY = 1;
/**
 * Shared pressable shell for the icon buttons. Shape comes from the public
 * wrappers, not a type prop. Not exported from the kit.
 *
 * Uses React Native `Pressable` rather than the kit primitive because the kit
 * primitive's opacities (0.45 / 0.85) would change the shipped look.
 */
export const IconControlButton = ({
  accessibilityLabel,
  borderRadius,
  disabled = false,
  loading = false,
  icon,
  onPress,
  size = DEFAULT_ICON_CONTROL_BUTTON_SIZE,
  style,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const isBlocked = disabled || loading;
  return /*#__PURE__*/_jsx(Pressable, {
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: "button",
    accessibilityState: {
      disabled: isBlocked,
      busy: loading
    },
    disabled: isBlocked,
    onPress: onPress,
    testID: testID,
    style: ({
      pressed
    }) => [styles.container, {
      borderRadius,
      height: size,
      width: size
    }, {
      opacity: disabled ? ICON_BUTTON_DISABLED_OPACITY : pressed ? ICON_BUTTON_PRESSED_OPACITY : ICON_BUTTON_IDLE_OPACITY
    }, style],
    children: /*#__PURE__*/_jsx(View, {
      pointerEvents: "none",
      children: loading ? /*#__PURE__*/_jsx(ActivityIndicator, {
        size: "small",
        color: theme.colors.icon.default
      }) : icon
    })
  });
};
const createStyles = theme => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    justifyContent: 'center'
  }
});
//# sourceMappingURL=IconControlButton.js.map