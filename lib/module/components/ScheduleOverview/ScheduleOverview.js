"use strict";

import { Pressable, StyleSheet, View } from 'react-native';
import { ChevronDownSmallIcon } from "../../icons/ChevronDownSmallIcon.js";
import { CloseIcon } from "../../icons/CloseIcon.js";
import { RepeatEndCalendarIcon } from "../../icons/RepeatEndCalendarIcon.js";
import { ReverseIcon } from "../../icons/ReverseIcon.js";
import { TimelineClockOutlineIcon } from "../../icons/TimelineClockOutlineIcon.js";
import { Icon, Text } from "../../primitives/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** App row height (Figma field row). */
const ROW_HEIGHT = 52;
/** App pressed row opacity (differs from `opacity.pressed`). */
const ROW_PRESSED_OPACITY = 0.8;
/** App trailing round button side and radius (off-scale). */
const TRAILING_BUTTON_SIZE = 28;
const TRAILING_BUTTON_RADIUS = 14;
/** App trailing icon size. */
const TRAILING_ICON_SIZE = 20;
const TRAILING_HIT_SLOP = 8;
const createStyles = theme => StyleSheet.create({
  container: {
    paddingHorizontal: theme.space[6]
  },
  label: {
    flexShrink: 1
  },
  pressedRow: {
    opacity: ROW_PRESSED_OPACITY
  },
  row: {
    alignItems: 'center',
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[2],
    height: ROW_HEIGHT,
    paddingHorizontal: theme.space[3]
  },
  rows: {
    gap: theme.space[2]
  },
  rowText: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: theme.space[2],
    justifyContent: 'space-between',
    minWidth: 0
  },
  title: {
    marginBottom: theme.space[6]
  },
  trailingButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: TRAILING_BUTTON_RADIUS,
    height: TRAILING_BUTTON_SIZE,
    justifyContent: 'center',
    width: TRAILING_BUTTON_SIZE
  },
  value: {
    flexShrink: 1
  }
});
const ScheduleFieldRow = ({
  icon,
  isSelected,
  label,
  onClear,
  onPress,
  styles,
  testID,
  value
}) => {
  const handleClear = event => {
    event.stopPropagation();
    onClear?.();
  };
  const handleExpand = event => {
    event.stopPropagation();
    onPress();
  };
  return /*#__PURE__*/_jsxs(Pressable, {
    accessibilityLabel: `${label}: ${value}`,
    accessibilityRole: "button",
    onPress: onPress,
    style: ({
      pressed
    }) => [styles.row, pressed && styles.pressedRow],
    testID: testID,
    children: [/*#__PURE__*/_jsx(Icon, {
      icon: icon
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.rowText,
      children: [/*#__PURE__*/_jsx(Text, {
        numberOfLines: 1,
        style: styles.label,
        children: label
      }), /*#__PURE__*/_jsx(Text, {
        variant: "body/medium",
        color: isSelected ? 'accent' : 'secondary',
        align: "right",
        numberOfLines: 1,
        style: styles.value,
        children: value
      })]
    }), /*#__PURE__*/_jsx(Pressable, {
      accessibilityLabel: `${label}: ${value}`,
      accessibilityRole: "button",
      hitSlop: TRAILING_HIT_SLOP,
      onPress: onClear ? handleClear : handleExpand,
      style: styles.trailingButton,
      testID: `${testID}.${onClear ? 'clear' : 'expand'}`,
      children: /*#__PURE__*/_jsx(Icon, {
        icon: onClear ? CloseIcon : ChevronDownSmallIcon,
        size: TRAILING_ICON_SIZE
      })
    })]
  });
};

/** Summary of a schedule: timing, repeat, start and end rows that open their pickers. */
export const ScheduleOverview = ({
  labels,
  endValue,
  isEndSelected,
  isRepeatSelected,
  isStartSelected,
  isTimingSelected,
  onClearEnd,
  onClearRepeat,
  onClearTiming,
  onEndPress,
  onRepeatPress,
  onStartPress,
  onTimingPress,
  repeatValue,
  showEnd,
  showRepeat,
  showStart,
  showTiming = true,
  startValue,
  testIDPrefix,
  timingValue
}) => {
  const styles = useThemedStyles(createStyles);
  const rows = [showTiming ? /*#__PURE__*/_jsx(ScheduleFieldRow, {
    icon: TimelineClockOutlineIcon,
    isSelected: isTimingSelected,
    label: labels.timing,
    onClear: isTimingSelected ? onClearTiming : undefined,
    onPress: onTimingPress,
    styles: styles,
    testID: `${testIDPrefix}.timing`,
    value: timingValue
  }, "timing") : null, showRepeat ? /*#__PURE__*/_jsx(ScheduleFieldRow, {
    icon: ReverseIcon,
    isSelected: isRepeatSelected,
    label: labels.repeat,
    onClear: isRepeatSelected ? onClearRepeat : undefined,
    onPress: onRepeatPress,
    styles: styles,
    testID: `${testIDPrefix}.repeat`,
    value: repeatValue
  }, "repeat") : null, showStart ? /*#__PURE__*/_jsx(ScheduleFieldRow, {
    icon: RepeatEndCalendarIcon,
    isSelected: isStartSelected,
    label: labels.start,
    onPress: onStartPress,
    styles: styles,
    testID: `${testIDPrefix}.start`,
    value: startValue
  }, "start") : null, showEnd ? /*#__PURE__*/_jsx(ScheduleFieldRow, {
    icon: RepeatEndCalendarIcon,
    isSelected: isEndSelected,
    label: labels.end,
    onClear: isEndSelected ? onClearEnd : undefined,
    onPress: onEndPress,
    styles: styles,
    testID: `${testIDPrefix}.end`,
    value: endValue
  }, "end") : null];
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    testID: "schedule.overview",
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "largeTitle/semibold",
      style: styles.title,
      children: labels.title
    }), /*#__PURE__*/_jsx(View, {
      style: styles.rows,
      children: rows
    })]
  });
};
//# sourceMappingURL=ScheduleOverview.js.map