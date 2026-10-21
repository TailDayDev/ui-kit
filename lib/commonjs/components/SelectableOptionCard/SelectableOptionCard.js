"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectableOptionCard = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App `SelectableOptionCard` default title line limit. */
const DEFAULT_TITLE_LINES = 3;
/** App `SelectableOptionCard` default description line limit. */
const DEFAULT_DESCRIPTION_LINES = 4;
/** App `SelectableOptionCard` title right inset that keeps text clear of the badge (off-scale). */
const TITLE_BADGE_INSET = 96;
/** App `SelectableOptionCard` disabled opacity (differs from `theme.opacity.disabled`; kept 1:1). */
const DISABLED_OPACITY = 0.6;
const createStyles = theme => _reactNative.StyleSheet.create({
  badge: {
    backgroundColor: theme.colors.bg.accent,
    borderBottomLeftRadius: theme.radius.lg,
    paddingHorizontal: theme.space[3],
    paddingVertical: theme.space[0.5],
    position: 'absolute',
    right: 0,
    top: 0
  },
  card: {
    borderRadius: theme.radius.lg,
    borderWidth: theme.stroke[1],
    overflow: 'hidden',
    padding: theme.space[4],
    position: 'relative',
    width: '100%'
  },
  cardDefault: {
    borderColor: theme.colors.border.default
  },
  cardDisabled: {
    opacity: DISABLED_OPACITY
  },
  cardSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.colors.bg.accent
  },
  description: {
    marginTop: theme.space[2]
  },
  footer: {
    marginTop: theme.space[3]
  },
  titleWithBadge: {
    paddingRight: TITLE_BADGE_INSET
  }
});

/**
 * Selectable option card. With `onPress` it is a button reporting
 * `selected`/`disabled`; without it, a static card.
 */
const SelectableOptionCard = exports.SelectableOptionCard = /*#__PURE__*/(0, _react.memo)(({
  title,
  description,
  badgeText,
  footer,
  isSelected = false,
  isDisabled = false,
  onPress,
  style,
  titleStyle,
  descriptionStyle,
  titleNumberOfLines = DEFAULT_TITLE_LINES,
  descriptionNumberOfLines = DEFAULT_DESCRIPTION_LINES,
  testID
}) => {
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const content = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.card, isSelected ? styles.cardSelected : styles.cardDefault, isDisabled ? styles.cardDisabled : null, style],
    children: [badgeText ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.badge,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/regular",
        color: "inverse",
        numberOfLines: 1,
        children: badgeText
      })
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "headline/bold",
      color: isSelected ? 'accent' : 'primary',
      style: [badgeText ? styles.titleWithBadge : null, titleStyle],
      numberOfLines: titleNumberOfLines,
      children: title
    }), description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "caption/regular",
      color: isSelected ? 'accent' : 'secondary',
      style: [styles.description, descriptionStyle],
      numberOfLines: descriptionNumberOfLines,
      children: description
    }) : null, footer ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.footer,
      children: footer
    }) : null]
  });
  if (!onPress) {
    return content;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    accessibilityRole: "button",
    accessibilityState: {
      selected: isSelected,
      disabled: isDisabled
    },
    disabled: isDisabled,
    onPress: onPress,
    testID: testID,
    android_ripple: {
      color: theme.colors.border.default
    },
    children: content
  });
});
SelectableOptionCard.displayName = 'SelectableOptionCard';
//# sourceMappingURL=SelectableOptionCard.js.map