"use strict";

import { StyleSheet, View } from 'react-native';
import { IconTrash2 } from "../../icons/figma/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { TaskSheetRow } from "../TaskSheetRow/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  actions: {
    alignSelf: 'stretch',
    gap: theme.space[2]
  },
  container: {
    // Figma: 382pt rows centered in the 430pt sheet → 24pt on each side.
    paddingBottom: theme.space[5],
    paddingHorizontal: theme.space[6]
  },
  destructive: {
    alignSelf: 'stretch',
    gap: theme.space[2],
    paddingTop: theme.space[13]
  }
});
const renderRow = ({
  key,
  label,
  icon,
  onPress,
  isDestructive = false,
  disabled,
  testID
}) => /*#__PURE__*/_jsx(TaskSheetRow, {
  label: label,
  icon: icon ?? (isDestructive ? IconTrash2 : undefined),
  isDestructive: isDestructive,
  onPress: onPress,
  disabled: disabled,
  testID: testID
}, key);

/**
 * Body of the task sheet (Figma `TaskSheetContent`): `TaskSheetRow`s 8pt apart
 * and, when a row is destructive, a "Delete" row 52pt below them.
 */
export const TaskSheetContent = ({
  rows,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const actionRows = rows.filter(row => !row.isDestructive);
  const destructiveRows = rows.filter(row => row.isDestructive);
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.container, style],
    children: [actionRows.length > 0 ? /*#__PURE__*/_jsx(View, {
      style: styles.actions,
      children: actionRows.map(renderRow)
    }) : null, destructiveRows.length > 0 ? /*#__PURE__*/_jsx(View, {
      testID: testID ? `${testID}.destructive` : undefined,
      style: styles.destructive,
      children: destructiveRows.map(renderRow)
    }) : null]
  });
};
//# sourceMappingURL=TaskSheetContent.js.map