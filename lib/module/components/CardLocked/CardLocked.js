"use strict";

import { StyleSheet, View } from 'react-native';
import { DEFAULT_ICON_SIZE } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { LockIcon } from "../../icons/LockIcon.js";
import { Card } from "../Card/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Padlock size in the app `CardLocked` (off-scale: smaller than the 24pt icon frame). */
const LOCK_ICON_SIZE = 20;
const createStyles = theme => StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border.default
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[3],
    justifyContent: 'space-between',
    width: '100%'
  },
  iconBlock: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    minWidth: DEFAULT_ICON_SIZE
  },
  textBlock: {
    flex: 1,
    gap: theme.space[3]
  }
});

/** Read-only card for a value that cannot be edited, with a padlock on the right. */
export const CardLocked = ({
  title,
  value,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(Card, {
    cardStyles: styles.card,
    style: styles.card,
    pointerEvents: "none",
    testID: testID,
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.content,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.textBlock,
        children: [/*#__PURE__*/_jsx(Text, {
          variant: "headline/bold",
          color: "secondary",
          numberOfLines: 1,
          ellipsizeMode: "tail",
          children: title
        }), /*#__PURE__*/_jsx(Text, {
          variant: "body/regular",
          color: "secondary",
          children: value
        })]
      }), /*#__PURE__*/_jsx(View, {
        style: styles.iconBlock,
        children: /*#__PURE__*/_jsx(LockIcon, {
          color: theme.palette.lightGray,
          size: LOCK_ICON_SIZE
        })
      })]
    })
  });
};
//# sourceMappingURL=CardLocked.js.map