"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodaySkipReasonContent = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../OptionRow/index.js");
var _index4 = require("../Textarea/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// Figma TodaySkipReasonContent › Ввод причины › Поле: fixed height 132.
const REASON_FIELD_HEIGHT = 132;
const createStyles = theme => {
  const counterGap = theme.space[2];
  const counterLineHeight = theme.typography.smallCaption.medium.lineHeight ?? 0;
  // The kit Textarea draws its counter absolutely under the field; reserve
  // the Figma gap (8) + counter line (12) and pin the counter there.
  const counterSpace = counterGap + counterLineHeight;
  return _reactNative.StyleSheet.create({
    container: {
      gap: theme.space[8],
      paddingBottom: theme.space[6],
      paddingHorizontal: theme.space[6],
      paddingTop: theme.space[2]
    },
    heading: {
      gap: theme.space[2]
    },
    otherReason: {
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.lg,
      borderWidth: theme.stroke[1],
      gap: theme.space[2],
      // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
      padding: theme.space[4] - theme.stroke[1]
    },
    reasonCounter: {
      ...theme.typography.smallCaption.medium,
      // Absolute offsets start inside the field border; step out of it so
      // the counter lines up with the field's outer edge as in Figma.
      bottom: -(counterSpace + theme.stroke[1]),
      left: -theme.stroke[1],
      paddingTop: 0
    },
    reasonField: {
      height: REASON_FIELD_HEIGHT,
      justifyContent: 'flex-start',
      paddingBottom: 0,
      // Figma stroke is INSIDE; the Textarea border shifts content, so it is taken out of the padding.
      paddingHorizontal: theme.space[4] - theme.stroke[1],
      paddingTop: theme.space[3] - theme.stroke[1]
    },
    reasonFieldWithCounter: {
      marginBottom: counterSpace
    },
    reasonInput: {
      ...theme.typography.body.regular,
      flex: 1
    },
    reasons: {
      gap: theme.space[4]
    }
  });
};
const noopChange = () => undefined;

/**
 * Body of the skip-task modal (Figma `TodaySkipReasonContent`). Data in,
 * callbacks out: the parent owns the selected reason and the text.
 */
const TodaySkipReasonContent = ({
  title,
  subtitle,
  reasons,
  selectedReasonKey = null,
  onSelectReason,
  hasOtherReason = false,
  reasonLabel,
  reasonDescription = '',
  onReasonDescriptionChange = noopChange,
  reasonMaxLength,
  reasonPlaceholder,
  reasonInputTestID,
  style,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    testID: testID,
    style: [styles.container, style],
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.heading,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "largeTitle/semibold",
        accessibilityRole: "header",
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/regular",
        color: "secondary",
        children: subtitle
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.reasons,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        accessibilityRole: "radiogroup",
        accessibilityLabel: title,
        style: styles.reasons,
        children: reasons.map(reason => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.OptionRow, {
          label: reason.label,
          isSelected: reason.key === selectedReasonKey,
          onPress: () => onSelectReason(reason.key),
          testID: reason.testID
        }, reason.key))
      }), hasOtherReason ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        testID: testID ? `${testID}.otherReason` : undefined,
        style: styles.otherReason,
        children: [reasonLabel ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "headline/bold",
          children: reasonLabel
        }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.Textarea, {
          testID: reasonInputTestID,
          value: reasonDescription,
          setValue: onReasonDescriptionChange,
          placeholder: reasonPlaceholder,
          accessibilityLabel: reasonLabel,
          maxLength: reasonMaxLength,
          containerStyle: [styles.reasonField, reasonMaxLength ? styles.reasonFieldWithCounter : null],
          inputStyle: styles.reasonInput,
          counterStyle: styles.reasonCounter
        })]
      }) : null]
    })]
  });
};
exports.TodaySkipReasonContent = TodaySkipReasonContent;
//# sourceMappingURL=TodaySkipReasonContent.js.map