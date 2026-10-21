"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fab = void 0;
var _reactNative = require("react-native");
var _PlusIcon = require("../../icons/PlusIcon.js");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Figma `Fab` frame: 56×56. */
const FAB_SIZE = 56;
/** Glyph size used by every app FAB (`PlusIcon size={28}`). */
const FAB_ICON_SIZE = 28;

/** Floating action button: 56pt green circle with a white glyph (Figma `Fab`). */
const Fab = ({
  onPress,
  accessibilityLabel,
  disabled = false,
  icon = _PlusIcon.PlusIcon,
  style,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Pressable, {
    onPress: onPress,
    disabled: disabled,
    accessibilityLabel: accessibilityLabel,
    testID: testID,
    style: [styles.fab, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
      icon: icon,
      size: FAB_ICON_SIZE,
      color: "text.inverse"
    })
  });
};
exports.Fab = Fab;
const createStyles = theme => _reactNative.StyleSheet.create({
  fab: {
    alignItems: 'center',
    backgroundColor: theme.palette.secondary,
    borderRadius: theme.radius.full,
    boxShadow: [...theme.shadows.fab],
    height: FAB_SIZE,
    justifyContent: 'center',
    width: FAB_SIZE
  }
});
//# sourceMappingURL=Fab.js.map