"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoImagePlaceholder = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _jsxRuntime = require("react/jsx-runtime");
const styles = _reactNative.StyleSheet.create({
  // DinamicImage frame: square, clips its content.
  frame: {
    overflow: 'hidden',
    position: 'relative'
  }
});
const NoImagePlaceholderComponent = ({
  color,
  size = '100%',
  renderImage,
  accessibilityLabel,
  testID
}) => {
  const isDecorative = !accessibilityLabel;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [styles.frame, {
      width: size,
      height: size
    }],
    testID: testID,
    accessible: !isDecorative,
    accessibilityRole: isDecorative ? undefined : 'image',
    accessibilityLabel: accessibilityLabel,
    accessibilityElementsHidden: isDecorative,
    importantForAccessibility: isDecorative ? 'no-hide-descendants' : 'auto',
    children: renderImage?.({
      size,
      color
    })
  });
};

/** Square "no image" frame; the artwork comes from `renderImage`. */
const NoImagePlaceholder = exports.NoImagePlaceholder = /*#__PURE__*/(0, _react.memo)(NoImagePlaceholderComponent);
//# sourceMappingURL=NoImagePlaceholder.js.map