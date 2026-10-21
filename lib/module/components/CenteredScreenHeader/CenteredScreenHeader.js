"use strict";

import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useTheme } from "../../theme/index.js";
import { SCREEN_HEADER_BACK_BUTTON_SIZE, SCREEN_HEADER_BAR_HEIGHT, SCREEN_HEADER_DIVIDER_WIDTH, SCREEN_HEADER_HORIZONTAL_PADDING } from "./screenHeaderMetrics.js";

/** Space kept free on both sides of the centered title for the back button and right action. */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const HEADER_SIDE_RESERVE = 104;
/** Extra touch area around the back button. */
const BACK_BUTTON_HIT_SLOP = 8;
/** App back chevron size. */
const BACK_ICON_SIZE = 20;
// off-scale: the app subtitle is `body/regular` at 12pt (no Figma text style).
const SUBTITLE_FONT_SIZE = 12;
const createStyles = (theme, topInset) => StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: SCREEN_HEADER_BACK_BUTTON_SIZE / 2,
    height: SCREEN_HEADER_BACK_BUTTON_SIZE,
    justifyContent: 'center',
    width: SCREEN_HEADER_BACK_BUTTON_SIZE
  },
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderBottomColor: theme.colors.border.default,
    borderBottomWidth: SCREEN_HEADER_DIVIDER_WIDTH,
    flexDirection: 'row',
    height: SCREEN_HEADER_BAR_HEIGHT + topInset,
    paddingHorizontal: SCREEN_HEADER_HORIZONTAL_PADDING,
    paddingTop: topInset,
    position: 'relative',
    width: '100%'
  },
  rightAction: {
    alignItems: 'flex-end',
    flexShrink: 0,
    marginLeft: 'auto',
    zIndex: 1
  },
  subtitle: {
    fontSize: SUBTITLE_FONT_SIZE,
    marginTop: theme.space[0.25]
  },
  titleLayer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    paddingHorizontal: HEADER_SIDE_RESERVE,
    position: 'absolute',
    right: 0,
    top: topInset
  }
});

/**
 * Screen header: centered title (+ subtitle), round back button on the left,
 * optional action on the right. Adds the top safe-area inset.
 */
export const CenteredScreenHeader = ({
  title,
  goBack,
  backButtonTestID,
  rightAction,
  subtitle,
  testID
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets.top), [insets.top, theme]);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    testID: testID,
    children: [/*#__PURE__*/_jsxs(View, {
      pointerEvents: "none",
      style: styles.titleLayer,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: "headline/bold",
        align: "center",
        numberOfLines: 1,
        children: title
      }), subtitle ? /*#__PURE__*/_jsx(Text, {
        variant: "body/regular",
        color: "secondary",
        align: "center",
        numberOfLines: 1,
        style: styles.subtitle,
        children: subtitle
      }) : null]
    }), /*#__PURE__*/_jsx(Pressable, {
      accessibilityRole: "button",
      accessibilityLabel: title,
      hitSlop: BACK_BUTTON_HIT_SLOP,
      style: styles.backButton,
      testID: backButtonTestID,
      onPress: goBack,
      children: /*#__PURE__*/_jsx(Icon, {
        icon: ChevronLeftIcon,
        size: BACK_ICON_SIZE
      })
    }), rightAction ? /*#__PURE__*/_jsx(View, {
      style: styles.rightAction,
      children: rightAction
    }) : null]
  });
};
//# sourceMappingURL=CenteredScreenHeader.js.map