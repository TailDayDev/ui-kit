"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[2],
    justifyContent: 'space-between',
    minWidth: 0,
    overflow: 'hidden'
  },
  label: {
    flexShrink: 0
  },
  value: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0
  }
});

/** Closed-accordion summary row: label left, value (or placeholder) right. */
export const CloseSection = ({
  label,
  value,
  emptyLabel
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "headline/regular",
      style: styles.label,
      numberOfLines: 1,
      ellipsizeMode: "tail",
      children: label
    }), /*#__PURE__*/_jsx(Text, {
      variant: "headline/bold",
      color: value ? 'primary' : 'secondary',
      align: "right",
      style: styles.value,
      numberOfLines: 1,
      ellipsizeMode: "tail",
      children: value || emptyLabel
    })]
  });
};
//# sourceMappingURL=CloseSection.js.map