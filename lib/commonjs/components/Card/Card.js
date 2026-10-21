"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Pressed opacity of a tappable card (app `Card`; differs from `opacity.pressed`). */
const CARD_PRESSED_OPACITY = 0.8;
const createStyles = theme => _reactNative.StyleSheet.create({
  card: {
    alignItems: 'stretch',
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderRadius: theme.radius.lg,
    borderWidth: theme.stroke[1],
    gap: theme.space[3],
    padding: theme.space[4],
    width: '100%'
  },
  cardShadow: {
    boxShadow: [...theme.shadows.block]
  },
  pressed: {
    opacity: CARD_PRESSED_OPACITY
  },
  topContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: theme.space[1],
    width: '100%'
  },
  leadingHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space[2],
    flex: 1
  }
});

/** Bordered surface with an optional title row. Tappable when `onPress` is set. */
const Card = ({
  title,
  children,
  additional,
  additionalPosition = 'right',
  cardStyles,
  onPress,
  disabled = false,
  withShadow = false,
  pointerEvents = 'auto',
  topContainerStyles,
  style,
  testID,
  titleNumberOfLines = 1,
  titleStyles,
  accessibilityLabel
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const titleText = /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
    variant: "headline/bold",
    color: "primary",
    style: titleStyles,
    numberOfLines: titleNumberOfLines,
    ellipsizeMode: "tail",
    children: title
  });
  const header = title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [styles.topContainer, topContainerStyles],
    children: additionalPosition === 'left' ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.leadingHeader,
      children: [additional, titleText]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [titleText, additional]
    })
  }) : null;
  if (onPress) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Pressable, {
      onPress: disabled ? undefined : onPress,
      pointerEvents: pointerEvents,
      disabled: disabled,
      testID: testID,
      accessibilityLabel: accessibilityLabel,
      accessibilityRole: "button",
      accessibilityState: {
        disabled
      },
      style: ({
        pressed
      }) => [styles.card, style, withShadow && styles.cardShadow, cardStyles, pressed && !disabled && styles.pressed],
      children: [header, children]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    pointerEvents: pointerEvents,
    testID: testID,
    style: [styles.card, style, withShadow && styles.cardShadow, cardStyles],
    children: [header, children]
  });
};
exports.Card = Card;
//# sourceMappingURL=Card.js.map