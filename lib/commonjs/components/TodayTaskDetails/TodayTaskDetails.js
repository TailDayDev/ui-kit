"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayTaskDetails = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodayTaskDetails › Иконка: 24×24 artwork.
const ICON_SIZE = 24;
const createStyles = theme => _reactNative.StyleSheet.create({
  block: {
    gap: theme.space[3],
    justifyContent: 'center',
    padding: theme.space[4]
  },
  divider: {
    alignSelf: 'stretch',
    backgroundColor: theme.colors.border.default,
    height: theme.stroke[1]
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: theme.space[3]
  },
  icon: {
    alignItems: 'center',
    height: ICON_SIZE,
    justifyContent: 'center',
    width: ICON_SIZE
  },
  task: {
    gap: theme.space[1]
  },
  title: {
    flex: 1
  }
});

/** Task details under a divider: icon, title, amount and note (Figma `TodayTaskDetails`). */
const TodayTaskDetails = ({
  title,
  hasIcon = true,
  icon,
  hasTrailing = true,
  trailing,
  hasNote = true,
  note,
  style,
  testID,
  titleTestID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const isIconVisible = hasIcon && Boolean(icon);
  const isTrailingVisible = hasTrailing && Boolean(trailing);
  const isNoteVisible = hasNote && Boolean(note);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    style: [styles.block, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.divider
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.task,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.header,
        children: [isIconVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.icon,
          children: icon
        }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          testID: titleTestID,
          variant: "body/bold",
          style: styles.title,
          children: title
        }), isTrailingVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "body/regular",
          children: trailing
        }) : null]
      }), isNoteVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/regular",
        color: "secondary",
        children: note
      }) : null]
    })]
  });
};
exports.TodayTaskDetails = TodayTaskDetails;
//# sourceMappingURL=TodayTaskDetails.js.map