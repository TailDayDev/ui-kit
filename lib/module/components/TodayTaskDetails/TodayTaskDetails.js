"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodayTaskDetails › Иконка: 24×24 artwork.
const ICON_SIZE = 24;
const createStyles = theme => StyleSheet.create({
  block: {
    gap: theme.space[3],
    justifyContent: 'center',
    padding: theme.space[4]
  },
  divider: {
    alignSelf: 'stretch',
    backgroundColor: theme.colors.border.default,
    height: theme.stroke[1]
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: theme.space[3]
  },
  icon: {
    alignItems: 'center',
    height: ICON_SIZE,
    justifyContent: 'center',
    width: ICON_SIZE
  },
  task: {
    gap: theme.space[1]
  },
  title: {
    flex: 1
  }
});

/** Task details under a divider: icon, title, amount and note (Figma `TodayTaskDetails`). */
export const TodayTaskDetails = ({
  title,
  hasIcon = true,
  icon,
  hasTrailing = true,
  trailing,
  hasNote = true,
  note,
  style,
  testID,
  titleTestID
}) => {
  const styles = useThemedStyles(createStyles);
  const isIconVisible = hasIcon && Boolean(icon);
  const isTrailingVisible = hasTrailing && Boolean(trailing);
  const isNoteVisible = hasNote && Boolean(note);
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.block, style],
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.divider
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.task,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.header,
        children: [isIconVisible ? /*#__PURE__*/_jsx(View, {
          style: styles.icon,
          children: icon
        }) : null, /*#__PURE__*/_jsx(Text, {
          testID: titleTestID,
          variant: "body/bold",
          style: styles.title,
          children: title
        }), isTrailingVisible ? /*#__PURE__*/_jsx(Text, {
          variant: "body/regular",
          children: trailing
        }) : null]
      }), isNoteVisible ? /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        color: "secondary",
        children: note
      }) : null]
    })]
  });
};
//# sourceMappingURL=TodayTaskDetails.js.map