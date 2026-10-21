"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiActionDetailsContent = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../TodayTaskCard/index.js");
var _index3 = require("../TodayTaskHeader/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  body: {
    backgroundColor: theme.colors.bg.screen,
    flex: 1,
    paddingTop: theme.space[2]
  },
  // Header stays put while the cards scroll (app MultiActionDetails).
  header: {
    paddingHorizontal: theme.space[4]
  },
  list: {
    flex: 1
  },
  // Figma body: gap 16 between all children, padding 8/16/24/16.
  listContent: {
    gap: theme.space[4],
    paddingBottom: theme.space[6],
    paddingHorizontal: theme.space[4],
    paddingTop: theme.space[4]
  }
});

/** Details modal body: shared task header and one card per pet (Figma `MultiActionDetailsContent`). */
const MultiActionDetailsContent = ({
  header,
  items,
  nestedOverlay,
  style,
  testID,
  listTestID
}) => {
  const styles = (0, _index.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    style: [styles.body, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.header,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.TodayTaskHeader, {
        ...header
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
      testID: listTestID,
      showsVerticalScrollIndicator: false,
      style: styles.list,
      contentContainerStyle: styles.listContent,
      children: items.map(({
        id,
        ...card
      }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.TodayTaskCard, {
        ...card,
        hasHeader: false
      }, id))
    }), nestedOverlay]
  });
};
exports.MultiActionDetailsContent = MultiActionDetailsContent;
//# sourceMappingURL=MultiActionDetailsContent.js.map