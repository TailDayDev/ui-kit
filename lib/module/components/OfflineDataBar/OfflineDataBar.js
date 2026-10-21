"use strict";

import { StyleSheet, View } from 'react-native';
import { WifiOffIcon } from "../../icons/WifiOffIcon.js";
import { Text } from "../../primitives/Text/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** App band height. */
const BAR_HEIGHT = 40;
/** App icon size. */
const ICON_SIZE = 16;
/** App label line height, tighter than `caption/regular` (14). */
const LABEL_LINE_HEIGHT = 12;
const createStyles = theme => StyleSheet.create({
  bar: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    flexDirection: 'row',
    gap: theme.space[2],
    height: BAR_HEIGHT,
    paddingHorizontal: theme.space[4],
    width: '100%'
  },
  label: {
    lineHeight: LABEL_LINE_HEIGHT
  }
});

/** Full-width band telling the user the list shows data without a network. */
export const OfflineDataBar = ({
  label,
  style,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.bar, style],
    testID: testID,
    children: [/*#__PURE__*/_jsx(WifiOffIcon, {
      color: theme.colors.icon.default,
      size: ICON_SIZE
    }), /*#__PURE__*/_jsx(Text, {
      variant: "caption/regular",
      color: "secondary",
      style: styles.label,
      children: label
    })]
  });
};
//# sourceMappingURL=OfflineDataBar.js.map