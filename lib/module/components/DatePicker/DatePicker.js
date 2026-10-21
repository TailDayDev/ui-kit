"use strict";

import { StyleSheet, Text, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { WheelPicker } from "../WheelPicker/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Optional title and description above a date wheel. */
export const DatePicker = ({
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
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    children: [!!label && /*#__PURE__*/_jsx(Text, {
      accessibilityRole: "header",
      style: styles.title,
      children: label
    }), !!description && /*#__PURE__*/_jsx(Text, {
      style: styles.description,
      children: description
    }), /*#__PURE__*/_jsx(View, {
      style: styles.pickerWrapper,
      children: /*#__PURE__*/_jsx(WheelPicker, {
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
const createStyles = theme => StyleSheet.create({
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