"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexShrink: 0
  }
});
const TONE_COLORS = {
  default: {
    title: 'primary',
    subtitle: 'secondary'
  },
  overdue: {
    title: 'error',
    subtitle: 'error'
  },
  completed: {
    title: 'primary',
    subtitle: 'secondary'
  }
};

/** Right-aligned task time and caption of a Today task card (Figma `TodayTaskTime`). */
export const TodayTaskTime = ({
  title,
  subtitle,
  hasSubtitle = true,
  tone = 'default',
  style,
  testID
}) => {
  const colors = TONE_COLORS[tone];
  const isSubtitleVisible = hasSubtitle && Boolean(subtitle);
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.container, style],
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "headline/bold",
      color: colors.title,
      align: "right",
      numberOfLines: 1,
      children: title
    }), isSubtitleVisible ? /*#__PURE__*/_jsx(Text, {
      variant: "smallCaption/regular",
      color: colors.subtitle,
      align: "right",
      numberOfLines: 1,
      children: subtitle
    }) : null]
  });
};
//# sourceMappingURL=TodayTaskTime.js.map