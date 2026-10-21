"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OfflineDataBar = void 0;
var _reactNative = require("react-native");
var _WifiOffIcon = require("../../icons/WifiOffIcon.js");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App band height. */
const BAR_HEIGHT = 40;
/** App icon size. */
const ICON_SIZE = 16;
/** App label line height, tighter than `caption/regular` (14). */
const LABEL_LINE_HEIGHT = 12;
const createStyles = theme => _reactNative.StyleSheet.create({
  bar: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    flexDirection: 'row',
    gap: theme.space[2],
    height: BAR_HEIGHT,
    paddingHorizontal: theme.space[4],
    width: '100%'
  },
  label: {
    lineHeight: LABEL_LINE_HEIGHT
  }
});

/** Full-width band telling the user the list shows data without a network. */
const OfflineDataBar = ({
  label,
  style,
  testID
}) => {
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.bar, style],
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_WifiOffIcon.WifiOffIcon, {
      color: theme.colors.icon.default,
      size: ICON_SIZE
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "caption/regular",
      color: "secondary",
      style: styles.label,
      children: label
    })]
  });
};
exports.OfflineDataBar = OfflineDataBar;
//# sourceMappingURL=OfflineDataBar.js.map