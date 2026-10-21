"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoCard = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    gap: theme.space[4],
    flex: 1
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: theme.space[1]
  }
});

/** Row with a leading illustration, a bold title and an optional caption. */
const InfoCard = ({
  icon,
  title,
  description
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.card,
    children: [icon, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.rightContainer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "body/bold",
        color: "primary",
        children: title
      }), description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/regular",
        color: "secondary",
        children: description
      }) : null]
    })]
  });
};
exports.InfoCard = InfoCard;
//# sourceMappingURL=InfoCard.js.map