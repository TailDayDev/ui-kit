"use strict";

import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/index.js";
import { useThemedStyles } from "../../theme/index.js";
import { Card } from "../Card/index.js";
import { EmptyProfileImage } from "../EmptyProfileImage/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** App detail value hit slop. */
const DETAIL_VALUE_HIT_SLOP = 4;
/** App detail row top padding (off-scale: not in Figma Spacing). */
const DETAIL_ROW_PADDING_TOP = 14;
/** App detail value column flex against the label. */
const DETAIL_VALUE_FLEX = 1.5;
/** Max lines of a detail value. */
const DETAIL_VALUE_LINES = 2;
const createStyles = theme => StyleSheet.create({
  card: {
    gap: theme.space[4]
  },
  detailMainRow: {
    flexDirection: 'row',
    gap: theme.space[4],
    justifyContent: 'space-between'
  },
  detailRow: {
    borderTopColor: theme.colors.border.default,
    borderTopWidth: theme.stroke[1],
    gap: theme.space[1],
    paddingTop: DETAIL_ROW_PADDING_TOP
  },
  detailValuePressable: {
    flex: DETAIL_VALUE_FLEX
  },
  ownerAvatarContainer: {
    borderRadius: theme.radius.sm,
    overflow: 'hidden'
  },
  ownerHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[4]
  },
  ownerName: {
    flex: 1
  },
  ownerProfileButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    minHeight: theme.minTouchTarget,
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[2.5]
  },
  pressedButton: {
    opacity: theme.opacity.pressed
  }
});
const DetailRow = ({
  label,
  styles,
  subLabel,
  value,
  onPress
}) => /*#__PURE__*/_jsxs(View, {
  style: styles.detailRow,
  children: [/*#__PURE__*/_jsxs(View, {
    style: styles.detailMainRow,
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "body/regular",
      children: label
    }), /*#__PURE__*/_jsx(Pressable, {
      accessibilityRole: onPress ? 'button' : undefined,
      disabled: !onPress || !value,
      hitSlop: DETAIL_VALUE_HIT_SLOP,
      onPress: event => {
        event.stopPropagation();
        onPress?.();
      },
      style: styles.detailValuePressable,
      children: /*#__PURE__*/_jsx(Text, {
        variant: "body/regular",
        color: "accent",
        align: "right",
        numberOfLines: DETAIL_VALUE_LINES,
        children: value || ''
      })
    })]
  }), subLabel ? /*#__PURE__*/_jsx(Text, {
    variant: "caption/regular",
    color: "secondary",
    children: subLabel
  }) : null]
});

/** Owner / contact summary card: title, avatar with name, detail rows and an action button. */
export const UserDetailsCard = ({
  actionText,
  details,
  name,
  photoUrl,
  testID,
  title,
  fallbackName,
  onActionPress,
  renderAvatarImage
}) => {
  const styles = useThemedStyles(createStyles);
  const [firstName, lastName] = name.trim().split(/\s+/);
  const visibleDetails = details.filter(item => Boolean(item.value));
  return /*#__PURE__*/_jsxs(Card, {
    style: styles.card,
    children: [/*#__PURE__*/_jsx(Text, {
      variant: "headline/bold",
      children: title
    }), /*#__PURE__*/_jsxs(View, {
      style: styles.ownerHeader,
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.ownerAvatarContainer,
        children: /*#__PURE__*/_jsx(EmptyProfileImage, {
          firstName: firstName,
          lastName: lastName,
          imageUrl: photoUrl ?? '',
          size: "l",
          renderImage: renderAvatarImage
        })
      }), /*#__PURE__*/_jsx(Text, {
        variant: "title/medium",
        numberOfLines: 1,
        style: styles.ownerName,
        children: name || fallbackName
      })]
    }), visibleDetails.map(item => /*#__PURE__*/_jsx(DetailRow, {
      label: item.label,
      onPress: item.onPress,
      styles: styles,
      subLabel: item.subLabel,
      value: item.value
    }, `${item.label}-${item.value}`)), /*#__PURE__*/_jsx(Pressable, {
      accessibilityRole: "button",
      onPress: onActionPress,
      style: ({
        pressed
      }) => [styles.ownerProfileButton, pressed && styles.pressedButton],
      testID: testID,
      children: /*#__PURE__*/_jsx(Text, {
        variant: "headline/medium",
        children: actionText
      })
    })]
  });
};
//# sourceMappingURL=UserDetailsCard.js.map