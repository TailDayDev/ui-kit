"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativePicker = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _picker = require("@react-native-picker/picker");
var _index = require("../../theme/index.js");
var _useNativeEchoValue = require("../../utils/useNativeEchoValue.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Platform picker (iOS wheel / Android dropdown) with theme text colors. */
const NativePicker = ({
  containerStyle,
  isDropdownOnAndroid = true,
  itemStyle,
  items,
  numberOfLines,
  onValueChange,
  selectedValue,
  selectionColor,
  style,
  accessibilityLabel,
  testID
}) => {
  const theme = (0, _index.useTheme)();
  const textColor = theme.colors.text.primary;
  const isAndroid = _reactNative.Platform.OS === 'android';

  // Inside a modal the wheel would otherwise jump back after a pick.
  const [shownValue, echoPick] = (0, _useNativeEchoValue.useNativeEchoValue)(selectedValue);
  const resolvedItemStyle = (0, _react.useMemo)(() => {
    if (isAndroid) {
      return itemStyle;
    }
    const iosBaseItemStyle = {
      color: textColor,
      textAlign: 'center'
    };
    return [iosBaseItemStyle, itemStyle];
  }, [isAndroid, itemStyle, textColor]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: containerStyle,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_picker.Picker, {
      selectedValue: shownValue,
      onValueChange: (nextValue, index) => {
        // Picker types the value loosely; the items are T.
        const value = nextValue;
        echoPick(value);
        onValueChange(value, index);
      },
      style: style,
      itemStyle: resolvedItemStyle,
      numberOfLines: numberOfLines,
      selectionColor: selectionColor,
      accessibilityLabel: accessibilityLabel,
      testID: testID,
      ...(isAndroid && isDropdownOnAndroid ? {
        mode: 'dropdown'
      } : {}),
      ...(isAndroid ? {
        dropdownIconColor: textColor
      } : {}),
      children: items.map(item => /*#__PURE__*/(0, _jsxRuntime.jsx)(_picker.Picker.Item, {
        label: item.label,
        value: item.value,
        color: item.color ?? textColor
      }, `${item.label}-${String(item.value)}`))
    })
  });
};
exports.NativePicker = NativePicker;
//# sourceMappingURL=NativePicker.js.map