"use strict";

import { ScrollView, StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { TodayTaskCard } from "../TodayTaskCard/index.js";
import { TodayTaskHeader } from "../TodayTaskHeader/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  body: {
    backgroundColor: theme.colors.bg.screen,
    flex: 1,
    paddingTop: theme.space[2]
  },
  // Header stays put while the cards scroll (app MultiActionDetails).
  header: {
    paddingHorizontal: theme.space[4]
  },
  list: {
    flex: 1
  },
  // Figma body: gap 16 between all children, padding 8/16/24/16.
  listContent: {
    gap: theme.space[4],
    paddingBottom: theme.space[6],
    paddingHorizontal: theme.space[4],
    paddingTop: theme.space[4]
  }
});

/** Details modal body: shared task header and one card per pet (Figma `MultiActionDetailsContent`). */
export const MultiActionDetailsContent = ({
  header,
  items,
  nestedOverlay,
  style,
  testID,
  listTestID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.body, style],
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.header,
      children: /*#__PURE__*/_jsx(TodayTaskHeader, {
        ...header
      })
    }), /*#__PURE__*/_jsx(ScrollView, {
      testID: listTestID,
      showsVerticalScrollIndicator: false,
      style: styles.list,
      contentContainerStyle: styles.listContent,
      children: items.map(({
        id,
        ...card
      }) => /*#__PURE__*/_jsx(TodayTaskCard, {
        ...card,
        hasHeader: false
      }, id))
    }), nestedOverlay]
  });
};
//# sourceMappingURL=MultiActionDetailsContent.js.map