"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomTabBar = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _index = require("../../theme/index.js");
var _index2 = require("../TabBarItem/index.js");
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// Figma CustomTabBar: FIXED height 118 (backdrop gradient area).
const BACKDROP_HEIGHT = 118;
// Figma CustomTabBar › Pill › Indicator: 48pt high (TabBarItem height).
const INDICATOR_HEIGHT = 48;
// Figma CustomTabBar fill: linear gradient #28281F 0% → #000000 10% (top → bottom).
// No gradient/alpha tokens: drawn with palette.black at these stop opacities.
const BACKDROP_TOP_OPACITY = 0;
const BACKDROP_BOTTOM_OPACITY = 0.1;
// App FloatingTabBarCapsule: the indicator slides in 0.3 s, ease-out cubic.
const INDICATOR_DURATION_MS = 300;
const INDICATOR_EASING = _reactNativeReanimated.Easing.out(_reactNativeReanimated.Easing.cubic);
const PERCENT = 100;
const createStyles = theme => _reactNative.StyleSheet.create({
  root: {
    height: BACKDROP_HEIGHT,
    justifyContent: 'flex-end',
    paddingBottom: theme.space[6],
    paddingHorizontal: theme.space[6]
  },
  pill: {
    backgroundColor: theme.colors.bg.surface,
    borderRadius: theme.radius.full,
    boxShadow: [...theme.shadows.barFloating],
    padding: theme.space[2]
  },
  tabs: {
    flexDirection: 'row'
  },
  indicator: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderRadius: theme.radius.full,
    height: INDICATOR_HEIGHT,
    left: 0,
    position: 'absolute',
    top: 0
  },
  tab: {
    flex: 1,
    width: 'auto'
  }
});
const CustomTabBarComponent = ({
  tabs,
  activeKey,
  onTabPress,
  onTabPressIn,
  onTabLongPress,
  style,
  testID
}) => {
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  const gradientId = `custom-tab-bar-backdrop-${(0, _react.useId)()}`;
  const [tabsWidth, setTabsWidth] = (0, _react.useState)(null);

  // A key outside the bar keeps the indicator where it was (app behaviour).
  const focusedIndex = tabs.findIndex(tab => tab.key === activeKey);
  const lastIndexRef = (0, _react.useRef)(Math.max(focusedIndex, 0));
  if (focusedIndex >= 0) {
    lastIndexRef.current = focusedIndex;
  }
  const indicatorIndex = lastIndexRef.current;
  const tabCount = Math.max(tabs.length, 1);
  const tabWidth = tabsWidth === null ? 0 : tabsWidth / tabCount;
  const position = (0, _reactNativeReanimated.useSharedValue)(indicatorIndex);
  (0, _react.useEffect)(() => {
    position.value = (0, _reactNativeReanimated.withTiming)(indicatorIndex, {
      duration: INDICATOR_DURATION_MS,
      easing: INDICATOR_EASING
    });
  }, [indicatorIndex, position]);
  const indicatorAnimatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateX: position.value * tabWidth
    }]
  }), [tabWidth]);
  const handleTabsLayout = (0, _react.useCallback)(event => {
    setTabsWidth(event.nativeEvent.layout.width);
  }, []);
  const indicatorWidth = `${PERCENT / tabCount}%`;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.root, style],
    pointerEvents: "box-none",
    testID: testID,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
      style: _reactNative.StyleSheet.absoluteFill,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Defs, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.LinearGradient, {
          id: gradientId,
          x1: "0",
          y1: "0",
          x2: "0",
          y2: "1",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
            offset: 0,
            stopColor: theme.palette.black,
            stopOpacity: BACKDROP_TOP_OPACITY
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
            offset: 1,
            stopColor: theme.palette.black,
            stopOpacity: BACKDROP_BOTTOM_OPACITY
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
        width: "100%",
        height: "100%",
        fill: `url(#${gradientId})`
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.pill,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        accessibilityRole: "tablist",
        testID: testID ? `${testID}.tabs` : undefined,
        onLayout: handleTabsLayout,
        style: styles.tabs,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
          pointerEvents: "none",
          testID: testID ? `${testID}.indicator` : undefined,
          style: [styles.indicator, {
            width: indicatorWidth
          }, tabsWidth === null ? {
            left: `${PERCENT * indicatorIndex / tabCount}%`
          } : indicatorAnimatedStyle]
        }), tabs.map(tab => /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.TabBarItem, {
          icon: tab.icon,
          isFocused: tab.key === activeKey,
          hasBadge: tab.hasBadge,
          accessibilityLabel: tab.accessibilityLabel,
          onPress: () => onTabPress(tab.key),
          onPressIn: onTabPressIn ? () => onTabPressIn(tab.key) : undefined,
          onLongPress: onTabLongPress ? () => onTabLongPress(tab.key) : undefined,
          style: styles.tab,
          testID: tab.testID
        }, tab.key))]
      })
    })]
  });
};

/** Floating bottom tab bar: icon tabs in a white pill over a fade backdrop. Figma `CustomTabBar`. */
const CustomTabBar = exports.CustomTabBar = /*#__PURE__*/(0, _react.memo)(CustomTabBarComponent);
//# sourceMappingURL=CustomTabBar.js.map