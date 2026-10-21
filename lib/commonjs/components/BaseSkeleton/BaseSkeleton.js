"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseSkeleton = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _index = require("../../theme/index.js");
var _skeletonAnimation = require("./skeletonAnimation.js");
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// App BaseSkeleton default height (off-scale: not in Figma Spacing).
const DEFAULT_HEIGHT = 22;
// The shimmer band is 1.2× the block width and sweeps from -band to +band.
const SHIMMER_WIDTH_FACTOR = 1.2;
// App gradient used `${color}80` / `#FFFFFF80`: hex alpha 0x80.
const SHIMMER_ALPHA = 0x80 / 0xff;
// App gradient `locations`; outer stops are the solid fill, inner ones the white glare.
const SHIMMER_STOPS = [{
  offset: 0,
  isGlare: false,
  opacity: 1
}, {
  offset: 0.1,
  isGlare: false,
  opacity: SHIMMER_ALPHA
}, {
  offset: 0.3,
  isGlare: true,
  opacity: SHIMMER_ALPHA
}, {
  offset: 0.5,
  isGlare: true,
  opacity: SHIMMER_ALPHA
}, {
  offset: 0.7,
  isGlare: true,
  opacity: SHIMMER_ALPHA
}, {
  offset: 0.9,
  isGlare: false,
  opacity: SHIMMER_ALPHA
}, {
  offset: 1,
  isGlare: false,
  opacity: 1
}];
const createStyles = theme => _reactNative.StyleSheet.create({
  measured: {
    borderWidth: theme.stroke[1],
    overflow: 'hidden'
  },
  shimmer: {
    height: '100%'
  }
});
const BaseSkeletonComponent = ({
  width = '100%',
  height = DEFAULT_HEIGHT,
  borderRadius,
  backgroundColor,
  style,
  accessibilityLabel,
  testID
}) => {
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  const gradientId = `skeleton-${(0, _react.useId)().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [containerWidth, setContainerWidth] = (0, _react.useState)(0);
  const releaseAnimationRef = (0, _react.useRef)(null);
  const setShimmerView = (0, _react.useCallback)(node => {
    releaseAnimationRef.current?.();
    releaseAnimationRef.current = node ? (0, _skeletonAnimation.retainSkeletonAnimation)() : null;
  }, []);
  const fillColor = backgroundColor ?? theme.colors.bg.subtle;
  const baseStyle = (0, _react.useMemo)(() => ({
    width,
    height,
    borderRadius: borderRadius ?? theme.radius.sm,
    backgroundColor: fillColor
  }), [borderRadius, fillColor, height, theme.radius.sm, width]);
  const gradientWidth = containerWidth * SHIMMER_WIDTH_FACTOR;
  // One native interpolation node per measured width, not per render.
  const translateX = (0, _react.useMemo)(() => _skeletonAnimation.skeletonAnimationProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-gradientWidth, gradientWidth]
  }), [gradientWidth]);
  const onLayout = (0, _react.useCallback)(event => {
    const nextWidth = event.nativeEvent.layout.width;
    setContainerWidth(prev => prev === nextWidth ? prev : nextWidth);
  }, []);
  const isAccessible = Boolean(accessibilityLabel);
  const a11yProps = {
    accessible: isAccessible,
    accessibilityRole: isAccessible ? 'progressbar' : undefined,
    accessibilityLabel,
    accessibilityState: isAccessible ? {
      busy: true
    } : undefined,
    accessibilityElementsHidden: !isAccessible,
    importantForAccessibility: isAccessible ? 'auto' : 'no-hide-descendants'
  };
  if (containerWidth === 0) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      onLayout: onLayout,
      style: [baseStyle, style],
      testID: testID,
      ...a11yProps
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    onLayout: onLayout,
    style: [baseStyle, styles.measured, {
      borderColor: fillColor
    }, style],
    testID: testID,
    ...a11yProps,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      ref: setShimmerView,
      style: [styles.shimmer, {
        width: gradientWidth,
        transform: [{
          translateX
        }]
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
        width: gradientWidth,
        height: "100%",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Defs, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.LinearGradient, {
            id: gradientId,
            x1: "0",
            y1: "0",
            x2: "1",
            y2: "0",
            children: SHIMMER_STOPS.map(stop => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Stop, {
              offset: stop.offset,
              stopColor: stop.isGlare ? theme.palette.white : fillColor,
              stopOpacity: stop.opacity
            }, stop.offset))
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
          width: "100%",
          height: "100%",
          fill: `url(#${gradientId})`
        })]
      })
    })
  });
};

/** Shimmering placeholder block. All skeletons on screen share one native animation loop. */
const BaseSkeleton = exports.BaseSkeleton = /*#__PURE__*/(0, _react.memo)(BaseSkeletonComponent);
//# sourceMappingURL=BaseSkeleton.js.map