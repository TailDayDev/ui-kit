"use strict";

import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pressable } from "../../primitives/Pressable/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma Chip › Счётчик: minW 16.
const BADGE_MIN_WIDTH = 16;
const createStyles = theme => StyleSheet.create({
  chip: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[1],
    paddingHorizontal: theme.space[3],
    paddingVertical: theme.space[2]
  },
  chipSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  },
  chipUnselected: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default
  },
  badge: {
    alignItems: 'center',
    borderRadius: theme.radius.lg,
    justifyContent: 'center',
    minWidth: BADGE_MIN_WIDTH,
    paddingHorizontal: theme.space[1]
  },
  badgeSelected: {
    backgroundColor: theme.colors.bg.accent
  },
  badgeUnselected: {
    backgroundColor: theme.colors.bg.accentSoft
  }
});
const ChipComponent = ({
  name,
  count,
  hasBadge = true,
  isSelected = true,
  onPress,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const isBadgeVisible = hasBadge && count !== undefined;
  return /*#__PURE__*/_jsxs(Pressable, {
    onPress: onPress,
    isFeedbackDisabled: !onPress,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel,
    accessibilityState: {
      selected: isSelected
    },
    testID: testID,
    style: [styles.chip, isSelected ? styles.chipSelected : styles.chipUnselected, style],
    children: [/*#__PURE__*/_jsx(Text, {
      variant: isSelected ? 'caption/bold' : 'caption/medium',
      color: isSelected ? 'accent' : 'primary',
      numberOfLines: 1,
      children: name
    }), isBadgeVisible ? /*#__PURE__*/_jsx(View, {
      style: [styles.badge, isSelected ? styles.badgeSelected : styles.badgeUnselected],
      children: /*#__PURE__*/_jsx(Text, {
        variant: "caption/medium",
        color: isSelected ? 'inverse' : 'accent',
        align: "center",
        children: count
      })
    }) : null]
  });
};

/** Filter chip: name plus an optional count badge. Figma `Chip`. */
export const Chip = /*#__PURE__*/memo(ChipComponent);
//# sourceMappingURL=Chip.js.map