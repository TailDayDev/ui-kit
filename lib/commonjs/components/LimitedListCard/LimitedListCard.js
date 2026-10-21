"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LimitedListCard = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../Card/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App default number of visible items. */
const DEFAULT_MAX_VISIBLE = 3;
const createStyles = theme => _reactNative.StyleSheet.create({
  containerList: {
    gap: theme.space[1]
  },
  items: {
    gap: theme.space[2]
  },
  moreText: {
    marginTop: theme.space[1]
  }
});

/** Shadowed card listing the first `maxVisible` items and a "+N more" line. */
const LimitedListCard = ({
  title,
  items,
  maxVisible = DEFAULT_MAX_VISIBLE,
  onPress,
  formatMoreLabel,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const visibleItems = items.slice(0, maxVisible);
  const remainingCount = items.length - visibleItems.length;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Card, {
    title: title,
    withShadow: true,
    onPress: onPress,
    accessibilityLabel: title,
    testID: testID,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.containerList,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.items,
        children: visibleItems.map((item, index) =>
        /*#__PURE__*/
        // Items are plain strings that may repeat; position is the stable key.
        (0, _jsxRuntime.jsx)(_index.Text, {
          variant: "body/regular",
          color: "primary",
          children: item
        }, index))
      }), remainingCount > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/regular",
        color: "secondary",
        style: styles.moreText,
        children: formatMoreLabel(remainingCount)
      }) : null]
    })
  });
};
exports.LimitedListCard = LimitedListCard;
//# sourceMappingURL=LimitedListCard.js.map