"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScheduleRadioRow = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../Radio/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App `ScheduleRadioRow` slot around the 24pt radio (gives the 34pt Figma row its height). */
const RADIO_SLOT_SIZE = 32;
/** App `ScheduleRadioRow` pressed opacity. */
const PRESSED_OPACITY = 0.8;
/** App `ScheduleRadioRow` disabled opacity (differs from `theme.opacity.disabled`; kept 1:1). */
const DISABLED_OPACITY = 0.5;
const createStyles = theme => _reactNative.StyleSheet.create({
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
const ScheduleRadioRow = ({
  testID,
  title,
  description,
  descriptionColor,
  selected,
  disabled = false,
  onPress
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.radioSlot,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Radio, {
        isActive: selected
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.textColumn,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "headline/medium",
        color: "primary",
        style: styles.title,
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
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
exports.ScheduleRadioRow = ScheduleRadioRow;
//# sourceMappingURL=ScheduleRadioRow.js.map