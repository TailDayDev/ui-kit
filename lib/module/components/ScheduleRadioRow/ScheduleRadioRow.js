"use strict";

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from "../../primitives/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { Radio } from "../Radio/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** App `ScheduleRadioRow` slot around the 24pt radio (gives the 34pt Figma row its height). */
const RADIO_SLOT_SIZE = 32;
/** App `ScheduleRadioRow` pressed opacity. */
const PRESSED_OPACITY = 0.8;
/** App `ScheduleRadioRow` disabled opacity (differs from `theme.opacity.disabled`; kept 1:1). */
const DISABLED_OPACITY = 0.5;
const createStyles = theme => StyleSheet.create({
  description: {
    flexShrink: 1,
    flexWrap: 'wrap'
  },
  disabled: {
    opacity: DISABLED_OPACITY
  },
  radioSlot: {
    alignItems: 'center',
    height: RADIO_SLOT_SIZE,
    justifyContent: 'center',
    width: RADIO_SLOT_SIZE
  },
  textColumn: {
    flex: 1,
    minWidth: 0
  },
  title: {
    flexShrink: 1
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[2]
  }
});

/** Radio option row: radio indicator, title and description. The row owns the radio role. */
export const ScheduleRadioRow = ({
  testID,
  title,
  description,
  descriptionColor,
  selected,
  disabled = false,
  onPress
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(TouchableOpacity, {
    testID: testID,
    accessibilityLabel: title,
    style: [styles.wrapper, disabled && styles.disabled],
    onPress: onPress,
    disabled: disabled,
    activeOpacity: PRESSED_OPACITY,
    accessibilityRole: "radio",
    accessibilityState: {
      checked: selected,
      selected,
      disabled
    },
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.radioSlot,
      children: /*#__PURE__*/_jsx(Radio, {
        isActive: selected
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.textColumn,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "headline/medium",
        color: "primary",
        style: styles.title,
        children: title
      }), /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        color: "secondary",
        style: [styles.description, descriptionColor ? {
          color: descriptionColor
        } : null],
        children: description
      })]
    })]
  });
};
//# sourceMappingURL=ScheduleRadioRow.js.map