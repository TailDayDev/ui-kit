"use strict";

import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { StaffPickerRow } from "../StaffPickerRow/index.js";
import { PickerNoneRow } from "../PickerNoneRow/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  container: {
    paddingBottom: theme.space[6],
    paddingHorizontal: theme.space[6],
    paddingTop: theme.space[2]
  },
  list: {
    gap: theme.space[2]
  }
});

/**
 * Body of the "choose staff" modal (Figma `TodayManualStaffPickerContent`).
 * The parent owns the (draft) selection; the modal and its footer stay outside.
 */
export const TodayManualStaffPickerContent = ({
  staff,
  selectedId,
  onSelect,
  noneLabel,
  accessibilityLabel,
  noneTestID,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(View, {
    testID: testID,
    style: [styles.container, style],
    children: /*#__PURE__*/_jsxs(View, {
      accessibilityRole: "radiogroup",
      accessibilityLabel: accessibilityLabel,
      style: styles.list,
      children: [/*#__PURE__*/_jsx(PickerNoneRow, {
        label: noneLabel,
        isSelected: selectedId === null,
        onPress: () => onSelect(null),
        testID: noneTestID
      }), staff.map(member => /*#__PURE__*/_jsx(StaffPickerRow, {
        name: member.name,
        position: member.position,
        imageUrl: member.imageUrl,
        renderImage: member.renderImage,
        isSelected: member.id === selectedId,
        onPress: () => onSelect(member.id),
        testID: member.testID
      }, member.id))]
    })
  });
};
//# sourceMappingURL=TodayManualStaffPickerContent.js.map