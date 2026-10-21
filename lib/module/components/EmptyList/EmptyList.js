"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** App top offset of the placeholder (off-scale). */
const TOP_OFFSET = 150;
const createStyles = theme => StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: TOP_OFFSET,
    gap: theme.space[4]
  }
});

/** "No results" placeholder for lists: an image above a grey message. */
export const EmptyList = ({
  message,
  illustration,
  style,
  textStyle,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    testID: testID,
    children: [illustration, /*#__PURE__*/_jsx(Text, {
      variant: "headline/medium",
      color: "secondary",
      style: textStyle,
      children: message
    })]
  });
};
//# sourceMappingURL=EmptyList.js.map