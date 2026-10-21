"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodayTaskCard = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../TodayTaskFooter/index.js");
var _index4 = require("../TodayTaskHeader/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodayTaskCard › Вуаль · выполнено: white fill at opacity 0.6.
const FINISHED_VEIL_OPACITY = 0.6;
const createStyles = theme => _reactNative.StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.lg,
    boxShadow: [...theme.shadows.block]
  },
  // Clips the header badge (square left corners) to the card radius.
  content: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden'
  },
  skipReason: {
    paddingBottom: theme.space[4],
    paddingHorizontal: theme.space[4],
    paddingTop: 0
  },
  veil: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.lg,
    opacity: FINISHED_VEIL_OPACITY
  }
});

/** Today feed task card: header, pet, details, footer and finished veil (Figma `TodayTaskCard`). */
const TodayTaskCard = ({
  hasHeader = true,
  header,
  hasPet = true,
  pet,
  hasDetails = true,
  details,
  footer,
  isFinished = false,
  hasSkipReason = false,
  skipReason,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const isSkipReasonVisible = hasSkipReason && Boolean(skipReason);
  const isVeilPressable = !footer.isMenuDisabled && !footer.isMenuLoading;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    testID: testID,
    style: [styles.card, style],
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      accessibilityLabel: accessibilityLabel,
      style: styles.content,
      children: [hasHeader && header ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.TodayTaskHeader, {
        ...header
      }) : null, hasPet && pet ? pet : null, hasDetails && details ? details : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.TodayTaskFooter, {
        ...footer
      }), isFinished ?
      /*#__PURE__*/
      // Figma: the veil covers the whole card, footer included; a tap
      // on a finished card opens the «⋮» sheet.
      (0, _jsxRuntime.jsx)(_reactNative.Pressable, {
        testID: testID ? `${testID}.veil` : undefined,
        accessibilityRole: "button",
        accessibilityLabel: footer.menuAccessibilityLabel,
        accessibilityState: {
          disabled: !isVeilPressable
        },
        disabled: !isVeilPressable,
        onPress: footer.onMenuPress,
        style: styles.veil
      }) : null, isSkipReasonVisible ?
      /*#__PURE__*/
      // Above the veil: the reason stays readable on a finished card.
      (0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.skipReason,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "caption/regular",
          color: "secondary",
          children: skipReason
        })
      }) : null]
    })
  });
};
exports.TodayTaskCard = TodayTaskCard;
//# sourceMappingURL=TodayTaskCard.js.map