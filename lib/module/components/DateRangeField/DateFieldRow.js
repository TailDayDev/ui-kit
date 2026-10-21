"use strict";

import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarExpiresIcon } from "../../icons/CalendarExpiresIcon.js";
import { CalendarOutlineIcon } from "../../icons/CalendarOutlineIcon.js";
import { ChevronDownSmallIcon } from "../../icons/ChevronDownSmallIcon.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { ActionListRow } from "../ActionListRow/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
/** Icon and chevron container sizes from the app `DateFieldRow`. */
const LEADING_ICON_SIZE = 20;
const TRAILING_ICON_SIZE = 16;
const TRAILING_CONTAINER_SIZE = 28;
export const DateFieldRow = /*#__PURE__*/memo(function DateFieldRow({
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
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const isInteractive = !isDisabled && !isReadOnly;
  const iconColor = theme.colors.icon.default;
  const resolvedDisplayValue = displayValue !== undefined ? displayValue ?? emptyValue : formatValue ? formatValue(dateValue) : dateValue ?? emptyValue;
  const leading = boundary === 'start' ? /*#__PURE__*/_jsx(CalendarOutlineIcon, {
    color: iconColor,
    size: LEADING_ICON_SIZE
  }) : /*#__PURE__*/_jsx(CalendarExpiresIcon, {
    color: iconColor,
    size: LEADING_ICON_SIZE
  });
  const trailing = !isReadOnly ? /*#__PURE__*/_jsx(View, {
    pointerEvents: "none",
    style: styles.trailing,
    testID: affordanceTestID,
    children: /*#__PURE__*/_jsx(ChevronDownSmallIcon, {
      color: iconColor,
      size: TRAILING_ICON_SIZE
    })
  }) : undefined;
  return /*#__PURE__*/_jsx(ActionListRow, {
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
const createStyles = theme => StyleSheet.create({
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