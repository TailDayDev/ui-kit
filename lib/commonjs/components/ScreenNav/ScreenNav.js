"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenNav = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _ChevronLeftIcon = require("../../icons/ChevronLeftIcon.js");
var _index = require("../../primitives/Icon/index.js");
var _index2 = require("../../primitives/Text/index.js");
var _index3 = require("../../theme/index.js");
var _index4 = require("../CenteredScreenHeader/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** Horizontal padding of headers without a back button (tab roots). */
const ROOT_HEADER_HORIZONTAL_PADDING = 24;
const CHILDREN_GAP = 16;
const CHILDREN_BOTTOM_PADDING = 16;
/** Side inset of the centered title: clears the 36pt back button plus the 16pt row gap. */
const CENTERED_TITLE_SIDE_INSET = 52;
/** App back chevron size. */
const BACK_ICON_SIZE = 20;
const createStyles = ({
  theme,
  isDevider,
  insets,
  centeredTitle,
  isBackButtonVisible,
  hasChildren
}) => {
  const screenWidth = _reactNative.Dimensions.get('window').width;
  const dividerWidth = isDevider ? _index4.SCREEN_HEADER_DIVIDER_WIDTH : 0;
  // The row has a fixed height and the bar matches CenteredScreenHeader, so
  // the back arrow sits at the same point on every screen and late right
  // actions (40-44pt buttons) never grow the header.
  const barVerticalPadding = (_index4.SCREEN_HEADER_BAR_HEIGHT - dividerWidth - _index4.SCREEN_HEADER_BACK_BUTTON_SIZE) / 2;
  const horizontalPadding = isBackButtonVisible || centeredTitle ? _index4.SCREEN_HEADER_HORIZONTAL_PADDING : ROOT_HEADER_HORIZONTAL_PADDING;
  return _reactNative.StyleSheet.create({
    container: {
      borderBottomColor: theme.colors.border.default,
      borderBottomWidth: dividerWidth,
      borderStyle: 'solid',
      gap: CHILDREN_GAP,
      paddingBottom: hasChildren ? CHILDREN_BOTTOM_PADDING : barVerticalPadding,
      paddingHorizontal: horizontalPadding,
      paddingTop: insets.top + barVerticalPadding,
      width: screenWidth
    },
    backButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: _index4.SCREEN_HEADER_BACK_BUTTON_SIZE / 2,
      height: _index4.SCREEN_HEADER_BACK_BUTTON_SIZE,
      justifyContent: 'center',
      width: _index4.SCREEN_HEADER_BACK_BUTTON_SIZE
    },
    rightBlock: {
      flexShrink: 0
    },
    centeredRightBlock: {
      marginLeft: 'auto'
    },
    leftBlock: {
      flexShrink: 0
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[3],
      height: _index4.SCREEN_HEADER_BACK_BUTTON_SIZE,
      justifyContent: 'space-between',
      maxWidth: '100%'
    },
    centeredRow: {
      gap: theme.space[4],
      justifyContent: 'flex-start',
      position: 'relative'
    },
    title: {
      flexShrink: 1
    },
    titleWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      minWidth: 0
    },
    centeredTitleWrapper: {
      bottom: 0,
      justifyContent: 'center',
      left: CENTERED_TITLE_SIDE_INSET,
      position: 'absolute',
      right: CENTERED_TITLE_SIDE_INSET,
      top: 0
    }
  });
};

/**
 * Screen top bar used by most app screens: title, optional round back button,
 * left / right blocks and optional content under the bar. Adds the top
 * safe-area inset and spans the window width.
 */
const ScreenNav = exports.ScreenNav = /*#__PURE__*/(0, _react.memo)(function ScreenNav({
  title,
  children,
  hasBackButton = false,
  goBack,
  rightBlock,
  leftBlock,
  isDevider = true,
  restStyle,
  isOnlyChildren = false,
  centeredTitle = false
}) {
  const theme = (0, _index3.useTheme)();
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const isBackButtonVisible = hasBackButton && Boolean(goBack);
  const hasChildren = Boolean(children);
  const styles = (0, _react.useMemo)(() => createStyles({
    theme,
    isDevider,
    insets,
    centeredTitle,
    isBackButtonVisible,
    hasChildren
  }), [centeredTitle, hasChildren, insets, isBackButtonVisible, isDevider, theme]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.container, restStyle],
    children: [!isOnlyChildren && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.row, centeredTitle && styles.centeredRow],
      children: [leftBlock && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.leftBlock,
        children: leftBlock
      }), isBackButtonVisible ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        onPress: goBack,
        style: styles.backButton,
        accessibilityRole: "button",
        accessibilityLabel: title,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
          icon: _ChevronLeftIcon.ChevronLeftIcon,
          color: "text.primary",
          size: BACK_ICON_SIZE
        })
      }) : null, title ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.titleWrapper, centeredTitle && styles.centeredTitleWrapper],
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.Text, {
          variant: "title/bold",
          style: styles.title,
          numberOfLines: 1,
          ellipsizeMode: "tail",
          children: title
        })
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.titleWrapper
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.rightBlock, centeredTitle && styles.centeredRightBlock],
        children: rightBlock
      })]
    }), children]
  });
});
//# sourceMappingURL=ScreenNav.js.map