"use strict";

import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { PetPickerRow } from "../PetPickerRow/index.js";
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
 * Body of the "choose pet" modal (Figma `TodayManualPetPickerContent`).
 * The parent owns the (draft) selection; the modal and its footer stay outside.
 */
export const TodayManualPetPickerContent = ({
  pets,
  selectedId,
  onSelect,
  noneLabel,
  noneTestID,
  accessibilityLabel,
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
      }), pets.map(pet => /*#__PURE__*/_jsx(PetPickerRow, {
        name: pet.name,
        meta: pet.meta,
        placements: pet.placements,
        avatar: pet.avatar,
        isSelected: pet.id === selectedId,
        onPress: () => onSelect(pet.id),
        testID: pet.testID
      }, pet.id))]
    })
  });
};
//# sourceMappingURL=TodayManualPetPickerContent.js.map