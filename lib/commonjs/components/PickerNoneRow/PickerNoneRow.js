"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerNoneRow = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Pressable/index.js");
var _index2 = require("../../primitives/Text/index.js");
var _index3 = require("../../theme/index.js");
var _index4 = require("../Radio/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodayManualPetPickerContent › Без питомца / TodayManualStaffPickerContent › Без сотрудника: fixed height 88.
const NONE_ROW_HEIGHT = 88;
// Figma › Radio: size=20 (inner dot 10).
const RADIO_SIZE = 20;
const RADIO_DOT_SIZE = 10;
const createStyles = theme => _reactNative.StyleSheet.create({
  label: {
    flex: 1
  },
  row: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.lg,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[3],
    height: NONE_ROW_HEIGHT,
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    paddingHorizontal: theme.space[4] - theme.stroke[1]
  },
  rowSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  }
});

/**
 * "Nothing selected" option of a picker list (Figma frames `Без питомца` and
 * `Без сотрудника`): label and a radio; the whole row is the radio.
 */
const PickerNoneRow = ({
  label,
  isSelected,
  onPress,
  testID
}) => {
  const styles = (0, _index3.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Pressable, {
    testID: testID,
    accessibilityRole: "radio",
    accessibilityLabel: label,
    accessibilityState: {
      checked: isSelected
    },
    onPress: onPress,
    style: [styles.row, isSelected ? styles.rowSelected : null],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
      variant: "headline/medium",
      style: styles.label,
      children: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.Radio, {
      isActive: isSelected,
      size: RADIO_SIZE,
      dotSize: RADIO_DOT_SIZE,
      testID: testID ? `${testID}.radio` : undefined
    })]
  });
};
exports.PickerNoneRow = PickerNoneRow;
//# sourceMappingURL=PickerNoneRow.js.map