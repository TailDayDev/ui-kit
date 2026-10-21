"use strict";

import { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronDownIcon } from "../../icons/ChevronDownIcon.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { Button } from "../Button/index.js";
import { CustomModal } from "../CustomModal/index.js";
import { NativePicker } from "../NativePicker/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** App `Select` field height (off-scale: not in Figma Spacing). */
const FIELD_HEIGHT = 62;
/** App `Select` side padding and chevron inset (off-scale). */
const FIELD_PADDING_X = 14;
/** App Android elevation of the field; no Figma effect, kept as is. */
const FIELD_ELEVATION = 8;
/** App height of the Android dropdown picker. */
const ANDROID_PICKER_HEIGHT = 200;

/** Field that opens a sheet with a native picker; Save applies the pick. */
export const Select = ({
  value,
  setValue,
  options,
  placeholder,
  label,
  cancelLabel,
  saveLabel,
  containerStyle,
  labelStyle,
  errorText,
  hasError = false,
  disabled = false,
  onBlur,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const [isFocused, setIsFocused] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value?.value);
  const openPicker = () => {
    setSelectedValue(value?.value);
    setIsPickerVisible(true);
    setIsFocused(true);
  };
  const closePicker = () => {
    setIsPickerVisible(false);
    setIsFocused(false);
    onBlur?.();
  };
  const confirmSelection = () => {
    const selected = options.find(o => o.value === selectedValue);
    if (selected) {
      setValue(selected);
    }
    closePicker();
  };
  return /*#__PURE__*/_jsxs(View, {
    style: containerStyle,
    children: [/*#__PURE__*/_jsxs(TouchableOpacity, {
      testID: testID,
      accessibilityRole: "button",
      accessibilityState: {
        disabled,
        expanded: isPickerVisible
      },
      style: [styles.container, isFocused ? styles.focusedContainer : null, disabled ? styles.disabledContainer : null],
      onPress: () => {
        if (!disabled) {
          openPicker();
        }
      },
      children: [!!label && /*#__PURE__*/_jsx(Text, {
        style: [styles.label, labelStyle, disabled && styles.disabledLabel],
        children: label
      }), /*#__PURE__*/_jsx(Text, {
        style: [styles.selectText, !value?.value && styles.placeholderText, disabled && styles.disabledInput],
        children: value?.label || placeholder
      }), /*#__PURE__*/_jsx(View, {
        style: styles.icon,
        children: /*#__PURE__*/_jsx(ChevronDownIcon, {
          color: theme.colors.icon.default
        })
      }), !!hasError && !!errorText && /*#__PURE__*/_jsx(Text, {
        style: styles.errorText,
        children: errorText
      })]
    }), /*#__PURE__*/_jsx(CustomModal, {
      pageHost: "view",
      scrollEnabled: false,
      visible: isPickerVisible,
      onClose: closePicker,
      title: label,
      autoHeight: true,
      avoidKeyboard: true,
      divider: false,
      footer: /*#__PURE__*/_jsxs(View, {
        style: styles.footer,
        children: [/*#__PURE__*/_jsx(Button, {
          title: cancelLabel,
          onPress: closePicker,
          style: "light"
        }), /*#__PURE__*/_jsx(Button, {
          title: saveLabel,
          onPress: confirmSelection
        })]
      }),
      children: /*#__PURE__*/_jsx(NativePicker, {
        selectedValue: selectedValue,
        onValueChange: itemValue => setSelectedValue(itemValue),
        style: Platform.OS === 'android' ? styles.androidPicker : styles.iosPicker,
        itemStyle: styles.pickerItem,
        isDropdownOnAndroid: true,
        items: options,
        accessibilityLabel: label
      })
    })]
  });
};
const createStyles = theme => StyleSheet.create({
  androidPicker: {
    flex: 0,
    height: ANDROID_PICKER_HEIGHT
  },
  container: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.palette.lightGray,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    elevation: FIELD_ELEVATION,
    height: FIELD_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: FIELD_PADDING_X,
    paddingVertical: theme.space[2.5]
  },
  disabledContainer: {
    backgroundColor: theme.colors.bg.subtle
  },
  disabledInput: {
    color: theme.colors.text.secondary
  },
  disabledLabel: {
    color: theme.palette.lightGray
  },
  errorText: {
    ...theme.typography.caption.regular,
    color: theme.colors.text.error,
    marginTop: theme.space[1]
  },
  focusedContainer: {
    borderColor: theme.colors.bg.accent
  },
  footer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: theme.space[8],
    paddingTop: theme.space[4],
    width: '100%'
  },
  icon: {
    position: 'absolute',
    right: FIELD_PADDING_X
  },
  iosPicker: {
    flex: 1,
    height: 'auto'
  },
  label: {
    ...theme.typography.caption.regular,
    color: theme.colors.text.primary,
    marginBottom: theme.space[1]
  },
  pickerItem: {
    // App: 20pt rows (Figma `title/regular` size).
    fontSize: theme.typography.title.regular.fontSize,
    textAlign: 'center',
    color: theme.colors.text.primary
  },
  placeholderText: {
    color: theme.colors.text.secondary
  },
  selectText: {
    ...theme.typography.headline.regular,
    color: theme.colors.text.primary
  }
});
//# sourceMappingURL=Select.js.map