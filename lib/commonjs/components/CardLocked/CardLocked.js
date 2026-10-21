"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardLocked = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Icon/index.js");
var _index2 = require("../../primitives/Text/index.js");
var _index3 = require("../../theme/index.js");
var _LockIcon = require("../../icons/LockIcon.js");
var _index4 = require("../Card/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Padlock size in the app `CardLocked` (off-scale: smaller than the 24pt icon frame). */
const LOCK_ICON_SIZE = 20;
const createStyles = theme => _reactNative.StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.border.default
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[3],
    justifyContent: 'space-between',
    width: '100%'
  },
  iconBlock: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    minWidth: _index.DEFAULT_ICON_SIZE
  },
  textBlock: {
    flex: 1,
    gap: theme.space[3]
  }
});

/** Read-only card for a value that cannot be edited, with a padlock on the right. */
const CardLocked = ({
  title,
  value,
  testID
}) => {
  const theme = (0, _index3.useTheme)();
  const styles = (0, _index3.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.Card, {
    cardStyles: styles.card,
    style: styles.card,
    pointerEvents: "none",
    testID: testID,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.content,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.textBlock,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
          variant: "headline/bold",
          color: "secondary",
          numberOfLines: 1,
          ellipsizeMode: "tail",
          children: title
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
          variant: "body/regular",
          color: "secondary",
          children: value
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.iconBlock,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LockIcon.LockIcon, {
          color: theme.palette.lightGray,
          size: LOCK_ICON_SIZE
        })
      })]
    })
  });
};
exports.CardLocked = CardLocked;
//# sourceMappingURL=CardLocked.js.map