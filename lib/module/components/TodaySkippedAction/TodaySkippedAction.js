"use strict";

import { StyleSheet, View } from 'react-native';
import { IconX } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodaySkippedAction: capsule 180×48 (FIXED, no width token).
const CAPSULE_WIDTH = 180;
// Figma TodaySkippedAction › Ручка › x: 20×20.
const HANDLE_ICON_SIZE = 20;
const createStyles = theme => StyleSheet.create({
  capsule: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.full,
    borderWidth: theme.stroke[1],
    flexDirection: 'row',
    height: theme.space[12],
    justifyContent: 'space-between',
    overflow: 'hidden',
    // Figma strokes are INSIDE and do not shift auto-layout content; RN
    // borders do, so the border width is taken out of the padding.
    paddingLeft: theme.space[6] - theme.stroke[1],
    paddingRight: theme.space[1] - theme.stroke[1],
    width: CAPSULE_WIDTH
  },
  handle: {
    alignItems: 'center',
    backgroundColor: theme.colors.icon.default,
    borderRadius: theme.radius.full,
    height: theme.space[10],
    justifyContent: 'center',
    width: theme.space[10]
  },
  label: {
    flexShrink: 1
  }
});

/**
 * Footer state of a skipped Today task (Figma `TodaySkippedAction`): an
 * inactive soft-gray capsule with the status text and a gray × handle.
 * Not interactive; the skip reason is a card layer, not part of this component.
 */
export const TodaySkippedAction = ({
  label,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  return /*#__PURE__*/_jsxs(View, {
    testID: testID,
    accessible: true,
    accessibilityRole: "text",
    accessibilityLabel: label,
    style: [styles.capsule, style],
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "headline/medium",
      numberOfLines: 1,
      style: styles.label,
      children: label
    }), /*#__PURE__*/_jsx(View, {
      style: styles.handle,
      children: /*#__PURE__*/_jsx(Icon, {
        icon: IconX,
        size: HANDLE_ICON_SIZE,
        color: "text.inverse"
      })
    })]
  });
};
//# sourceMappingURL=TodaySkippedAction.js.map