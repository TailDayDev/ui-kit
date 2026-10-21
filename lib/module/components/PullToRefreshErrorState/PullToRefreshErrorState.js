"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Figma `PullToRefreshErrorState` frame width. */
const MAX_WIDTH = 382;
/** App title metrics, tighter than `title/medium` (Figma export values). */
const TITLE_LINE_HEIGHT = 24;
const TITLE_LETTER_SPACING = -0.32;
/** App description metrics, tighter than `body/regular` (Figma export values). */
const DESCRIPTION_LINE_HEIGHT = 17;
const DESCRIPTION_LETTER_SPACING = -0.154;
const createStyles = theme => StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    gap: theme.space[4],
    justifyContent: 'center',
    maxWidth: MAX_WIDTH,
    paddingHorizontal: theme.space[10],
    width: '100%'
  },
  texts: {
    alignItems: 'center',
    gap: theme.space[2],
    width: '100%'
  },
  title: {
    letterSpacing: TITLE_LETTER_SPACING,
    lineHeight: TITLE_LINE_HEIGHT,
    width: '100%'
  },
  description: {
    letterSpacing: DESCRIPTION_LETTER_SPACING,
    lineHeight: DESCRIPTION_LINE_HEIGHT,
    width: '100%'
  }
});

/** Load-error message shown inside a pull-to-refresh list. Figma: `PullToRefreshErrorState`. */
export const PullToRefreshErrorState = ({
  title,
  description,
  illustration,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    testID: testID,
    children: [illustration, /*#__PURE__*/_jsxs(View, {
      style: styles.texts,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "title/medium",
        color: "primary",
        align: "center",
        style: styles.title,
        children: title
      }), /*#__PURE__*/_jsx(Text, {
        variant: "body/regular",
        color: "secondary",
        align: "center",
        style: styles.description,
        children: description
      })]
    })]
  });
};
//# sourceMappingURL=PullToRefreshErrorState.js.map