"use strict";

import { memo, useMemo } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useTheme } from "../../theme/index.js";
import { SCREEN_HEADER_BACK_BUTTON_SIZE, SCREEN_HEADER_BAR_HEIGHT, SCREEN_HEADER_DIVIDER_WIDTH, SCREEN_HEADER_HORIZONTAL_PADDING } from "../CenteredScreenHeader/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** Horizontal padding of headers without a back button (tab roots). */
const ROOT_HEADER_HORIZONTAL_PADDING = 24;
const CHILDREN_GAP = 16;
const CHILDREN_BOTTOM_PADDING = 16;
/** Side inset of the centered title: clears the 36pt back button plus the 16pt row gap. */
const CENTERED_TITLE_SIDE_INSET = 52;
/** App back chevron size. */
const BACK_ICON_SIZE = 20;
const createStyles = ({
  theme,
  isDevider,
  insets,
  centeredTitle,
  isBackButtonVisible,
  hasChildren
}) => {
  const screenWidth = Dimensions.get('window').width;
  const dividerWidth = isDevider ? SCREEN_HEADER_DIVIDER_WIDTH : 0;
  // The row has a fixed height and the bar matches CenteredScreenHeader, so
  // the back arrow sits at the same point on every screen and late right
  // actions (40-44pt buttons) never grow the header.
  const barVerticalPadding = (SCREEN_HEADER_BAR_HEIGHT - dividerWidth - SCREEN_HEADER_BACK_BUTTON_SIZE) / 2;
  const horizontalPadding = isBackButtonVisible || centeredTitle ? SCREEN_HEADER_HORIZONTAL_PADDING : ROOT_HEADER_HORIZONTAL_PADDING;
  return StyleSheet.create({
    container: {
      borderBottomColor: theme.colors.border.default,
      borderBottomWidth: dividerWidth,
      borderStyle: 'solid',
      gap: CHILDREN_GAP,
      paddingBottom: hasChildren ? CHILDREN_BOTTOM_PADDING : barVerticalPadding,
      paddingHorizontal: horizontalPadding,
      paddingTop: insets.top + barVerticalPadding,
      width: screenWidth
    },
    backButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: SCREEN_HEADER_BACK_BUTTON_SIZE / 2,
      height: SCREEN_HEADER_BACK_BUTTON_SIZE,
      justifyContent: 'center',
      width: SCREEN_HEADER_BACK_BUTTON_SIZE
    },
    rightBlock: {
      flexShrink: 0
    },
    centeredRightBlock: {
      marginLeft: 'auto'
    },
    leftBlock: {
      flexShrink: 0
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[3],
      height: SCREEN_HEADER_BACK_BUTTON_SIZE,
      justifyContent: 'space-between',
      maxWidth: '100%'
    },
    centeredRow: {
      gap: theme.space[4],
      justifyContent: 'flex-start',
      position: 'relative'
    },
    title: {
      flexShrink: 1
    },
    titleWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      minWidth: 0
    },
    centeredTitleWrapper: {
      bottom: 0,
      justifyContent: 'center',
      left: CENTERED_TITLE_SIDE_INSET,
      position: 'absolute',
      right: CENTERED_TITLE_SIDE_INSET,
      top: 0
    }
  });
};

/**
 * Screen top bar used by most app screens: title, optional round back button,
 * left / right blocks and optional content under the bar. Adds the top
 * safe-area inset and spans the window width.
 */
export const ScreenNav = /*#__PURE__*/memo(function ScreenNav({
  title,
  children,
  hasBackButton = false,
  goBack,
  rightBlock,
  leftBlock,
  isDevider = true,
  restStyle,
  isOnlyChildren = false,
  centeredTitle = false
}) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isBackButtonVisible = hasBackButton && Boolean(goBack);
  const hasChildren = Boolean(children);
  const styles = useMemo(() => createStyles({
    theme,
    isDevider,
    insets,
    centeredTitle,
    isBackButtonVisible,
    hasChildren
  }), [centeredTitle, hasChildren, insets, isBackButtonVisible, isDevider, theme]);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, restStyle],
    children: [!isOnlyChildren && /*#__PURE__*/_jsxs(View, {
      style: [styles.row, centeredTitle && styles.centeredRow],
      children: [leftBlock && /*#__PURE__*/_jsx(View, {
        style: styles.leftBlock,
        children: leftBlock
      }), isBackButtonVisible ? /*#__PURE__*/_jsx(TouchableOpacity, {
        onPress: goBack,
        style: styles.backButton,
        accessibilityRole: "button",
        accessibilityLabel: title,
        children: /*#__PURE__*/_jsx(Icon, {
          icon: ChevronLeftIcon,
          color: "text.primary",
          size: BACK_ICON_SIZE
        })
      }) : null, title ? /*#__PURE__*/_jsx(View, {
        style: [styles.titleWrapper, centeredTitle && styles.centeredTitleWrapper],
        children: /*#__PURE__*/_jsx(Text, {
          variant: "title/bold",
          style: styles.title,
          numberOfLines: 1,
          ellipsizeMode: "tail",
          children: title
        })
      }) : /*#__PURE__*/_jsx(View, {
        style: styles.titleWrapper
      }), /*#__PURE__*/_jsx(View, {
        style: [styles.rightBlock, centeredTitle && styles.centeredRightBlock],
        children: rightBlock
      })]
    }), children]
  });
});
//# sourceMappingURL=ScreenNav.js.map