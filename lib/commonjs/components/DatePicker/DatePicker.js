"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePicker = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../WheelPicker/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Optional title and description above a date wheel. */
const DatePicker = ({
  value,
  onChange,
  monthLabels,
  locale,
  label,
  autoInitialize = true,
  description,
  minDateIso,
  maxDateIso,
  testID
}) => {
  const styles = (0, _index.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [!!label && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      accessibilityRole: "header",
      style: styles.title,
      children: label
    }), !!description && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.description,
      children: description
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.pickerWrapper,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.WheelPicker, {
        mode: "date",
        value: value,
        onChange: onChange,
        monthLabels: monthLabels,
        locale: locale,
        minDateIso: minDateIso,
        maxDateIso: maxDateIso,
        autoInitialize: autoInitialize,
        itemTextStyle: styles.pickerStyle,
        testID: testID
      })
    })]
  });
};
exports.DatePicker = DatePicker;
const createStyles = theme => _reactNative.StyleSheet.create({
  description: {
    ...theme.typography.body.regular,
    color: theme.colors.text.secondary
  },
  pickerStyle: {
    ...theme.typography.headline.bold,
    color: theme.colors.text.primary
  },
  // flexGrow (not flex: 1) keeps a content-based basis, so the wheel keeps
  // its height inside auto-height modals and still fills full-screen hosts.
  container: {
    flexGrow: 1,
    gap: theme.space[6]
  },
  pickerWrapper: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    ...theme.typography.largeTitle.semibold,
    color: theme.colors.text.primary
  }
});
//# sourceMappingURL=DatePicker.js.map