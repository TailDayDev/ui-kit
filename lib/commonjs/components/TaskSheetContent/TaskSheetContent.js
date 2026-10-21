"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskSheetContent = void 0;
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../TaskSheetRow/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  actions: {
    alignSelf: 'stretch',
    gap: theme.space[2]
  },
  container: {
    // Figma: 382pt rows centered in the 430pt sheet → 24pt on each side.
    paddingBottom: theme.space[5],
    paddingHorizontal: theme.space[6]
  },
  destructive: {
    alignSelf: 'stretch',
    gap: theme.space[2],
    paddingTop: theme.space[13]
  }
});
const renderRow = ({
  key,
  label,
  icon,
  onPress,
  isDestructive = false,
  disabled,
  testID
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.TaskSheetRow, {
  label: label,
  icon: icon ?? (isDestructive ? _index.IconTrash2 : undefined),
  isDestructive: isDestructive,
  onPress: onPress,
  disabled: disabled,
  testID: testID
}, key);

/**
 * Body of the task sheet (Figma `TaskSheetContent`): `TaskSheetRow`s 8pt apart
 * and, when a row is destructive, a "Delete" row 52pt below them.
 */
const TaskSheetContent = ({
  rows,
  style,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const actionRows = rows.filter(row => !row.isDestructive);
  const destructiveRows = rows.filter(row => row.isDestructive);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    style: [styles.container, style],
    children: [actionRows.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.actions,
      children: actionRows.map(renderRow)
    }) : null, destructiveRows.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      testID: testID ? `${testID}.destructive` : undefined,
      style: styles.destructive,
      children: destructiveRows.map(renderRow)
    }) : null]
  });
};
exports.TaskSheetContent = TaskSheetContent;
//# sourceMappingURL=TaskSheetContent.js.map