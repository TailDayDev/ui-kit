"use strict";

import { StyleSheet } from 'react-native';
import { IconCalendarDays } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Pressable } from "../../primitives/Pressable/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TaskSheetRow › Icon: 20×20 instance of the 24pt icon set.
const TASK_SHEET_ROW_ICON_SIZE = 20;
const createStyles = theme => StyleSheet.create({
  label: {
    flexShrink: 1
  },
  row: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.palette.lightGray,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    paddingHorizontal: theme.space[6] - theme.stroke[1],
    paddingVertical: theme.space[4] - theme.stroke[1]
  }
});

/**
 * Action row of the task sheet (Figma `TaskSheetRow`): label on the left,
 * icon on the right; the destructive variant paints only the icon red.
 */
export const TaskSheetRow = ({
  label,
  icon = IconCalendarDays,
  isDestructive = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(Pressable, {
    testID: testID,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel ?? label,
    disabled: disabled,
    onPress: onPress,
    style: [styles.row, style],
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "headline/medium",
      style: styles.label,
      children: label
    }), /*#__PURE__*/_jsx(Icon, {
      icon: icon,
      size: TASK_SHEET_ROW_ICON_SIZE,
      color: isDestructive ? 'text.error' : 'default'
    })]
  });
};
//# sourceMappingURL=TaskSheetRow.js.map