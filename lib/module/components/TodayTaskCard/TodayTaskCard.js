"use strict";

import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { TodayTaskFooter } from "../TodayTaskFooter/index.js";
import { TodayTaskHeader } from "../TodayTaskHeader/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodayTaskCard › Вуаль · выполнено: white fill at opacity 0.6.
const FINISHED_VEIL_OPACITY = 0.6;
const createStyles = theme => StyleSheet.create({
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.lg,
    opacity: FINISHED_VEIL_OPACITY
  }
});

/** Today feed task card: header, pet, details, footer and finished veil (Figma `TodayTaskCard`). */
export const TodayTaskCard = ({
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
  const styles = useThemedStyles(createStyles);
  const isSkipReasonVisible = hasSkipReason && Boolean(skipReason);
  const isVeilPressable = !footer.isMenuDisabled && !footer.isMenuLoading;
  return /*#__PURE__*/_jsx(View, {
    testID: testID,
    style: [styles.card, style],
    children: /*#__PURE__*/_jsxs(View, {
      accessibilityLabel: accessibilityLabel,
      style: styles.content,
      children: [hasHeader && header ? /*#__PURE__*/_jsx(TodayTaskHeader, {
        ...header
      }) : null, hasPet && pet ? pet : null, hasDetails && details ? details : null, /*#__PURE__*/_jsx(TodayTaskFooter, {
        ...footer
      }), isFinished ?
      /*#__PURE__*/
      // Figma: the veil covers the whole card, footer included; a tap
      // on a finished card opens the «⋮» sheet.
      _jsx(Pressable, {
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
      _jsx(View, {
        style: styles.skipReason,
        children: /*#__PURE__*/_jsx(Text, {
          variant: "caption/regular",
          color: "secondary",
          children: skipReason
        })
      }) : null]
    })
  });
};
//# sourceMappingURL=TodayTaskCard.js.map