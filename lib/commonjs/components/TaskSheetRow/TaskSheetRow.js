"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskSheetRow = void 0;
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Pressable/index.js");
var _index4 = require("../../primitives/Text/index.js");
var _index5 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TaskSheetRow › Icon: 20×20 instance of the 24pt icon set.
const TASK_SHEET_ROW_ICON_SIZE = 20;
const createStyles = theme => _reactNative.StyleSheet.create({
  label: {
    flexShrink: 1
  },
  row: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.palette.lightGray,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    paddingHorizontal: theme.space[6] - theme.stroke[1],
    paddingVertical: theme.space[4] - theme.stroke[1]
  }
});

/**
 * Action row of the task sheet (Figma `TaskSheetRow`): label on the left,
 * icon on the right; the destructive variant paints only the icon red.
 */
const TaskSheetRow = ({
  label,
  icon = _index.IconCalendarDays,
  isDestructive = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = (0, _index5.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index3.Pressable, {
    testID: testID,
    accessibilityRole: "button",
    accessibilityLabel: accessibilityLabel ?? label,
    disabled: disabled,
    onPress: onPress,
    style: [styles.row, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.Text, {
      variant: "headline/medium",
      style: styles.label,
      children: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
      icon: icon,
      size: TASK_SHEET_ROW_ICON_SIZE,
      color: isDestructive ? 'text.error' : 'default'
    })]
  });
};
exports.TaskSheetRow = TaskSheetRow;
//# sourceMappingURL=TaskSheetRow.js.map