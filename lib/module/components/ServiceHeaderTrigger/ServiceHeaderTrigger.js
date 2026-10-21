"use strict";

import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconChevronDown } from "../../icons/figma/index.js";
import { DEFAULT_ICON_SIZE, Icon } from "../../primitives/Icon/index.js";
import { Pressable } from "../../primitives/Pressable/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma ServiceHeaderTrigger › Картинка: 40×40 circle.
const IMAGE_SIZE = 40;
// Figma ServiceHeaderTrigger › Бейдж: minW 20.
const BADGE_MIN_WIDTH = 20;
// Figma ServiceHeaderTrigger › Бейдж: placed at (22, -4) from the chevron frame.
const BADGE_LEFT = 22;
const BADGE_TOP = -4;
const createStyles = theme => StyleSheet.create({
  trigger: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: theme.space[2],
    minWidth: 0
  },
  image: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: theme.radius.full,
    height: IMAGE_SIZE,
    justifyContent: 'center',
    overflow: 'hidden',
    width: IMAGE_SIZE
  },
  title: {
    flexShrink: 1,
    minWidth: 0
  },
  chevron: {
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: theme.radius.full,
    height: DEFAULT_ICON_SIZE,
    width: DEFAULT_ICON_SIZE
  },
  badge: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.accent,
    borderRadius: theme.radius.lg,
    justifyContent: 'center',
    left: BADGE_LEFT,
    minWidth: BADGE_MIN_WIDTH,
    paddingHorizontal: theme.space[1],
    position: 'absolute',
    top: BADGE_TOP
  }
});
const ServiceHeaderTriggerComponent = ({
  titleSelected,
  notifications,
  hasNotificationsBadge = true,
  image,
  onPress,
  accessibilityLabel,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const isInteractive = Boolean(onPress);
  const isBadgeVisible = hasNotificationsBadge && notifications !== undefined;
  return /*#__PURE__*/_jsxs(Pressable, {
    onPress: onPress,
    isFeedbackDisabled: !isInteractive,
    accessibilityRole: isInteractive ? 'button' : 'none',
    accessibilityLabel: accessibilityLabel ?? titleSelected,
    style: [styles.trigger, style],
    testID: testID,
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.image,
      children: image
    }), /*#__PURE__*/_jsx(Text, {
      variant: "title/bold",
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: styles.title,
      children: titleSelected
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.chevron,
      children: [/*#__PURE__*/_jsx(Icon, {
        icon: IconChevronDown
      }), isBadgeVisible ? /*#__PURE__*/_jsx(View, {
        style: styles.badge,
        testID: testID ? `${testID}.badge` : undefined,
        children: /*#__PURE__*/_jsx(Text, {
          variant: "caption/medium",
          color: "inverse",
          align: "center",
          children: notifications
        })
      }) : null]
    })]
  });
};

/** Hotel selector: photo, name, chevron and a new-bookings badge. Figma `ServiceHeaderTrigger`. */
export const ServiceHeaderTrigger = /*#__PURE__*/memo(ServiceHeaderTriggerComponent);
//# sourceMappingURL=ServiceHeaderTrigger.js.map