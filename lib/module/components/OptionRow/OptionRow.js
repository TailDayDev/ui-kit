"use strict";

import { StyleSheet } from 'react-native';
import { Pressable } from "../../primitives/Pressable/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  label: {
    flex: 1
  },
  row: {
    alignItems: 'center',
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[2],
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    paddingHorizontal: theme.space[4] - theme.stroke[1],
    paddingVertical: theme.space[3] - theme.stroke[1]
  },
  rowSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  }
});

/**
 * Single-choice text row (Figma `OptionRow`). The row is the radio: put several
 * in a list and keep the selection in the parent.
 */
export const OptionRow = ({
  label,
  isSelected = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(Pressable, {
    testID: testID,
    accessibilityRole: "radio",
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityState: {
      checked: isSelected
    },
    disabled: disabled,
    onPress: onPress,
    style: [styles.row, isSelected ? styles.rowSelected : null, style],
    children: /*#__PURE__*/_jsx(Text, {
      variant: "body/medium",
      color: isSelected ? 'accent' : 'primary',
      style: styles.label,
      children: label
    })
  });
};
//# sourceMappingURL=OptionRow.js.map