"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tag = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _areNormalizedIdsEqual = require("./areNormalizedIdsEqual.js");
var _jsxRuntime = require("react/jsx-runtime");
/** React Native `TouchableOpacity` default, which the app `Tag` relies on. */
const TAG_ACTIVE_OPACITY = 0.2;
const createStyles = theme => _reactNative.StyleSheet.create({
  codeItem: {
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.sm,
    borderWidth: theme.stroke[1],
    maxWidth: 'auto',
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[3]
  },
  selectedItem: {
    backgroundColor: theme.colors.bg.accentSoft,
    // No `border.accent` role yet.
    borderColor: theme.palette.primary
  }
});

/** Selectable chip (single tag of a multi-select group). */
const Tag = ({
  item,
  selectedItems,
  handlePress,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const id = item.id ?? '';
  const isSelected = selectedItems.some(selectedId => (0, _areNormalizedIdsEqual.areNormalizedIdsEqual)(selectedId, id));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    activeOpacity: TAG_ACTIVE_OPACITY,
    style: [styles.codeItem, isSelected && styles.selectedItem],
    onPress: () => handlePress(id),
    testID: testID,
    accessibilityRole: "button",
    accessibilityState: {
      selected: isSelected
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "body/medium",
      color: isSelected ? 'accent' : 'primary',
      children: item.title
    })
  });
};
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map