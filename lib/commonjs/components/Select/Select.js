"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _ChevronDownIcon = require("../../icons/ChevronDownIcon.js");
var _index = require("../../theme/index.js");
var _index2 = require("../Button/index.js");
var _index3 = require("../CustomModal/index.js");
var _index4 = require("../NativePicker/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App `Select` field height (off-scale: not in Figma Spacing). */
const FIELD_HEIGHT = 62;
/** App `Select` side padding and chevron inset (off-scale). */
const FIELD_PADDING_X = 14;
/** App Android elevation of the field; no Figma effect, kept as is. */
const FIELD_ELEVATION = 8;
/** App height of the Android dropdown picker. */
const ANDROID_PICKER_HEIGHT = 200;

/** Field that opens a sheet with a native picker; Save applies the pick. */
const Select = ({
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
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  const [isFocused, setIsFocused] = (0, _react.useState)(false);
  const [isPickerVisible, setIsPickerVisible] = (0, _react.useState)(false);
  const [selectedValue, setSelectedValue] = (0, _react.useState)(value?.value);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: containerStyle,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
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
      children: [!!label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.label, labelStyle, disabled && styles.disabledLabel],
        children: label
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: [styles.selectText, !value?.value && styles.placeholderText, disabled && styles.disabledInput],
        children: value?.label || placeholder
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.icon,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChevronDownIcon.ChevronDownIcon, {
          color: theme.colors.icon.default
        })
      }), !!hasError && !!errorText && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.errorText,
        children: errorText
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.CustomModal, {
      pageHost: "view",
      scrollEnabled: false,
      visible: isPickerVisible,
      onClose: closePicker,
      title: label,
      autoHeight: true,
      avoidKeyboard: true,
      divider: false,
      footer: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.footer,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
          title: cancelLabel,
          onPress: closePicker,
          style: "light"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Button, {
          title: saveLabel,
          onPress: confirmSelection
        })]
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.NativePicker, {
        selectedValue: selectedValue,
        onValueChange: itemValue => setSelectedValue(itemValue),
        style: _reactNative.Platform.OS === 'android' ? styles.androidPicker : styles.iosPicker,
        itemStyle: styles.pickerItem,
        isDropdownOnAndroid: true,
        items: options,
        accessibilityLabel: label
      })
    })]
  });
};
exports.Select = Select;
const createStyles = theme => _reactNative.StyleSheet.create({
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