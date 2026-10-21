"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodayDoorDetails › Картинка места: 40×40 image.
const ICON_SIZE = 40;
const createStyles = theme => StyleSheet.create({
  block: {
    gap: theme.space[3],
    justifyContent: 'center',
    padding: theme.space[4]
  },
  body: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[3]
  },
  dates: {
    alignItems: 'flex-end',
    gap: theme.space[1],
    justifyContent: 'center'
  },
  divider: {
    alignSelf: 'stretch',
    backgroundColor: theme.colors.border.default,
    height: theme.stroke[1]
  },
  icon: {
    alignItems: 'center',
    height: ICON_SIZE,
    justifyContent: 'center',
    width: ICON_SIZE
  },
  placement: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: theme.space[3],
    minWidth: 0
  },
  title: {
    flex: 1
  }
});
/** Placement and booking dates under a divider (Figma `TodayDoorDetails`). */
export const TodayDoorDetails = ({
  actionType = 'CheckIn',
  isDaycare = false,
  title,
  checkInDate,
  checkOutDate,
  icon,
  style,
  testID,
  titleTestID
}) => {
  const styles = useThemedStyles(createStyles);
  const isCheckIn = actionType === 'CheckIn';
  const checkIn = {
    key: 'checkIn',
    value: checkInDate,
    color: isCheckIn ? 'primary' : 'secondary'
  };
  const checkOut = {
    key: 'checkOut',
    value: checkOutDate,
    color: isCheckIn ? 'secondary' : 'primary'
  };
  const dates = (isDaycare ? [isCheckIn ? {
    ...checkIn,
    color: 'primary'
  } : checkOut] : [checkIn, checkOut]).filter(line => Boolean(line.value));
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.block, style],
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.divider
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.body,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.placement,
        children: [icon ? /*#__PURE__*/_jsx(View, {
          style: styles.icon,
          children: icon
        }) : null, /*#__PURE__*/_jsx(Text, {
          testID: titleTestID,
          variant: "body/bold",
          numberOfLines: 1,
          style: styles.title,
          children: title
        })]
      }), dates.length > 0 ? /*#__PURE__*/_jsx(View, {
        style: styles.dates,
        children: dates.map(line => /*#__PURE__*/_jsx(Text, {
          testID: testID ? `${testID}.${line.key}` : undefined,
          variant: "body/regular",
          color: line.color,
          align: "right",
          children: line.value
        }, line.key))
      }) : null]
    })]
  });
};
//# sourceMappingURL=TodayDoorDetails.js.map