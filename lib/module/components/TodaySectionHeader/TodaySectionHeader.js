"use strict";

import { Pressable, StyleSheet, View } from 'react-native';
import { IconChevronDown, IconChevronUp } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { IconRoundButton } from "../IconButton/index.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Figma TodaySectionHeader › Кнопка · свернуть раздел: 24×24 round button.
const CHEVRON_BUTTON_SIZE = 24;
// Figma TodaySectionHeader › chevron-up / chevron-down: 16×16.
const CHEVRON_GLYPH_SIZE = 16;
const createStyles = theme => StyleSheet.create({
  chevronAndLine: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: theme.space[2]
  },
  line: {
    backgroundColor: theme.colors.border.default,
    flex: 1,
    height: theme.stroke[1]
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[2],
    paddingTop: theme.space[3]
  }
});

/**
 * Today feed section divider (Figma `TodaySectionHeader`): a hairline, the
 * section title with its count, a round collapse chevron and a second
 * hairline. A collapsible row with `onToggle` is one button for the whole
 * width (as in the app); the chevron is its visual cue only.
 */
export const TodaySectionHeader = ({
  title,
  isCollapsible = true,
  isExpanded = true,
  isPastDate = false,
  onToggle,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  const isToggle = isCollapsible && Boolean(onToggle);
  const content = /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(View, {
      style: styles.line
    }), /*#__PURE__*/_jsx(Text, {
      color: isPastDate ? 'error' : 'primary',
      variant: "caption/regular",
      children: title
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.chevronAndLine,
      children: [isCollapsible ?
      /*#__PURE__*/
      // Decorative: the row is the button, so the chevron is hidden from
      // touches and screen readers to avoid a nested second control.
      _jsx(View, {
        accessibilityElementsHidden: true,
        importantForAccessibility: "no-hide-descendants",
        pointerEvents: "none",
        children: /*#__PURE__*/_jsx(IconRoundButton, {
          accessibilityLabel: title,
          icon: /*#__PURE__*/_jsx(Icon, {
            icon: isExpanded ? IconChevronUp : IconChevronDown,
            size: CHEVRON_GLYPH_SIZE
          }),
          size: CHEVRON_BUTTON_SIZE
        })
      }) : null, /*#__PURE__*/_jsx(View, {
        style: styles.line
      })]
    })]
  });
  if (!isToggle) {
    return /*#__PURE__*/_jsx(View, {
      accessibilityLabel: title,
      style: [styles.row, style],
      testID: testID,
      children: content
    });
  }
  return /*#__PURE__*/_jsx(Pressable, {
    accessibilityLabel: title,
    accessibilityRole: "button",
    accessibilityState: {
      expanded: isExpanded
    },
    onPress: onToggle,
    style: [styles.row, style],
    testID: testID,
    children: content
  });
};
//# sourceMappingURL=TodaySectionHeader.js.map