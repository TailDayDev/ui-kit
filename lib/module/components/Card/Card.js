"use strict";

import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/** Pressed opacity of a tappable card (app `Card`; differs from `opacity.pressed`). */
const CARD_PRESSED_OPACITY = 0.8;
const createStyles = theme => StyleSheet.create({
  card: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.lg,
    borderWidth: theme.stroke[1],
    gap: theme.space[3],
    padding: theme.space[4],
    width: '100%'
  },
  cardShadow: {
    boxShadow: [...theme.shadows.block]
  },
  pressed: {
    opacity: CARD_PRESSED_OPACITY
  },
  topContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: theme.space[1],
    width: '100%'
  },
  leadingHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[2],
    flex: 1
  }
});

/** Bordered surface with an optional title row. Tappable when `onPress` is set. */
export const Card = ({
  title,
  children,
  additional,
  additionalPosition = 'right',
  cardStyles,
  onPress,
  disabled = false,
  withShadow = false,
  pointerEvents = 'auto',
  topContainerStyles,
  style,
  testID,
  titleNumberOfLines = 1,
  titleStyles,
  accessibilityLabel
}) => {
  const styles = useThemedStyles(createStyles);
  const titleText = /*#__PURE__*/_jsx(Text, {
    variant: "headline/bold",
    color: "primary",
    style: titleStyles,
    numberOfLines: titleNumberOfLines,
    ellipsizeMode: "tail",
    children: title
  });
  const header = title ? /*#__PURE__*/_jsx(View, {
    style: [styles.topContainer, topContainerStyles],
    children: additionalPosition === 'left' ? /*#__PURE__*/_jsxs(View, {
      style: styles.leadingHeader,
      children: [additional, titleText]
    }) : /*#__PURE__*/_jsxs(_Fragment, {
      children: [titleText, additional]
    })
  }) : null;
  if (onPress) {
    return /*#__PURE__*/_jsxs(Pressable, {
      onPress: disabled ? undefined : onPress,
      pointerEvents: pointerEvents,
      disabled: disabled,
      testID: testID,
      accessibilityLabel: accessibilityLabel,
      accessibilityRole: "button",
      accessibilityState: {
        disabled
      },
      style: ({
        pressed
      }) => [styles.card, style, withShadow && styles.cardShadow, cardStyles, pressed && !disabled && styles.pressed],
      children: [header, children]
    });
  }
  return /*#__PURE__*/_jsxs(View, {
    pointerEvents: pointerEvents,
    testID: testID,
    style: [styles.card, style, withShadow && styles.cardShadow, cardStyles],
    children: [header, children]
  });
};
//# sourceMappingURL=Card.js.map