"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  childrenContainer: {
    alignItems: 'center',
    flexShrink: 0,
    justifyContent: 'center'
  },
  shrinkable: {
    flexShrink: 1
  },
  infoContainer: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    gap: theme.space[1],
    paddingRight: theme.space[4]
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    paddingVertical: theme.space[2],
    width: '100%'
  }
});

/** Settings row: title and caption on the left, a control on the right. */
export const InfoRow = ({
  children,
  title,
  description
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.row,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.infoContainer,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "headline/regular",
        style: styles.shrinkable,
        children: title
      }), description ? /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        color: "secondary",
        style: styles.shrinkable,
        children: description
      }) : null]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.childrenContainer,
      children: children
    })]
  });
};
//# sourceMappingURL=InfoRow.js.map