"use strict";

import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { areNormalizedIdsEqual } from "./areNormalizedIdsEqual.js";
import { jsx as _jsx } from "react/jsx-runtime";
/** React Native `TouchableOpacity` default, which the app `Tag` relies on. */
const TAG_ACTIVE_OPACITY = 0.2;
const createStyles = theme => StyleSheet.create({
  codeItem: {
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    maxWidth: 'auto',
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[3]
  },
  selectedItem: {
    backgroundColor: theme.colors.bg.accentSoft,
    // No `border.accent` role yet.
    borderColor: theme.palette.primary
  }
});

/** Selectable chip (single tag of a multi-select group). */
export const Tag = ({
  item,
  selectedItems,
  handlePress,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const id = item.id ?? '';
  const isSelected = selectedItems.some(selectedId => areNormalizedIdsEqual(selectedId, id));
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    activeOpacity: TAG_ACTIVE_OPACITY,
    style: [styles.codeItem, isSelected && styles.selectedItem],
    onPress: () => handlePress(id),
    testID: testID,
    accessibilityRole: "button",
    accessibilityState: {
      selected: isSelected
    },
    children: /*#__PURE__*/_jsx(Text, {
      variant: "body/medium",
      color: isSelected ? 'accent' : 'primary',
      children: item.title
    })
  });
};
//# sourceMappingURL=Tag.js.map