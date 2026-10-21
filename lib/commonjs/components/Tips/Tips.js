"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tips = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  tipsContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.successSoft,
    borderRadius: theme.radius.lg,
    flexDirection: 'row',
    gap: theme.space[3],
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[3],
    width: '100%'
  },
  tipsText: {
    flex: 1,
    flexShrink: 1,
    flexWrap: 'wrap'
  }
});

/** Green hint banner with a leading illustration. */
const Tips = ({
  icon,
  text
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.tipsContainer,
    children: [icon, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "caption/regular",
      style: styles.tipsText,
      children: text
    })]
  });
};
exports.Tips = Tips;
//# sourceMappingURL=Tips.js.map