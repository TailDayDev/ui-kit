"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayScreenState = void 0;
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Text/index.js");
var _index4 = require("../../theme/index.js");
var _index5 = require("../Button/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodayScreenState › Картинка: 120×120 (off-scale).
const ILLUSTRATION_SIZE = 120;
// Figma TodayScreenState kind=offline: band height 40.
const OFFLINE_BAR_HEIGHT = 40;
// Figma TodayScreenState kind=offline › wifi-off: 16×16.
const OFFLINE_ICON_SIZE = 16;

/** Figma variants that carry the action button. */
const KINDS_WITH_ACTION = ['no-auth', 'no-hotel', 'no-results'];
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: theme.space[12],
    justifyContent: 'center',
    paddingHorizontal: theme.space[10]
  },
  illustration: {
    alignItems: 'center',
    height: ILLUSTRATION_SIZE,
    justifyContent: 'center',
    width: ILLUSTRATION_SIZE
  },
  message: {
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: theme.space[4]
  },
  offlineBar: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: theme.colors.bg.subtle,
    flexDirection: 'row',
    gap: theme.space[2],
    height: OFFLINE_BAR_HEIGHT,
    paddingHorizontal: theme.space[4]
  },
  text: {
    alignSelf: 'stretch'
  },
  texts: {
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: theme.space[2]
  }
});

/**
 * Today screen state (Figma `TodayScreenState`): picture, title, explanation
 * and an action button for `no-auth` / `no-hotel` / `empty` / `no-results`;
 * a full-width "no network" band for `offline`.
 */
const TodayScreenState = ({
  kind = 'no-auth',
  label,
  title,
  description,
  illustration,
  actionLabel,
  onAction,
  actionTestID,
  style,
  testID
}) => {
  const styles = (0, _index4.useThemedStyles)(createStyles);
  if (kind === 'offline') {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.offlineBar, style],
      testID: testID,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
        icon: _index.IconWifiOff,
        size: OFFLINE_ICON_SIZE
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
        color: "secondary",
        variant: "caption/regular",
        children: label
      })]
    });
  }
  const isActionVisible = KINDS_WITH_ACTION.includes(kind) && Boolean(actionLabel) && Boolean(onAction);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.container, style],
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.message,
      children: [illustration ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.illustration,
        children: illustration
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.texts,
        children: [title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
          accessibilityRole: "header",
          align: "center",
          style: styles.text,
          variant: "title/medium",
          children: title
        }) : null, description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
          align: "center",
          color: "secondary",
          style: styles.text,
          variant: "body/regular",
          children: description
        }) : null]
      })]
    }), isActionVisible && actionLabel && onAction ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index5.Button, {
      onPress: onAction,
      testID: actionTestID,
      title: actionLabel
    }) : null]
  });
};
exports.TodayScreenState = TodayScreenState;
//# sourceMappingURL=TodayScreenState.js.map