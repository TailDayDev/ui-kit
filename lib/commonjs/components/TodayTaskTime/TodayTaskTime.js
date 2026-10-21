"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayTaskTime = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const styles = _reactNative.StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexShrink: 0
  }
});
const TONE_COLORS = {
  default: {
    title: 'primary',
    subtitle: 'secondary'
  },
  overdue: {
    title: 'error',
    subtitle: 'error'
  },
  completed: {
    title: 'primary',
    subtitle: 'secondary'
  }
};

/** Right-aligned task time and caption of a Today task card (Figma `TodayTaskTime`). */
const TodayTaskTime = ({
  title,
  subtitle,
  hasSubtitle = true,
  tone = 'default',
  style,
  testID
}) => {
  const colors = TONE_COLORS[tone];
  const isSubtitleVisible = hasSubtitle && Boolean(subtitle);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    style: [styles.container, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "headline/bold",
      color: colors.title,
      align: "right",
      numberOfLines: 1,
      children: title
    }), isSubtitleVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "smallCaption/regular",
      color: colors.subtitle,
      align: "right",
      numberOfLines: 1,
      children: subtitle
    }) : null]
  });
};
exports.TodayTaskTime = TodayTaskTime;
//# sourceMappingURL=TodayTaskTime.js.map