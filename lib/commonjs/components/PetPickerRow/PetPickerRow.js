"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetPickerRow = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Pressable/index.js");
var _index2 = require("../../primitives/Text/index.js");
var _index3 = require("../../theme/index.js");
var _index4 = require("../PetOwnerAvatar/index.js");
var _index5 = require("../Radio/index.js");
var _index6 = require("../TodayPlacementList/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma PetPickerRow › Photo: PetOwnerAvatar 64.
const AVATAR_SIZE = 64;
// Figma PetPickerRow › Radio: size=20 (inner dot 10, as in StaffPickerRow).
const RADIO_SIZE = 20;
const RADIO_DOT_SIZE = 10;
const createStyles = theme => _reactNative.StyleSheet.create({
  row: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.lg,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    gap: theme.space[3],
    // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
    paddingHorizontal: theme.space[4] - theme.stroke[1],
    paddingVertical: theme.space[3] - theme.stroke[1]
  },
  rowSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  },
  texts: {
    alignSelf: 'stretch',
    flex: 1,
    gap: theme.space[0.5],
    justifyContent: 'center',
    minWidth: 0
  }
});

/**
 * Pet in a picker list (Figma `PetPickerRow`): photo with the owner badge,
 * name, meta, placements and a radio. The row is the radio for screen readers.
 */
const PetPickerRow = ({
  name,
  meta,
  placements = [],
  avatar,
  isSelected = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = (0, _index3.useThemedStyles)(createStyles);
  const [firstPlacement, secondPlacement] = placements;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index.Pressable, {
    testID: testID,
    accessibilityRole: "radio",
    accessibilityLabel: accessibilityLabel ?? name,
    accessibilityState: {
      checked: isSelected
    },
    disabled: disabled,
    onPress: onPress,
    style: [styles.row, isSelected ? styles.rowSelected : null, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.PetOwnerAvatar, {
      ...avatar,
      size: AVATAR_SIZE,
      testID: testID ? `${testID}.avatar` : undefined
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.texts,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
        variant: "headline/bold",
        numberOfLines: 1,
        children: name
      }), meta ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
        variant: "caption/regular",
        color: "secondary",
        numberOfLines: 1,
        children: meta
      }) : null, firstPlacement ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.TodayPlacementList, {
        itemsCount: secondPlacement ? 2 : 1,
        title: firstPlacement.title,
        image: firstPlacement.image,
        secondTitle: secondPlacement?.title,
        secondImage: secondPlacement?.image,
        testID: testID ? `${testID}.placements` : undefined
      }) : null]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.Radio, {
      isActive: isSelected,
      size: RADIO_SIZE,
      dotSize: RADIO_DOT_SIZE,
      testID: testID ? `${testID}.radio` : undefined
    })]
  });
};
exports.PetPickerRow = PetPickerRow;
//# sourceMappingURL=PetPickerRow.js.map