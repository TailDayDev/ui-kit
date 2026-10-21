"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayManualPetPickerContent = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../PetPickerRow/index.js");
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
 * Body of the "choose pet" modal (Figma `TodayManualPetPickerContent`).
 * The parent owns the (draft) selection; the modal and its footer stay outside.
 */
const TodayManualPetPickerContent = ({
  pets,
  selectedId,
  onSelect,
  noneLabel,
  noneTestID,
  accessibilityLabel,
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
      }), pets.map(pet => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.PetPickerRow, {
        name: pet.name,
        meta: pet.meta,
        placements: pet.placements,
        avatar: pet.avatar,
        isSelected: pet.id === selectedId,
        onPress: () => onSelect(pet.id),
        testID: pet.testID
      }, pet.id))]
    })
  });
};
exports.TodayManualPetPickerContent = TodayManualPetPickerContent;
//# sourceMappingURL=TodayManualPetPickerContent.js.map