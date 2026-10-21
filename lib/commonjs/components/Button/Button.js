"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Figma `Button` height. */
const MEDIUM_HEIGHT = 51;
/** App sizes not covered by Figma yet. */
const LARGE_HEIGHT = 64;
const SMALL_HEIGHT = 33;
const EXTRA_SMALL_HEIGHT = 28;
const EDIT_MAX_HEIGHT = 28;
const getIndicatorColor = (theme, style, restBorderColor) => {
  if (typeof restBorderColor === 'string') return restBorderColor;
  switch (style) {
    case 'light':
    case 'transparent':
    case 'softGray':
      return theme.colors.text.primary;
    case 'dangerSimple':
      return theme.colors.text.error;
    case 'secondary':
      return theme.colors.text.accent;
    default:
      return theme.colors.text.inverse;
  }
};
const ButtonComponent = ({
  onPress,
  onPressIn,
  title,
  style = 'default',
  size = 'medium',
  textStyle,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  restStyle,
  buttonTextStyle,
  isTextCenter = true,
  isRounded = false,
  accessibilityLabel,
  accessibilityHint,
  testID
}) => {
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  const indicatorColor = (0, _react.useMemo)(() => {
    const flatRest = _reactNative.StyleSheet.flatten(restStyle);
    return getIndicatorColor(theme, style, flatRest?.borderColor);
  }, [restStyle, style, theme]);
  const handlePress = event => {
    _reactNative.Keyboard.dismiss();
    onPress(event);
  };
  const computedA11yLabel = accessibilityLabel || title;
  const isIconOnly = Boolean(icon) && !title;
  const iconNode = icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.iconContainer,
    pointerEvents: "none",
    children: icon
  }) : null;
  const titleNode = title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
    style: [styles.buttonText, style === 'light' && styles.lightBtnText, style === 'danger' && styles.dangerBtnText, style === 'dangerSimple' && styles.dangerSimpleBtnText, size === 'extraSmall' && styles.extraSmallButtonText, size === 'small' && styles.smallButtonText, size === 'large' && styles.largeButtonText, style === 'secondary' && styles.secondaryButtonText, style === 'transparent' && styles.transparentButtonText, style === 'edit' && styles.changeBtnText, style === 'softGray' && styles.softGrayButtonText, textStyle, buttonTextStyle, isTextCenter && styles.textCenter, Boolean(icon) && styles.textWithIcon],
    numberOfLines: 1,
    ellipsizeMode: "tail",
    children: title
  }) : null;
  if (style === 'link' || style === 'main') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: [styles.linkText, style === 'main' && styles.mainLink, textStyle],
      onPress: disabled ? undefined : handlePress,
      onPressIn: disabled ? undefined : onPressIn,
      accessibilityRole: "button",
      accessibilityLabel: computedA11yLabel,
      accessibilityHint: accessibilityHint,
      accessibilityState: {
        disabled
      },
      testID: testID,
      children: title
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
    style: ({
      pressed
    }) => [styles.button, isRounded && styles.roundedButton, disabled && styles.disabled, style === 'light' && styles.lightBtn, style === 'danger' && styles.dangerBtn, style === 'dangerSimple' && styles.dangerSimpleBtn, style === 'softGray' && styles.softGrayButton, style === 'secondary' && styles.secondaryButton, style === 'transparent' && styles.transparentButton, style === 'green' && styles.greenButton, size === 'small' && styles.smallButton, size === 'extraSmall' && styles.extraSmallButton, size === 'large' && styles.largeButton, style === 'edit' && styles.changeBtn, Boolean(icon) && styles.withIcon, isIconOnly && styles.iconOnly, restStyle, pressed && !disabled && !loading && styles.pressed],
    disabled: disabled || loading,
    onPressIn: onPressIn,
    onPress: handlePress,
    accessibilityRole: "button",
    accessibilityLabel: computedA11yLabel,
    accessibilityHint: accessibilityHint,
    accessibilityState: {
      disabled: disabled || loading,
      busy: loading
    },
    testID: testID,
    children: loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
      size: "small",
      color: indicatorColor
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [iconPosition === 'left' ? iconNode : null, titleNode, iconPosition === 'right' ? iconNode : null]
    })
  });
};
const createStyles = theme => _reactNative.StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.accent,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    height: MEDIUM_HEIGHT,
    position: 'relative',
    justifyContent: 'center',
    paddingHorizontal: theme.space[8]
  },
  roundedButton: {
    borderRadius: theme.radius.full
  },
  buttonText: {
    ...theme.typography.headline.medium,
    color: theme.colors.text.inverse
  },
  pressed: {
    opacity: theme.opacity.pressed
  },
  disabled: {
    backgroundColor: theme.palette.paleGray
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0
  },
  largeButton: {
    height: LARGE_HEIGHT,
    paddingHorizontal: theme.space[6],
    paddingVertical: theme.space[4]
  },
  largeButtonText: {
    ...theme.typography.title.medium
  },
  lightBtn: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.palette.lightGray,
    borderWidth: theme.stroke[1]
  },
  // Figma `Button` style=red: red fill, white label.
  dangerBtn: {
    backgroundColor: theme.palette.red
  },
  lightBtnText: {
    color: theme.colors.text.primary
  },
  dangerBtnText: {
    color: theme.colors.text.inverse
  },
  dangerSimpleBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  dangerSimpleBtnText: {
    color: theme.colors.text.error
  },
  linkText: {
    ...theme.typography.body.medium,
    color: theme.colors.text.accent
  },
  mainLink: {
    color: theme.colors.text.primary,
    textDecorationLine: 'underline'
  },
  secondaryButton: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.palette.primary,
    borderWidth: theme.stroke[1]
  },
  transparentButton: {
    backgroundColor: 'transparent',
    borderColor: theme.palette.lightGray,
    borderWidth: theme.stroke[1]
  },
  greenButton: {
    backgroundColor: theme.palette.secondary
  },
  secondaryButtonText: {
    ...theme.typography.headline.medium,
    color: theme.colors.text.accent
  },
  transparentButtonText: {
    ...theme.typography.headline.medium,
    color: theme.colors.text.primary
  },
  smallButton: {
    height: SMALL_HEIGHT,
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[2]
  },
  extraSmallButton: {
    height: EXTRA_SMALL_HEIGHT,
    paddingHorizontal: theme.space[4]
  },
  smallButtonText: {
    ...theme.typography.body.medium
  },
  extraSmallButtonText: {
    ...theme.typography.caption.medium
  },
  withIcon: {
    gap: theme.space[2],
    justifyContent: 'center',
    paddingHorizontal: theme.space[4]
  },
  iconOnly: {
    justifyContent: 'center'
  },
  textCenter: {
    textAlign: 'center'
  },
  textWithIcon: {
    flexShrink: 1,
    minWidth: 0
  },
  changeBtn: {
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: theme.radius.sm,
    flexShrink: 0,
    maxHeight: EDIT_MAX_HEIGHT,
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[2],
    width: 'auto'
  },
  changeBtnText: {
    ...theme.typography.smallCaption.medium,
    color: theme.colors.text.primary
  },
  softGrayButton: {
    backgroundColor: theme.colors.bg.subtle
  },
  softGrayButtonText: {
    color: theme.colors.text.primary
  }
});

/** Labelled action button. Figma: `Button` (default / light / red). */
const Button = exports.Button = /*#__PURE__*/(0, _react.memo)(ButtonComponent);
//# sourceMappingURL=Button.js.map