"use strict";

import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { TodayTaskTime } from "../TodayTaskTime/index.js";
import { TodayTaskTypeBadge } from "../TodayTaskTypeBadge/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
  badge: {
    flexShrink: 1,
    minWidth: 0
  },
  header: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingBottom: 0,
    paddingLeft: theme.space[0.25],
    paddingRight: theme.space[4],
    paddingTop: theme.space[2]
  }
});

/** Today task card header: type badge left, time right (Figma `TodayTaskHeader`). */
export const TodayTaskHeader = ({
  badge,
  time,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.header, style],
    children: [/*#__PURE__*/_jsx(TodayTaskTypeBadge, {
      ...badge,
      style: [styles.badge, badge.style]
    }), time ? /*#__PURE__*/_jsx(TodayTaskTime, {
      ...time
    }) : null]
  });
};
//# sourceMappingURL=TodayTaskHeader.js.map