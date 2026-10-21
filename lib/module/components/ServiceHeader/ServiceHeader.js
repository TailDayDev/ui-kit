"use strict";

import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconSearch } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { IconRoundButton } from "../IconButton/index.js";
import { ServiceHeaderTrigger } from "../ServiceHeaderTrigger/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma ServiceHeader › Гостиница и поиск: 40pt row (FIXED in forceTitleOnly=true).
const HEADER_ROW_HEIGHT = 40;
// Figma ServiceHeader › Поиск: IconRoundButton size=40.
const SEARCH_BUTTON_SIZE = 40;
const createStyles = theme => StyleSheet.create({
  surface: {
    backgroundColor: theme.colors.bg.surface,
    boxShadow: [...theme.shadows.bar],
    gap: theme.space[2],
    paddingVertical: theme.space[2]
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: HEADER_ROW_HEIGHT,
    paddingHorizontal: theme.space[4]
  },
  rowTitleOnly: {
    height: HEADER_ROW_HEIGHT
  },
  title: {
    flexShrink: 1
  }
});
const ServiceHeaderComponent = props => {
  const {
    hasSearch = true,
    search,
    hasBottomContent = true,
    bottomContent,
    style,
    testID
  } = props;
  const styles = useThemedStyles(createStyles);
  const isSearchVisible = !props.forceTitleOnly && hasSearch && search;
  const isBottomContentVisible = hasBottomContent && Boolean(bottomContent);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.surface, style],
    testID: testID,
    children: [/*#__PURE__*/_jsxs(View, {
      style: [styles.row, props.forceTitleOnly && styles.rowTitleOnly],
      children: [props.forceTitleOnly ? /*#__PURE__*/_jsx(Text, {
        variant: "title/bold",
        accessibilityRole: "header",
        numberOfLines: 1,
        ellipsizeMode: "tail",
        style: styles.title,
        children: props.title
      }) : /*#__PURE__*/_jsx(ServiceHeaderTrigger, {
        ...props.trigger
      }), isSearchVisible ? /*#__PURE__*/_jsx(IconRoundButton, {
        icon: /*#__PURE__*/_jsx(Icon, {
          icon: IconSearch
        }),
        size: SEARCH_BUTTON_SIZE,
        onPress: search.onPress,
        accessibilityLabel: search.accessibilityLabel,
        testID: search.testID
      }) : null]
    }), isBottomContentVisible ? bottomContent : null]
  });
};

/**
 * Header of the hotel sections: hotel selector (or a plain title), search and
 * an optional filters row. Figma `ServiceHeader`.
 */
export const ServiceHeader = /*#__PURE__*/memo(ServiceHeaderComponent);
//# sourceMappingURL=ServiceHeader.js.map