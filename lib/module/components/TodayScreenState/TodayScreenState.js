"use strict";

import { StyleSheet, View } from 'react-native';
import { IconWifiOff } from "../../icons/figma/index.js";
import { Icon } from "../../primitives/Icon/index.js";
import { Text } from "../../primitives/Text/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { Button } from "../Button/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Figma TodayScreenState › Картинка: 120×120 (off-scale).
const ILLUSTRATION_SIZE = 120;
// Figma TodayScreenState kind=offline: band height 40.
const OFFLINE_BAR_HEIGHT = 40;
// Figma TodayScreenState kind=offline › wifi-off: 16×16.
const OFFLINE_ICON_SIZE = 16;

/** Figma variants that carry the action button. */
const KINDS_WITH_ACTION = ['no-auth', 'no-hotel', 'no-results'];
const createStyles = theme => StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: theme.space[12],
    justifyContent: 'center',
    paddingHorizontal: theme.space[10]
  },
  illustration: {
    alignItems: 'center',
    height: ILLUSTRATION_SIZE,
    justifyContent: 'center',
    width: ILLUSTRATION_SIZE
  },
  message: {
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: theme.space[4]
  },
  offlineBar: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: theme.colors.bg.subtle,
    flexDirection: 'row',
    gap: theme.space[2],
    height: OFFLINE_BAR_HEIGHT,
    paddingHorizontal: theme.space[4]
  },
  text: {
    alignSelf: 'stretch'
  },
  texts: {
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: theme.space[2]
  }
});

/**
 * Today screen state (Figma `TodayScreenState`): picture, title, explanation
 * and an action button for `no-auth` / `no-hotel` / `empty` / `no-results`;
 * a full-width "no network" band for `offline`.
 */
export const TodayScreenState = ({
  kind = 'no-auth',
  label,
  title,
  description,
  illustration,
  actionLabel,
  onAction,
  actionTestID,
  style,
  testID
}) => {
  const styles = useThemedStyles(createStyles);
  if (kind === 'offline') {
    return /*#__PURE__*/_jsxs(View, {
      style: [styles.offlineBar, style],
      testID: testID,
      children: [/*#__PURE__*/_jsx(Icon, {
        icon: IconWifiOff,
        size: OFFLINE_ICON_SIZE
      }), /*#__PURE__*/_jsx(Text, {
        color: "secondary",
        variant: "caption/regular",
        children: label
      })]
    });
  }
  const isActionVisible = KINDS_WITH_ACTION.includes(kind) && Boolean(actionLabel) && Boolean(onAction);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    testID: testID,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.message,
      children: [illustration ? /*#__PURE__*/_jsx(View, {
        style: styles.illustration,
        children: illustration
      }) : null, /*#__PURE__*/_jsxs(View, {
        style: styles.texts,
        children: [title ? /*#__PURE__*/_jsx(Text, {
          accessibilityRole: "header",
          align: "center",
          style: styles.text,
          variant: "title/medium",
          children: title
        }) : null, description ? /*#__PURE__*/_jsx(Text, {
          align: "center",
          color: "secondary",
          style: styles.text,
          variant: "body/regular",
          children: description
        }) : null]
      })]
    }), isActionVisible && actionLabel && onAction ? /*#__PURE__*/_jsx(Button, {
      onPress: onAction,
      testID: actionTestID,
      title: actionLabel
    }) : null]
  });
};
//# sourceMappingURL=TodayScreenState.js.map