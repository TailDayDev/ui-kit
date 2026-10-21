"use strict";

import { useMemo } from 'react';
import { Platform, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from "../../theme/index.js";
import { useNativeEchoValue } from "../../utils/useNativeEchoValue.js";

/** Platform picker (iOS wheel / Android dropdown) with theme text colors. */
import { jsx as _jsx } from "react/jsx-runtime";
export const NativePicker = ({
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
  const theme = useTheme();
  const textColor = theme.colors.text.primary;
  const isAndroid = Platform.OS === 'android';

  // Inside a modal the wheel would otherwise jump back after a pick.
  const [shownValue, echoPick] = useNativeEchoValue(selectedValue);
  const resolvedItemStyle = useMemo(() => {
    if (isAndroid) {
      return itemStyle;
    }
    const iosBaseItemStyle = {
      color: textColor,
      textAlign: 'center'
    };
    return [iosBaseItemStyle, itemStyle];
  }, [isAndroid, itemStyle, textColor]);
  return /*#__PURE__*/_jsx(View, {
    style: containerStyle,
    children: /*#__PURE__*/_jsx(Picker, {
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
      children: items.map(item => /*#__PURE__*/_jsx(Picker.Item, {
        label: item.label,
        value: item.value,
        color: item.color ?? textColor
      }, `${item.label}-${String(item.value)}`))
    })
  });
};
//# sourceMappingURL=NativePicker.js.map