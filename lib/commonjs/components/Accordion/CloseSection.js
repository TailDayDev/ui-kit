"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseSection = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[2],
    justifyContent: 'space-between',
    minWidth: 0,
    overflow: 'hidden'
  },
  label: {
    flexShrink: 0
  },
  value: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0
  }
});

/** Closed-accordion summary row: label left, value (or placeholder) right. */
const CloseSection = ({
  label,
  value,
  emptyLabel
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "headline/regular",
      style: styles.label,
      numberOfLines: 1,
      ellipsizeMode: "tail",
      children: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "headline/bold",
      color: value ? 'primary' : 'secondary',
      align: "right",
      style: styles.value,
      numberOfLines: 1,
      ellipsizeMode: "tail",
      children: value || emptyLabel
    })]
  });
};
exports.CloseSection = CloseSection;
//# sourceMappingURL=CloseSection.js.map