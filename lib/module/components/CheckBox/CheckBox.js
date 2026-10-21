"use strict";

import { StyleSheet, TouchableOpacity } from 'react-native';
import { CheckIcon } from "../../icons/CheckIcon.js";
import { Icon } from "../../primitives/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
/** App `CheckBox` box size (off-scale: not a Figma size token). */
const BOX_SIZE = 16;
/** App `CheckBox` corner radius (off-scale: below `radius.sm`). */
const BOX_RADIUS = 4;
/** App `CheckBox` check mark size. */
const CHECK_ICON_SIZE = 12;
const createStyles = theme => StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: BOX_RADIUS,
    borderWidth: theme.stroke[1],
    height: BOX_SIZE,
    justifyContent: 'center',
    width: BOX_SIZE
  },
  boxActive: {
    backgroundColor: theme.colors.bg.accent,
    borderWidth: 0
  },
  boxDisabled: {
    opacity: theme.opacity.disabled
  }
});

/**
 * Checkbox control. Uses `TouchableOpacity` (default pressed opacity) to keep
 * the app's press feedback 1:1.
 */
export const CheckBox = ({
  isActive,
  handlePress,
  disabled = false,
  accessibilityLabel,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    onPress: handlePress,
    disabled: disabled,
    style: [styles.box, isActive && styles.boxActive, disabled && styles.boxDisabled],
    testID: testID,
    accessibilityRole: "checkbox",
    accessibilityLabel: accessibilityLabel,
    accessibilityState: {
      checked: isActive,
      disabled
    },
    children: isActive ? /*#__PURE__*/_jsx(Icon, {
      icon: CheckIcon,
      size: CHECK_ICON_SIZE,
      color: "text.inverse"
    }) : null
  });
};
//# sourceMappingURL=CheckBox.js.map