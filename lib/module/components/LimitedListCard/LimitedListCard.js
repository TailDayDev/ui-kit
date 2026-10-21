"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { Card } from "../Card/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** App default number of visible items. */
const DEFAULT_MAX_VISIBLE = 3;
const createStyles = theme => StyleSheet.create({
  containerList: {
    gap: theme.space[1]
  },
  items: {
    gap: theme.space[2]
  },
  moreText: {
    marginTop: theme.space[1]
  }
});

/** Shadowed card listing the first `maxVisible` items and a "+N more" line. */
export const LimitedListCard = ({
  title,
  items,
  maxVisible = DEFAULT_MAX_VISIBLE,
  onPress,
  formatMoreLabel,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const visibleItems = items.slice(0, maxVisible);
  const remainingCount = items.length - visibleItems.length;
  return /*#__PURE__*/_jsx(Card, {
    title: title,
    withShadow: true,
    onPress: onPress,
    accessibilityLabel: title,
    testID: testID,
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.containerList,
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.items,
        children: visibleItems.map((item, index) =>
        /*#__PURE__*/
        // Items are plain strings that may repeat; position is the stable key.
        _jsx(Text, {
          variant: "body/regular",
          color: "primary",
          children: item
        }, index))
      }), remainingCount > 0 ? /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        color: "secondary",
        style: styles.moreText,
        children: formatMoreLabel(remainingCount)
      }) : null]
    })
  });
};
//# sourceMappingURL=LimitedListCard.js.map