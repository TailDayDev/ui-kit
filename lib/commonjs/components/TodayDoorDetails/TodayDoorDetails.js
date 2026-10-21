"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayDoorDetails = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodayDoorDetails › Картинка места: 40×40 image.
const ICON_SIZE = 40;
const createStyles = theme => _reactNative.StyleSheet.create({
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
const TodayDoorDetails = ({
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
  const styles = (0, _index2.useThemedStyles)(createStyles);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    style: [styles.block, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.divider
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.body,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.placement,
        children: [icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.icon,
          children: icon
        }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          testID: titleTestID,
          variant: "body/bold",
          numberOfLines: 1,
          style: styles.title,
          children: title
        })]
      }), dates.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.dates,
        children: dates.map(line => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
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
exports.TodayDoorDetails = TodayDoorDetails;
//# sourceMappingURL=TodayDoorDetails.js.map