"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalHeader = void 0;
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Text/index.js");
var _index4 = require("../../theme/index.js");
var _index5 = require("../IconButton/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma ModalHeader › CloseButton: IconRoundButton size=36.
const CLOSE_BUTTON_SIZE = 36;
// Figma ModalHeader › CloseButton › x: 20×20.
const CLOSE_GLYPH_SIZE = 20;
const createStyles = theme => _reactNative.StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    flexDirection: 'row',
    gap: theme.space[2],
    justifyContent: 'flex-end',
    // Left 56 = close button (36) + gap (8) + right padding (12): keeps the title centered.
    paddingBottom: theme.space[3],
    paddingLeft: theme.space[14],
    paddingRight: theme.space[3],
    paddingTop: theme.space[3]
  },
  title: {
    flex: 1
  }
});

/** Bottom-sheet header (Figma `ModalHeader`): centered title, round × on the right. */
const ModalHeader = ({
  title,
  hasTitle = true,
  onClose,
  closeAccessibilityLabel,
  isDisabled = false,
  closeTestID,
  style,
  testID
}) => {
  const styles = (0, _index4.useThemedStyles)(createStyles);
  const isTitleVisible = hasTitle && Boolean(title);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.header, style],
    testID: testID,
    children: [isTitleVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
      accessibilityRole: "header",
      align: "center",
      ellipsizeMode: "tail",
      numberOfLines: 1,
      style: styles.title,
      variant: "headline/bold",
      children: title
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.IconRoundButton, {
      accessibilityLabel: closeAccessibilityLabel,
      disabled: isDisabled,
      icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
        icon: _index.IconX,
        size: CLOSE_GLYPH_SIZE
      }),
      onPress: onClose,
      size: CLOSE_BUTTON_SIZE,
      testID: closeTestID
    })]
  });
};
exports.ModalHeader = ModalHeader;
//# sourceMappingURL=ModalHeader.js.map