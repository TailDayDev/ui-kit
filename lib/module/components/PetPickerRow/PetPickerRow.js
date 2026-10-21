"use strict";

import { StyleSheet, View } from 'react-native';
import { Pressable } from "../../primitives/Pressable/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { PetOwnerAvatar } from "../PetOwnerAvatar/index.js";
import { Radio } from "../Radio/index.js";
import { TodayPlacementList } from "../TodayPlacementList/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma PetPickerRow › Photo: PetOwnerAvatar 64.
const AVATAR_SIZE = 64;
// Figma PetPickerRow › Radio: size=20 (inner dot 10, as in StaffPickerRow).
const RADIO_SIZE = 20;
const RADIO_DOT_SIZE = 10;
const createStyles = theme => StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.lg,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[3],
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    paddingHorizontal: theme.space[4] - theme.stroke[1],
    paddingVertical: theme.space[3] - theme.stroke[1]
  },
  rowSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  },
  texts: {
    alignSelf: 'stretch',
    flex: 1,
    gap: theme.space[0.5],
    justifyContent: 'center',
    minWidth: 0
  }
});

/**
 * Pet in a picker list (Figma `PetPickerRow`): photo with the owner badge,
 * name, meta, placements and a radio. The row is the radio for screen readers.
 */
export const PetPickerRow = ({
  name,
  meta,
  placements = [],
  avatar,
  isSelected = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const [firstPlacement, secondPlacement] = placements;
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
    children: [/*#__PURE__*/_jsx(PetOwnerAvatar, {
      ...avatar,
      size: AVATAR_SIZE,
      testID: testID ? `${testID}.avatar` : undefined
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.texts,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "headline/bold",
        numberOfLines: 1,
        children: name
      }), meta ? /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        color: "secondary",
        numberOfLines: 1,
        children: meta
      }) : null, firstPlacement ? /*#__PURE__*/_jsx(TodayPlacementList, {
        itemsCount: secondPlacement ? 2 : 1,
        title: firstPlacement.title,
        image: firstPlacement.image,
        secondTitle: secondPlacement?.title,
        secondImage: secondPlacement?.image,
        testID: testID ? `${testID}.placements` : undefined
      }) : null]
    }), /*#__PURE__*/_jsx(Radio, {
      isActive: isSelected,
      size: RADIO_SIZE,
      dotSize: RADIO_DOT_SIZE,
      testID: testID ? `${testID}.radio` : undefined
    })]
  });
};
//# sourceMappingURL=PetPickerRow.js.map