"use strict";

import { StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { OptionRow } from "../OptionRow/index.js";
import { Textarea } from "../Textarea/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodaySkipReasonContent › Ввод причины › Поле: fixed height 132.
const REASON_FIELD_HEIGHT = 132;
const createStyles = theme => {
  const counterGap = theme.space[2];
  const counterLineHeight = theme.typography.smallCaption.medium.lineHeight ?? 0;
  // The kit Textarea draws its counter absolutely under the field; reserve
  // the Figma gap (8) + counter line (12) and pin the counter there.
  const counterSpace = counterGap + counterLineHeight;
  return StyleSheet.create({
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
export const TodaySkipReasonContent = ({
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
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    style: [styles.container, style],
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.heading,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "largeTitle/semibold",
        accessibilityRole: "header",
        children: title
      }), /*#__PURE__*/_jsx(Text, {
        variant: "caption/regular",
        color: "secondary",
        children: subtitle
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.reasons,
      children: [/*#__PURE__*/_jsx(View, {
        accessibilityRole: "radiogroup",
        accessibilityLabel: title,
        style: styles.reasons,
        children: reasons.map(reason => /*#__PURE__*/_jsx(OptionRow, {
          label: reason.label,
          isSelected: reason.key === selectedReasonKey,
          onPress: () => onSelectReason(reason.key),
          testID: reason.testID
        }, reason.key))
      }), hasOtherReason ? /*#__PURE__*/_jsxs(View, {
        testID: testID ? `${testID}.otherReason` : undefined,
        style: styles.otherReason,
        children: [reasonLabel ? /*#__PURE__*/_jsx(Text, {
          variant: "headline/bold",
          children: reasonLabel
        }) : null, /*#__PURE__*/_jsx(Textarea, {
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
//# sourceMappingURL=TodaySkipReasonContent.js.map