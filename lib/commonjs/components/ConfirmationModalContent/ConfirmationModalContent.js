"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmationModalContent = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma ConfirmationModalContent › Картинка: 100×100 (off-scale).
const ILLUSTRATION_SIZE = 100;
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.space[8],
    paddingBottom: theme.space[6],
    paddingHorizontal: theme.space[6]
  },
  illustration: {
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    height: ILLUSTRATION_SIZE,
    justifyContent: 'center',
    overflow: 'hidden',
    width: ILLUSTRATION_SIZE
  },
  texts: {
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: theme.space[2]
  },
  text: {
    alignSelf: 'stretch'
  }
});

/**
 * Body of a confirmation sheet (Figma `ConfirmationModalContent`): a 100pt
 * picture, the question and an optional explanation, all centered.
 */
const ConfirmationModalContent = ({
  title,
  description,
  hasDescription = true,
  illustration,
  style,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const isDescriptionVisible = hasDescription && Boolean(description);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.container, style],
    testID: testID,
    children: [illustration ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.illustration,
      children: illustration
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.texts,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        accessibilityRole: "header",
        align: "center",
        style: styles.text,
        variant: "title/bold",
        children: title
      }), isDescriptionVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        align: "center",
        color: "secondary",
        style: styles.text,
        variant: "caption/regular",
        children: description
      }) : null]
    })]
  });
};
exports.ConfirmationModalContent = ConfirmationModalContent;
//# sourceMappingURL=ConfirmationModalContent.js.map