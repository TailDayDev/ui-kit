"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionRow = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Pressable/index.js");
var _index2 = require("../../primitives/Text/index.js");
var _index3 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  label: {
    flex: 1
  },
  row: {
    alignItems: 'center',
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[2],
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    paddingHorizontal: theme.space[4] - theme.stroke[1],
    paddingVertical: theme.space[3] - theme.stroke[1]
  },
  rowSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  }
});

/**
 * Single-choice text row (Figma `OptionRow`). The row is the radio: put several
 * in a list and keep the selection in the parent.
 */
const OptionRow = ({
  label,
  isSelected = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = (0, _index3.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Pressable, {
    testID: testID,
    accessibilityRole: "radio",
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityState: {
      checked: isSelected
    },
    disabled: disabled,
    onPress: onPress,
    style: [styles.row, isSelected ? styles.rowSelected : null, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
      variant: "body/medium",
      color: isSelected ? 'accent' : 'primary',
      style: styles.label,
      children: label
    })
  });
};
exports.OptionRow = OptionRow;
//# sourceMappingURL=OptionRow.js.map