"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoRow = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  childrenContainer: {
    alignItems: 'center',
    flexShrink: 0,
    justifyContent: 'center'
  },
  shrinkable: {
    flexShrink: 1
  },
  infoContainer: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    gap: theme.space[1],
    paddingRight: theme.space[4]
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    paddingVertical: theme.space[2],
    width: '100%'
  }
});

/** Settings row: title and caption on the left, a control on the right. */
const InfoRow = ({
  children,
  title,
  description
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.row,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.infoContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "headline/regular",
        style: styles.shrinkable,
        children: title
      }), description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/regular",
        color: "secondary",
        style: styles.shrinkable,
        children: description
      }) : null]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.childrenContainer,
      children: children
    })]
  });
};
exports.InfoRow = InfoRow;
//# sourceMappingURL=InfoRow.js.map