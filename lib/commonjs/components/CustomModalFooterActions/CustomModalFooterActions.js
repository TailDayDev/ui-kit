"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomModalFooterActions = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../Button/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  column: {
    alignItems: 'stretch',
    flexDirection: 'column',
    gap: theme.space[4]
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

/**
 * Sheet footer (Figma `CustomModalFooterActions`): a light "Cancel" button and
 * the main action, side by side (`row`) or stacked with the main one on top
 * (`column`).
 */
const CustomModalFooterActions = ({
  cancelLabel,
  primaryLabel,
  onCancel,
  onPrimary,
  isPrimaryDisabled = false,
  isPrimaryLoading = false,
  primaryStyle = 'default',
  direction = 'row',
  style,
  testID,
  cancelTestID,
  primaryTestID
}) => {
  const styles = (0, _index.useThemedStyles)(createStyles);
  const isColumn = direction === 'column';
  const cancelButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
    onPress: onCancel,
    style: "light",
    testID: cancelTestID,
    title: cancelLabel
  });
  const primaryButton = /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
    disabled: isPrimaryDisabled,
    loading: isPrimaryLoading,
    onPress: onPrimary,
    style: primaryStyle,
    testID: primaryTestID,
    title: primaryLabel
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [isColumn ? styles.column : styles.row, style],
    testID: testID,
    children: [isColumn ? primaryButton : cancelButton, isColumn ? cancelButton : primaryButton]
  });
};
exports.CustomModalFooterActions = CustomModalFooterActions;
//# sourceMappingURL=CustomModalFooterActions.js.map