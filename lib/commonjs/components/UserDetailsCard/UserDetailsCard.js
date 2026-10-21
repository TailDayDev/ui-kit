"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDetailsCard = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../Card/index.js");
var _index4 = require("../EmptyProfileImage/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App detail value hit slop. */
const DETAIL_VALUE_HIT_SLOP = 4;
/** App detail row top padding (off-scale: not in Figma Spacing). */
const DETAIL_ROW_PADDING_TOP = 14;
/** App detail value column flex against the label. */
const DETAIL_VALUE_FLEX = 1.5;
/** Max lines of a detail value. */
const DETAIL_VALUE_LINES = 2;
const createStyles = theme => _reactNative.StyleSheet.create({
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
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
  style: styles.detailRow,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.detailMainRow,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "body/regular",
      children: label
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
      accessibilityRole: onPress ? 'button' : undefined,
      disabled: !onPress || !value,
      hitSlop: DETAIL_VALUE_HIT_SLOP,
      onPress: event => {
        event.stopPropagation();
        onPress?.();
      },
      style: styles.detailValuePressable,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "body/regular",
        color: "accent",
        align: "right",
        numberOfLines: DETAIL_VALUE_LINES,
        children: value || ''
      })
    })]
  }), subLabel ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
    variant: "caption/regular",
    color: "secondary",
    children: subLabel
  }) : null]
});

/** Owner / contact summary card: title, avatar with name, detail rows and an action button. */
const UserDetailsCard = ({
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
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const [firstName, lastName] = name.trim().split(/\s+/);
  const visibleDetails = details.filter(item => Boolean(item.value));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_index3.Card, {
    style: styles.card,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "headline/bold",
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.ownerHeader,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.ownerAvatarContainer,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index4.EmptyProfileImage, {
          firstName: firstName,
          lastName: lastName,
          imageUrl: photoUrl ?? '',
          size: "l",
          renderImage: renderAvatarImage
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "title/medium",
        numberOfLines: 1,
        style: styles.ownerName,
        children: name || fallbackName
      })]
    }), visibleDetails.map(item => /*#__PURE__*/(0, _jsxRuntime.jsx)(DetailRow, {
      label: item.label,
      onPress: item.onPress,
      styles: styles,
      subLabel: item.subLabel,
      value: item.value
    }, `${item.label}-${item.value}`)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
      accessibilityRole: "button",
      onPress: onActionPress,
      style: ({
        pressed
      }) => [styles.ownerProfileButton, pressed && styles.pressedButton],
      testID: testID,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "headline/medium",
        children: actionText
      })
    })]
  });
};
exports.UserDetailsCard = UserDetailsCard;
//# sourceMappingURL=UserDetailsCard.js.map