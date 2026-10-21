"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScheduleOverview = void 0;
var _reactNative = require("react-native");
var _ChevronDownSmallIcon = require("../../icons/ChevronDownSmallIcon.js");
var _CloseIcon = require("../../icons/CloseIcon.js");
var _RepeatEndCalendarIcon = require("../../icons/RepeatEndCalendarIcon.js");
var _ReverseIcon = require("../../icons/ReverseIcon.js");
var _TimelineClockOutlineIcon = require("../../icons/TimelineClockOutlineIcon.js");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
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
const createStyles = theme => _reactNative.StyleSheet.create({
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Pressable, {
    accessibilityLabel: `${label}: ${value}`,
    accessibilityRole: "button",
    onPress: onPress,
    style: ({
      pressed
    }) => [styles.row, pressed && styles.pressedRow],
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
      icon: icon
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.rowText,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        numberOfLines: 1,
        style: styles.label,
        children: label
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "body/medium",
        color: isSelected ? 'accent' : 'secondary',
        align: "right",
        numberOfLines: 1,
        style: styles.value,
        children: value
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
      accessibilityLabel: `${label}: ${value}`,
      accessibilityRole: "button",
      hitSlop: TRAILING_HIT_SLOP,
      onPress: onClear ? handleClear : handleExpand,
      style: styles.trailingButton,
      testID: `${testID}.${onClear ? 'clear' : 'expand'}`,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
        icon: onClear ? _CloseIcon.CloseIcon : _ChevronDownSmallIcon.ChevronDownSmallIcon,
        size: TRAILING_ICON_SIZE
      })
    })]
  });
};

/** Summary of a schedule: timing, repeat, start and end rows that open their pickers. */
const ScheduleOverview = ({
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
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const rows = [showTiming ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ScheduleFieldRow, {
    icon: _TimelineClockOutlineIcon.TimelineClockOutlineIcon,
    isSelected: isTimingSelected,
    label: labels.timing,
    onClear: isTimingSelected ? onClearTiming : undefined,
    onPress: onTimingPress,
    styles: styles,
    testID: `${testIDPrefix}.timing`,
    value: timingValue
  }, "timing") : null, showRepeat ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ScheduleFieldRow, {
    icon: _ReverseIcon.ReverseIcon,
    isSelected: isRepeatSelected,
    label: labels.repeat,
    onClear: isRepeatSelected ? onClearRepeat : undefined,
    onPress: onRepeatPress,
    styles: styles,
    testID: `${testIDPrefix}.repeat`,
    value: repeatValue
  }, "repeat") : null, showStart ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ScheduleFieldRow, {
    icon: _RepeatEndCalendarIcon.RepeatEndCalendarIcon,
    isSelected: isStartSelected,
    label: labels.start,
    onPress: onStartPress,
    styles: styles,
    testID: `${testIDPrefix}.start`,
    value: startValue
  }, "start") : null, showEnd ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ScheduleFieldRow, {
    icon: _RepeatEndCalendarIcon.RepeatEndCalendarIcon,
    isSelected: isEndSelected,
    label: labels.end,
    onClear: isEndSelected ? onClearEnd : undefined,
    onPress: onEndPress,
    styles: styles,
    testID: `${testIDPrefix}.end`,
    value: endValue
  }, "end") : null];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    testID: "schedule.overview",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "largeTitle/semibold",
      style: styles.title,
      children: labels.title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.rows,
      children: rows
    })]
  });
};
exports.ScheduleOverview = ScheduleOverview;
//# sourceMappingURL=ScheduleOverview.js.map