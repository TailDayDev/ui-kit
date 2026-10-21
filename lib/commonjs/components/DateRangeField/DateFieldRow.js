"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateFieldRow = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _CalendarExpiresIcon = require("../../icons/CalendarExpiresIcon.js");
var _CalendarOutlineIcon = require("../../icons/CalendarOutlineIcon.js");
var _ChevronDownSmallIcon = require("../../icons/ChevronDownSmallIcon.js");
var _index = require("../../theme/index.js");
var _index2 = require("../ActionListRow/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Icon and chevron container sizes from the app `DateFieldRow`. */
const LEADING_ICON_SIZE = 20;
const TRAILING_ICON_SIZE = 16;
const TRAILING_CONTAINER_SIZE = 28;
const DateFieldRow = exports.DateFieldRow = /*#__PURE__*/(0, _react.memo)(function DateFieldRow({
  affordanceTestID,
  accessibilityLabel,
  boundary,
  dateValue,
  displayValue,
  emptyValue = '',
  formatValue,
  isDisabled,
  isReadOnly,
  label,
  onPress,
  testID
}) {
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  const isInteractive = !isDisabled && !isReadOnly;
  const iconColor = theme.colors.icon.default;
  const resolvedDisplayValue = displayValue !== undefined ? displayValue ?? emptyValue : formatValue ? formatValue(dateValue) : dateValue ?? emptyValue;
  const leading = boundary === 'start' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CalendarOutlineIcon.CalendarOutlineIcon, {
    color: iconColor,
    size: LEADING_ICON_SIZE
  }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_CalendarExpiresIcon.CalendarExpiresIcon, {
    color: iconColor,
    size: LEADING_ICON_SIZE
  });
  const trailing = !isReadOnly ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    pointerEvents: "none",
    style: styles.trailing,
    testID: affordanceTestID,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChevronDownSmallIcon.ChevronDownSmallIcon, {
      color: iconColor,
      size: TRAILING_ICON_SIZE
    })
  }) : undefined;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.ActionListRow, {
    accessibilityLabel: accessibilityLabel ?? label,
    isDisabled: isDisabled,
    leading: leading,
    onPress: isInteractive ? onPress : undefined,
    rightText: resolvedDisplayValue,
    testID: testID,
    title: label,
    trailing: trailing,
    variant: "card-settings"
  });
});
const createStyles = theme => _reactNative.StyleSheet.create({
  trailing: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: TRAILING_CONTAINER_SIZE / 2,
    height: TRAILING_CONTAINER_SIZE,
    justifyContent: 'center',
    width: TRAILING_CONTAINER_SIZE
  }
});
//# sourceMappingURL=DateFieldRow.js.map