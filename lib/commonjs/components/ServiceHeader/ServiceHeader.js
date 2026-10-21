"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceHeader = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Text/index.js");
var _index4 = require("../../theme/index.js");
var _index5 = require("../IconButton/index.js");
var _index6 = require("../ServiceHeaderTrigger/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma ServiceHeader › Гостиница и поиск: 40pt row (FIXED in forceTitleOnly=true).
const HEADER_ROW_HEIGHT = 40;
// Figma ServiceHeader › Поиск: IconRoundButton size=40.
const SEARCH_BUTTON_SIZE = 40;
const createStyles = theme => _reactNative.StyleSheet.create({
  surface: {
    backgroundColor: theme.colors.bg.surface,
    boxShadow: [...theme.shadows.bar],
    gap: theme.space[2],
    paddingVertical: theme.space[2]
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: HEADER_ROW_HEIGHT,
    paddingHorizontal: theme.space[4]
  },
  rowTitleOnly: {
    height: HEADER_ROW_HEIGHT
  },
  title: {
    flexShrink: 1
  }
});
const ServiceHeaderComponent = props => {
  const {
    hasSearch = true,
    search,
    hasBottomContent = true,
    bottomContent,
    style,
    testID
  } = props;
  const styles = (0, _index4.useThemedStyles)(createStyles);
  const isSearchVisible = !props.forceTitleOnly && hasSearch && search;
  const isBottomContentVisible = hasBottomContent && Boolean(bottomContent);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.surface, style],
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.row, props.forceTitleOnly && styles.rowTitleOnly],
      children: [props.forceTitleOnly ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
        variant: "title/bold",
        accessibilityRole: "header",
        numberOfLines: 1,
        ellipsizeMode: "tail",
        style: styles.title,
        children: props.title
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index6.ServiceHeaderTrigger, {
        ...props.trigger
      }), isSearchVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.IconRoundButton, {
        icon: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
          icon: _index.IconSearch
        }),
        size: SEARCH_BUTTON_SIZE,
        onPress: search.onPress,
        accessibilityLabel: search.accessibilityLabel,
        testID: search.testID
      }) : null]
    }), isBottomContentVisible ? bottomContent : null]
  });
};

/**
 * Header of the hotel sections: hotel selector (or a plain title), search and
 * an optional filters row. Figma `ServiceHeader`.
 */
const ServiceHeader = exports.ServiceHeader = /*#__PURE__*/(0, _react.memo)(ServiceHeaderComponent);
//# sourceMappingURL=ServiceHeader.js.map