"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PullToRefreshErrorState = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Figma `PullToRefreshErrorState` frame width. */
const MAX_WIDTH = 382;
/** App title metrics, tighter than `title/medium` (Figma export values). */
const TITLE_LINE_HEIGHT = 24;
const TITLE_LETTER_SPACING = -0.32;
/** App description metrics, tighter than `body/regular` (Figma export values). */
const DESCRIPTION_LINE_HEIGHT = 17;
const DESCRIPTION_LETTER_SPACING = -0.154;
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    gap: theme.space[4],
    justifyContent: 'center',
    maxWidth: MAX_WIDTH,
    paddingHorizontal: theme.space[10],
    width: '100%'
  },
  texts: {
    alignItems: 'center',
    gap: theme.space[2],
    width: '100%'
  },
  title: {
    letterSpacing: TITLE_LETTER_SPACING,
    lineHeight: TITLE_LINE_HEIGHT,
    width: '100%'
  },
  description: {
    letterSpacing: DESCRIPTION_LETTER_SPACING,
    lineHeight: DESCRIPTION_LINE_HEIGHT,
    width: '100%'
  }
});

/** Load-error message shown inside a pull-to-refresh list. Figma: `PullToRefreshErrorState`. */
const PullToRefreshErrorState = ({
  title,
  description,
  illustration,
  style,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.container, style],
    testID: testID,
    children: [illustration, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.texts,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "title/medium",
        color: "primary",
        align: "center",
        style: styles.title,
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "body/regular",
        color: "secondary",
        align: "center",
        style: styles.description,
        children: description
      })]
    })]
  });
};
exports.PullToRefreshErrorState = PullToRefreshErrorState;
//# sourceMappingURL=PullToRefreshErrorState.js.map