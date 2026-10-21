"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayTaskHeader = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../TodayTaskTime/index.js");
var _index3 = require("../TodayTaskTypeBadge/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
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
const TodayTaskHeader = ({
  badge,
  time,
  style,
  testID
}) => {
  const styles = (0, _index.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    style: [styles.header, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.TodayTaskTypeBadge, {
      ...badge,
      style: [styles.badge, badge.style]
    }), time ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.TodayTaskTime, {
      ...time
    }) : null]
  });
};
exports.TodayTaskHeader = TodayTaskHeader;
//# sourceMappingURL=TodayTaskHeader.js.map