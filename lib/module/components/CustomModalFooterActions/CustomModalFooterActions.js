"use strict";

import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { Button } from "../Button/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const createStyles = theme => StyleSheet.create({
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
export const CustomModalFooterActions = ({
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
  const styles = useThemedStyles(createStyles);
  const isColumn = direction === 'column';
  const cancelButton = /*#__PURE__*/_jsx(Button, {
    onPress: onCancel,
    style: "light",
    testID: cancelTestID,
    title: cancelLabel
  });
  const primaryButton = /*#__PURE__*/_jsx(Button, {
    disabled: isPrimaryDisabled,
    loading: isPrimaryLoading,
    onPress: onPrimary,
    style: primaryStyle,
    testID: primaryTestID,
    title: primaryLabel
  });
  return /*#__PURE__*/_jsxs(View, {
    style: [isColumn ? styles.column : styles.row, style],
    testID: testID,
    children: [isColumn ? primaryButton : cancelButton, isColumn ? cancelButton : primaryButton]
  });
};
//# sourceMappingURL=CustomModalFooterActions.js.map