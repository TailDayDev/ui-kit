"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    gap: theme.space[4],
    flex: 1
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: theme.space[1]
  }
});

/** Row with a leading illustration, a bold title and an optional caption. */
export const InfoCard = ({
  icon,
  title,
  description
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.card,
    children: [icon, /*#__PURE__*/_jsxs(View, {
      style: styles.rightContainer,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "body/bold",
        color: "primary",
        children: title
      }), description ? /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        color: "secondary",
        children: description
      }) : null]
    })]
  });
};
//# sourceMappingURL=InfoCard.js.map