"use strict";

import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { IconTabToday } from "../../icons/figma/index.js";
import { DEFAULT_ICON_SIZE, Icon } from "../../primitives/Icon/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TabBarItem: FIXED width 92.
const TAB_BAR_ITEM_WIDTH = 92;
// Figma TabBarItem › Badge: 6×6 ellipse.
const BADGE_SIZE = 6;
// Figma TabBarItem › Badge: placed at (23, -2) from the icon origin.
const BADGE_LEFT = 23;
const BADGE_TOP = -2;
const createStyles = theme => StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: theme.space[3],
    width: TAB_BAR_ITEM_WIDTH
  },
  iconWrapper: {
    height: DEFAULT_ICON_SIZE,
    width: DEFAULT_ICON_SIZE
  },
  badge: {
    backgroundColor: theme.colors.bg.accent,
    borderRadius: theme.radius.full,
    height: BADGE_SIZE,
    left: BADGE_LEFT,
    position: 'absolute',
    top: BADGE_TOP,
    width: BADGE_SIZE
  }
});
const TabBarItemComponent = ({
  icon = IconTabToday,
  isFocused = true,
  hasBadge = false,
  accessibilityLabel,
  onPress,
  onPressIn,
  onLongPress,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsx(Pressable, {
    accessibilityRole: "tab",
    accessibilityLabel: accessibilityLabel,
    accessibilityState: {
      selected: isFocused
    },
    onPress: onPress,
    onPressIn: onPressIn,
    onLongPress: onLongPress,
    style: [styles.item, style],
    testID: testID,
    children: /*#__PURE__*/_jsxs(View, {
      style: styles.iconWrapper,
      children: [/*#__PURE__*/_jsx(Icon, {
        icon: icon,
        color: isFocused ? 'accent' : 'default'
      }), hasBadge ? /*#__PURE__*/_jsx(View, {
        style: styles.badge,
        testID: testID ? `${testID}.badge` : undefined
      }) : null]
    })
  });
};

/** Icon-only bottom tab with an accent focused state and a dot badge. Figma `TabBarItem`. */
export const TabBarItem = /*#__PURE__*/memo(TabBarItemComponent);
//# sourceMappingURL=TabBarItem.js.map