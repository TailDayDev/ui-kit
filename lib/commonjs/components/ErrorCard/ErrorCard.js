"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorCard = void 0;
var _reactNative = require("react-native");
var _CloseIcon = require("../../icons/CloseIcon.js");
var _ErrorIcon = require("../../icons/ErrorIcon.js");
var _index = require("../../primitives/Text/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App default gap to the screen edges (`space[10]`). */
const DEFAULT_HORIZONTAL_INSET = 40;
/** App default icon size (off-scale). */
const DEFAULT_ICON_SIZE = 36;
/** App close icon frame. */
const CLOSE_ICON_SIZE = 24;
/** App close button pressed opacity (differs from `opacity.pressed`). */
const CLOSE_PRESSED_OPACITY = 0.8;

/*
 * App shadow, no Figma effect: `rgba(0,0,0,0.15)`, offset 0/6, opacity 0.3,
 * radius 12, Android elevation 4. The color is black with a 0x26 (15 %) alpha
 * suffix so iOS and Android render exactly as before.
 */
const SHADOW_COLOR_ALPHA_HEX = '26';
const SHADOW_OFFSET_Y = 6;
const SHADOW_OPACITY = 0.3;
const SHADOW_RADIUS = 12;
const SHADOW_ELEVATION = 4;
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default,
    borderWidth: theme.stroke[1],
    borderRadius: theme.radius.lg,
    padding: theme.space[4],
    shadowColor: `${theme.palette.black}${SHADOW_COLOR_ALPHA_HEX}`,
    shadowOffset: {
      width: 0,
      height: SHADOW_OFFSET_Y
    },
    shadowOpacity: SHADOW_OPACITY,
    shadowRadius: SHADOW_RADIUS,
    elevation: SHADOW_ELEVATION,
    alignSelf: 'center',
    alignItems: 'flex-start',
    gap: theme.space[3]
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: theme.space[3]
  },
  textContainer: {
    flex: 1,
    gap: theme.space[1]
  },
  error: {
    textTransform: 'uppercase'
  },
  closeButton: {
    alignSelf: 'flex-start'
  },
  childrenContainer: {
    width: '100%',
    marginTop: theme.space[2]
  }
});

/** Floating error card: red icon, title, description, error text, close button, optional actions. */
const ErrorCard = ({
  onCancel,
  closeButtonTestID,
  testID,
  errorTextTestID,
  title,
  description,
  errorText,
  children,
  horizontalInset = DEFAULT_HORIZONTAL_INSET,
  iconSize = DEFAULT_ICON_SIZE,
  closeAccessibilityLabel
}) => {
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const screenWidth = _reactNative.Dimensions.get('screen').width;
  const widthStyle = {
    width: screenWidth - horizontalInset * 2
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.container, widthStyle],
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.header,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorIcon.ErrorIcon, {
        color: theme.colors.text.error,
        size: iconSize
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.textContainer,
        children: [title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "body/bold",
          color: "primary",
          children: title
        }) : null, description ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "smallCaption/regular",
          color: "secondary",
          children: description
        }) : null, errorText ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
          variant: "smallCaption/regular",
          color: "error",
          style: styles.error,
          testID: errorTextTestID,
          children: errorText
        }) : null]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        testID: closeButtonTestID,
        onPress: onCancel,
        style: styles.closeButton,
        activeOpacity: CLOSE_PRESSED_OPACITY,
        accessibilityRole: "button",
        accessibilityLabel: closeAccessibilityLabel,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CloseIcon.CloseIcon, {
          size: CLOSE_ICON_SIZE,
          color: theme.colors.icon.default
        })
      })]
    }), children ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.childrenContainer,
      children: children
    }) : null]
  });
};
exports.ErrorCard = ErrorCard;
//# sourceMappingURL=ErrorCard.js.map