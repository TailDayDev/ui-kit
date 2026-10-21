"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CenteredScreenHeader = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _ChevronLeftIcon = require("../../icons/ChevronLeftIcon.js");
var _index = require("../../primitives/Icon/index.js");
var _index2 = require("../../primitives/Text/index.js");
var _index3 = require("../../theme/index.js");
var _screenHeaderMetrics = require("./screenHeaderMetrics.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Space kept free on both sides of the centered title for the back button and right action. */const HEADER_SIDE_RESERVE = 104;
/** Extra touch area around the back button. */
const BACK_BUTTON_HIT_SLOP = 8;
/** App back chevron size. */
const BACK_ICON_SIZE = 20;
// off-scale: the app subtitle is `body/regular` at 12pt (no Figma text style).
const SUBTITLE_FONT_SIZE = 12;
const createStyles = (theme, topInset) => _reactNative.StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.subtle,
    borderRadius: _screenHeaderMetrics.SCREEN_HEADER_BACK_BUTTON_SIZE / 2,
    height: _screenHeaderMetrics.SCREEN_HEADER_BACK_BUTTON_SIZE,
    justifyContent: 'center',
    width: _screenHeaderMetrics.SCREEN_HEADER_BACK_BUTTON_SIZE
  },
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.surface,
    borderBottomColor: theme.colors.border.default,
    borderBottomWidth: _screenHeaderMetrics.SCREEN_HEADER_DIVIDER_WIDTH,
    flexDirection: 'row',
    height: _screenHeaderMetrics.SCREEN_HEADER_BAR_HEIGHT + topInset,
    paddingHorizontal: _screenHeaderMetrics.SCREEN_HEADER_HORIZONTAL_PADDING,
    paddingTop: topInset,
    position: 'relative',
    width: '100%'
  },
  rightAction: {
    alignItems: 'flex-end',
    flexShrink: 0,
    marginLeft: 'auto',
    zIndex: 1
  },
  subtitle: {
    fontSize: SUBTITLE_FONT_SIZE,
    marginTop: theme.space[0.25]
  },
  titleLayer: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    paddingHorizontal: HEADER_SIDE_RESERVE,
    position: 'absolute',
    right: 0,
    top: topInset
  }
});

/**
 * Screen header: centered title (+ subtitle), round back button on the left,
 * optional action on the right. Adds the top safe-area inset.
 */
const CenteredScreenHeader = ({
  title,
  goBack,
  backButtonTestID,
  rightAction,
  subtitle,
  testID
}) => {
  const theme = (0, _index3.useTheme)();
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const styles = (0, _react.useMemo)(() => createStyles(theme, insets.top), [insets.top, theme]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      pointerEvents: "none",
      style: styles.titleLayer,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
        variant: "headline/bold",
        align: "center",
        numberOfLines: 1,
        children: title
      }), subtitle ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
        variant: "body/regular",
        color: "secondary",
        align: "center",
        numberOfLines: 1,
        style: styles.subtitle,
        children: subtitle
      }) : null]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
      accessibilityRole: "button",
      accessibilityLabel: title,
      hitSlop: BACK_BUTTON_HIT_SLOP,
      style: styles.backButton,
      testID: backButtonTestID,
      onPress: goBack,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
        icon: _ChevronLeftIcon.ChevronLeftIcon,
        size: BACK_ICON_SIZE
      })
    }), rightAction ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.rightAction,
      children: rightAction
    }) : null]
  });
};
exports.CenteredScreenHeader = CenteredScreenHeader;
//# sourceMappingURL=CenteredScreenHeader.js.map