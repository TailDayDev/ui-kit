"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  tipsContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.successSoft,
    borderRadius: theme.radius.lg,
    flexDirection: 'row',
    gap: theme.space[3],
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[3],
    width: '100%'
  },
  tipsText: {
    flex: 1,
    flexShrink: 1,
    flexWrap: 'wrap'
  }
});

/** Green hint banner with a leading illustration. */
export const Tips = ({
  icon,
  text
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.tipsContainer,
    children: [icon, /*#__PURE__*/_jsx(Text, {
      variant: "caption/regular",
      style: styles.tipsText,
      children: text
    })]
  });
};
//# sourceMappingURL=Tips.js.map