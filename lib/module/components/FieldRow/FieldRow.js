"use strict";

import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ChevronDownIcon } from "../../icons/ChevronDownIcon.js";
import { CloseIcon } from "../../icons/CloseIcon.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// off-scale: the app row presses to 0.7, not the kit `opacity.pressed` (0.85).
const ROW_PRESSED_OPACITY = 0.7;
/** A static row does not react to touches. */
const STATIC_OPACITY = 1;
/** Round action button (app `rowAction`, 28pt circle). */
const ACTION_SIZE = 28;
/** Chevron / clear glyph size. */
const ACTION_ICON_SIZE = 20;
/** Icon slot width (Figma icon frame). */
const ICON_SLOT_WIDTH = 24;
/** Extra touch area around the round action. */
const ACTION_HIT_SLOP = 8;
const createStyles = theme => StyleSheet.create({
  row: {
    alignItems: 'center',
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[2],
    justifyContent: 'space-between',
    padding: theme.space[3]
  },
  rowAction: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: ACTION_SIZE / 2,
    height: ACTION_SIZE,
    justifyContent: 'center',
    width: ACTION_SIZE
  },
  rowContent: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: theme.space[2]
  },
  rowError: {
    borderColor: theme.colors.text.error
  },
  rowIcon: {
    alignItems: 'center',
    width: ICON_SLOT_WIDTH
  },
  rowValue: {
    flexShrink: 1
  }
});

/**
 * Picker-style form row (Figma `FieldRow`): icon and label on the left, value
 * and a round chevron (or clear ×) on the right.
 */
export const FieldRow = ({
  icon = null,
  label,
  value,
  isEmpty = false,
  isError = false,
  onPress,
  onClear,
  showAction = true,
  restValueStyle,
  style,
  testID,
  accessibilityLabel,
  actionAccessibilityLabel,
  actionTestID
}) => {
  const styles = useThemedStyles(createStyles);
  const isInteractive = Boolean(onPress);
  const canPressAction = isInteractive || Boolean(onClear);
  const handleRowPress = useCallback(() => {
    onPress?.();
  }, [onPress]);
  const handleActionPress = useCallback(event => {
    event.stopPropagation();
    const action = onClear ?? onPress;
    action?.();
  }, [onClear, onPress]);
  const valueColor = isError ? 'error' : isEmpty ? 'secondary' : 'accent';
  return /*#__PURE__*/_jsxs(TouchableOpacity, {
    testID: testID,
    style: [styles.row, isError ? styles.rowError : null, style],
    onPress: handleRowPress,
    disabled: !isInteractive,
    activeOpacity: isInteractive ? ROW_PRESSED_OPACITY : STATIC_OPACITY,
    accessibilityRole: isInteractive ? 'button' : undefined,
    accessibilityLabel: accessibilityLabel,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.rowContent,
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.rowIcon,
        children: icon
      }), /*#__PURE__*/_jsx(Text, {
        variant: "body/regular",
        children: label
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.rowContent,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "body/medium",
        color: valueColor,
        align: "right",
        style: [styles.rowValue, restValueStyle],
        children: value
      }), showAction ? /*#__PURE__*/_jsx(TouchableOpacity, {
        style: styles.rowAction,
        onPress: handleActionPress,
        hitSlop: ACTION_HIT_SLOP,
        disabled: !canPressAction,
        accessibilityRole: canPressAction ? 'button' : undefined,
        accessibilityLabel: actionAccessibilityLabel,
        testID: actionTestID,
        children: /*#__PURE__*/_jsx(Icon, {
          icon: onClear ? CloseIcon : ChevronDownIcon,
          size: ACTION_ICON_SIZE
        })
      }) : null]
    })]
  });
};
//# sourceMappingURL=FieldRow.js.map