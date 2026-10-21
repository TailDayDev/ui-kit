"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDetailsCard = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../Card/index.js");
var _index4 = require("../LabeledDetailRow/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const createStyles = theme => _reactNative.StyleSheet.create({
  footer: {
    marginTop: theme.space[4]
  },
  header: {
    marginBottom: theme.space[4]
  },
  headerDivider: {
    backgroundColor: theme.colors.border.default,
    height: theme.stroke[1],
    width: '100%'
  },
  headerWithDivider: {
    gap: theme.space[3],
    marginBottom: theme.space[3]
  }
});
const isMessageProps = props => 'message' in props;

/** Card with label / value contact rows (or a message / empty text). */
const ContactDetailsCard = props => {
  const {
    disabled,
    title,
    testID,
    withShadow = false,
    header,
    hasHeaderDivider = false,
    footer,
    onPress
  } = props;
  const styles = (0, _index2.useThemedStyles)(createStyles);
  if (isMessageProps(props)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Card, {
      title: title,
      disabled: disabled,
      testID: testID,
      withShadow: withShadow,
      onPress: onPress,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        color: "secondary",
        children: props.message
      })
    });
  }
  const {
    emptyText,
    rows
  } = props;
  const isHeaderDividerVisible = hasHeaderDivider && rows.length > 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index3.Card, {
    title: title,
    disabled: disabled,
    testID: testID,
    withShadow: withShadow,
    onPress: onPress,
    children: [header ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.header, isHeaderDividerVisible ? styles.headerWithDivider : null],
      children: [header, isHeaderDividerVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.headerDivider
      }) : null]
    }) : null, rows.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      children: rows.map((row, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.LabeledDetailRow, {
        label: row.label,
        value: row.value,
        description: row.description,
        isLast: index === rows.length - 1,
        isValueNarrow: row.isValueNarrow,
        onPress: row.onPress,
        onValuePress: row.onValuePress,
        testID: row.testID,
        valueTestID: row.valueTestID
      }, row.id))
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      color: "secondary",
      children: emptyText
    }), footer ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.footer,
      children: footer
    }) : null]
  });
};
exports.ContactDetailsCard = ContactDetailsCard;
//# sourceMappingURL=ContactDetailsCard.js.map