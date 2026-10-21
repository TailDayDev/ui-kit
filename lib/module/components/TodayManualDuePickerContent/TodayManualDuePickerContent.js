"use strict";

import { StyleSheet, View } from 'react-native';
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { OptionRow } from "../OptionRow/index.js";
import { ScheduleRadioRow } from "../ScheduleRadioRow/index.js";
import { WheelPicker } from "../WheelPicker/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodayManualDuePickerContent › TimeWheel › Hours / Minutes: 87 wide.
const WHEEL_COLUMN_WIDTH = 87;
// Figma TodayManualDuePickerContent › TimeWheel › Meridiem: 50 wide.
const WHEEL_FORMAT_COLUMN_WIDTH = 50;
// Figma TodayManualDuePickerContent › TimeWheel › SelectionBand: 38 high.
const WHEEL_ITEM_HEIGHT = 38;
// Figma TodayManualDuePickerContent › TimeWheel: 5 rows (190 high).
const WHEEL_VISIBLE_ITEM_COUNT = 5;
const DUE_MODES = ['noTime', 'dayPart', 'exactTime'];
const DAY_PARTS = ['morning', 'day', 'evening', 'night'];
const MODE_TEXT_KEYS = {
  noTime: ['noTimeTitle', 'noTimeDescription'],
  dayPart: ['dayPartTitle', 'dayPartDescription'],
  exactTime: ['exactTimeTitle', 'exactTimeDescription']
};
const getDefaultTime = hourFormat =>
// App DEFAULT_EXACT_TIME 08:00.
hourFormat === '12h' ? {
  hour: '08',
  minutes: '00',
  format: 'am'
} : {
  hour: '08',
  minutes: '00',
  format: null
};
const createStyles = theme => {
  const columnGap = theme.space[2];
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bg.surface,
      gap: theme.space[4],
      paddingHorizontal: theme.space[6],
      paddingTop: theme.space[3]
    },
    dayPartList: {
      gap: theme.space[2]
    },
    divider: {
      paddingVertical: theme.space[3]
    },
    dividerLine: {
      backgroundColor: theme.colors.border.default,
      height: theme.stroke[1]
    },
    modeCard: {
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.lg,
      borderWidth: theme.stroke[1],
      gap: theme.space[4],
      // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
      padding: theme.space[4] - theme.stroke[1]
    },
    timeSection: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface
    },
    // Figma TimeWheel is HUG: two 87pt columns (+ the 50pt am/pm column) and 8pt gaps.
    wheel12h: {
      width: WHEEL_COLUMN_WIDTH * 2 + WHEEL_FORMAT_COLUMN_WIDTH + columnGap * 2
    },
    wheel24h: {
      width: WHEEL_COLUMN_WIDTH * 2 + columnGap
    },
    wheelSelection: {
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: theme.radius.sm,
      borderWidth: 0
    },
    wheelText: {
      ...theme.typography.title.regular,
      color: theme.colors.text.primary
    }
  });
};

/**
 * Body of the task due-time modal (Figma `TodayManualDuePickerContent`).
 * The modal (title, footer) stays in the parent.
 */
export const TodayManualDuePickerContent = ({
  mode = 'noTime',
  dayPart = null,
  time,
  hourFormat = '24h',
  minuteInterval,
  labels,
  onModeChange,
  onDayPartChange,
  onTimeChange,
  style,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const childTestID = suffix => testID ? `${testID}.${suffix}` : undefined;
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.container, style],
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.modeCard,
      children: DUE_MODES.map(item => {
        const [titleKey, descriptionKey] = MODE_TEXT_KEYS[item];
        return /*#__PURE__*/_jsx(ScheduleRadioRow, {
          testID: childTestID(`mode.${item}`),
          title: labels[titleKey],
          description: labels[descriptionKey],
          selected: item === mode,
          onPress: () => onModeChange(item)
        }, item);
      })
    }), mode !== 'noTime' ? /*#__PURE__*/_jsx(View, {
      style: styles.divider,
      children: /*#__PURE__*/_jsx(View, {
        style: styles.dividerLine
      })
    }) : null, mode === 'dayPart' ? /*#__PURE__*/_jsx(View, {
      style: styles.dayPartList,
      children: DAY_PARTS.map(item => /*#__PURE__*/_jsx(OptionRow, {
        testID: childTestID(`dayPart.${item}`),
        label: labels[item],
        isSelected: item === dayPart,
        onPress: () => onDayPartChange(item)
      }, item))
    }) : null, mode === 'exactTime' ? /*#__PURE__*/_jsx(View, {
      style: styles.timeSection,
      children: /*#__PURE__*/_jsx(WheelPicker, {
        mode: "time",
        testID: childTestID('time'),
        value: time ?? getDefaultTime(hourFormat),
        onChange: onTimeChange,
        hourFormat: hourFormat,
        minuteInterval: minuteInterval,
        columnGap: theme.space[2],
        formatColumnWidth: WHEEL_FORMAT_COLUMN_WIDTH,
        itemHeight: WHEEL_ITEM_HEIGHT,
        visibleItemCount: WHEEL_VISIBLE_ITEM_COUNT,
        containerStyle: hourFormat === '12h' ? styles.wheel12h : styles.wheel24h,
        itemTextStyle: styles.wheelText,
        selectionIndicatorStyle: styles.wheelSelection
      })
    }) : null]
  });
};
//# sourceMappingURL=TodayManualDuePickerContent.js.map