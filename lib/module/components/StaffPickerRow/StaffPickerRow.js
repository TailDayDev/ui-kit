"use strict";

import { StyleSheet, View } from 'react-native';
import { Pressable } from "../../primitives/Pressable/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { EmptyProfileImage } from "../EmptyProfileImage/index.js";
import { Radio } from "../Radio/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma StaffPickerRow: fixed row height 88.
const STAFF_PICKER_ROW_HEIGHT = 88;
// Figma StaffPickerRow › Radio: size=20 (inner dot 10).
const RADIO_SIZE = 20;
const RADIO_DOT_SIZE = 10;
const createStyles = theme => StyleSheet.create({
  row: {
    alignItems: 'center',
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.lg,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[3],
    height: STAFF_PICKER_ROW_HEIGHT,
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    paddingHorizontal: theme.space[4] - theme.stroke[1]
  },
  rowSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  },
  texts: {
    flex: 1,
    gap: theme.space[1]
  }
});
const splitName = name => {
  const [firstName, lastName] = name.trim().split(/\s+/);
  return [firstName, lastName];
};

/**
 * Staff member in a picker list (Figma `StaffPickerRow`): initials avatar,
 * name, position and a radio. The row is the radio for screen readers.
 */
export const StaffPickerRow = ({
  name,
  position,
  isSelected = false,
  onPress,
  disabled = false,
  imageUrl,
  renderImage,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const [firstName, lastName] = splitName(name);
  return /*#__PURE__*/_jsxs(Pressable, {
    testID: testID,
    accessibilityRole: "radio",
    accessibilityLabel: accessibilityLabel ?? name,
    accessibilityState: {
      checked: isSelected
    },
    disabled: disabled,
    onPress: onPress,
    style: [styles.row, isSelected ? styles.rowSelected : null, style],
    children: [/*#__PURE__*/_jsx(EmptyProfileImage, {
      firstName: firstName,
      lastName: lastName,
      imageUrl: imageUrl,
      renderImage: renderImage,
      size: "l"
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.texts,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "headline/bold",
        children: name
      }), position ? /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        color: "secondary",
        children: position
      }) : null]
    }), /*#__PURE__*/_jsx(Radio, {
      isActive: isSelected,
      size: RADIO_SIZE,
      dotSize: RADIO_DOT_SIZE,
      testID: testID ? `${testID}.radio` : undefined
    })]
  });
};
//# sourceMappingURL=StaffPickerRow.js.map