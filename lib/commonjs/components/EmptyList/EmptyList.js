"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyList = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App top offset of the placeholder (off-scale). */
const TOP_OFFSET = 150;
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: TOP_OFFSET,
    gap: theme.space[4]
  }
});

/** "No results" placeholder for lists: an image above a grey message. */
const EmptyList = ({
  message,
  illustration,
  style,
  textStyle,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.container, style],
    testID: testID,
    children: [illustration, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "headline/medium",
      color: "secondary",
      style: textStyle,
      children: message
    })]
  });
};
exports.EmptyList = EmptyList;
//# sourceMappingURL=EmptyList.js.map