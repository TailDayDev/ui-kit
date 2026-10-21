"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodaySkippedAction = void 0;
var _reactNative = require("react-native");
var _index = require("../../icons/figma/index.js");
var _index2 = require("../../primitives/Icon/index.js");
var _index3 = require("../../primitives/Text/index.js");
var _index4 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodaySkippedAction: capsule 180×48 (FIXED, no width token).
const CAPSULE_WIDTH = 180;
// Figma TodaySkippedAction › Ручка › x: 20×20.
const HANDLE_ICON_SIZE = 20;
const createStyles = theme => _reactNative.StyleSheet.create({
  capsule: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.full,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    height: theme.space[12],
    justifyContent: 'space-between',
    overflow: 'hidden',
    // Figma strokes are INSIDE and do not shift auto-layout content; RN
    // borders do, so the border width is taken out of the padding.
    paddingLeft: theme.space[6] - theme.stroke[1],
    paddingRight: theme.space[1] - theme.stroke[1],
    width: CAPSULE_WIDTH
  },
  handle: {
    alignItems: 'center',
    backgroundColor: theme.colors.icon.default,
    borderRadius: theme.radius.full,
    height: theme.space[10],
    justifyContent: 'center',
    width: theme.space[10]
  },
  label: {
    flexShrink: 1
  }
});

/**
 * Footer state of a skipped Today task (Figma `TodaySkippedAction`): an
 * inactive soft-gray capsule with the status text and a gray × handle.
 * Not interactive; the skip reason is a card layer, not part of this component.
 */
const TodaySkippedAction = ({
  label,
  style,
  testID
}) => {
  const styles = (0, _index4.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    accessible: true,
    accessibilityRole: "text",
    accessibilityLabel: label,
    style: [styles.capsule, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Text, {
      variant: "headline/medium",
      numberOfLines: 1,
      style: styles.label,
      children: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.handle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Icon, {
        icon: _index.IconX,
        size: HANDLE_ICON_SIZE,
        color: "text.inverse"
      })
    })]
  });
};
exports.TodaySkippedAction = TodaySkippedAction;
//# sourceMappingURL=TodaySkippedAction.js.map