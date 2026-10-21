"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayManualStaffPickerContent = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../StaffPickerRow/index.js");
var _index3 = require("../PickerNoneRow/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    paddingBottom: theme.space[6],
    paddingHorizontal: theme.space[6],
    paddingTop: theme.space[2]
  },
  list: {
    gap: theme.space[2]
  }
});

/**
 * Body of the "choose staff" modal (Figma `TodayManualStaffPickerContent`).
 * The parent owns the (draft) selection; the modal and its footer stay outside.
 */
const TodayManualStaffPickerContent = ({
  staff,
  selectedId,
  onSelect,
  noneLabel,
  accessibilityLabel,
  noneTestID,
  style,
  testID
}) => {
  const styles = (0, _index.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    testID: testID,
    style: [styles.container, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      accessibilityRole: "radiogroup",
      accessibilityLabel: accessibilityLabel,
      style: styles.list,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.PickerNoneRow, {
        label: noneLabel,
        isSelected: selectedId === null,
        onPress: () => onSelect(null),
        testID: noneTestID
      }), staff.map(member => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.StaffPickerRow, {
        name: member.name,
        position: member.position,
        imageUrl: member.imageUrl,
        renderImage: member.renderImage,
        isSelected: member.id === selectedId,
        onPress: () => onSelect(member.id),
        testID: member.testID
      }, member.id))]
    })
  });
};
exports.TodayManualStaffPickerContent = TodayManualStaffPickerContent;
//# sourceMappingURL=TodayManualStaffPickerContent.js.map