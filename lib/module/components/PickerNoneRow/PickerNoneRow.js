"use strict";

import { StyleSheet } from 'react-native';
import { Pressable } from "../../primitives/Pressable/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { Radio } from "../Radio/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodayManualPetPickerContent › Без питомца / TodayManualStaffPickerContent › Без сотрудника: fixed height 88.
const NONE_ROW_HEIGHT = 88;
// Figma › Radio: size=20 (inner dot 10).
const RADIO_SIZE = 20;
const RADIO_DOT_SIZE = 10;
const createStyles = theme => StyleSheet.create({
  label: {
    flex: 1
  },
  row: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.lg,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[3],
    height: NONE_ROW_HEIGHT,
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    paddingHorizontal: theme.space[4] - theme.stroke[1]
  },
  rowSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  }
});

/**
 * "Nothing selected" option of a picker list (Figma frames `Без питомца` and
 * `Без сотрудника`): label and a radio; the whole row is the radio.
 */
export const PickerNoneRow = ({
  label,
  isSelected,
  onPress,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(Pressable, {
    testID: testID,
    accessibilityRole: "radio",
    accessibilityLabel: label,
    accessibilityState: {
      checked: isSelected
    },
    onPress: onPress,
    style: [styles.row, isSelected ? styles.rowSelected : null],
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "headline/medium",
      style: styles.label,
      children: label
    }), /*#__PURE__*/_jsx(Radio, {
      isActive: isSelected,
      size: RADIO_SIZE,
      dotSize: RADIO_DOT_SIZE,
      testID: testID ? `${testID}.radio` : undefined
    })]
  });
};
//# sourceMappingURL=PickerNoneRow.js.map