"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentedControl = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
/** Pill animation from the app `SegmentedControl` (shared with StickyTabs timing). */
const PILL_ANIMATION_MS = 250;
const PILL_EASING = _reactNativeReanimated.Easing.out(_reactNativeReanimated.Easing.quad);
/** Container padding on both sides (2 × space[1]) subtracted from the measured width. */
const CONTAINER_HORIZONTAL_PADDING = 8;
/** Width changes below this are layout noise and ignored. */
const LAYOUT_WIDTH_EPSILON = 1;
/** Segment height from the app `SegmentedControl` (off-scale: not in Figma Spacing). */
const SEGMENT_HEIGHT = 38;
/** Android elevation that lifts labels above the pill (app value). */
const SEGMENTS_ANDROID_ELEVATION = 8;
/**
 * iOS pill shadow from the app: `rgba(121, 98, 255, 0.30)`, offset 0/4,
 * radius 8, opacity 1. Expressed as the accent color with opacity 0.3, which
 * iOS composes to the same value. No Figma effect matches, so the app look is kept.
 */
const PILL_SHADOW_OPACITY = 0.3;
const PILL_SHADOW_OFFSET = {
  width: 0,
  height: 4
};
const PILL_SHADOW_RADIUS = 8;

/**
 * Segmented tabs with a sliding pill (app `shared/ui/service/uielements/SegmentedControl`).
 * The pill either follows a paged `scrollX` (RN Animated, interpolated) or
 * animates on the UI thread with Reanimated when the selection changes.
 */
const SegmentedControl = ({
  options,
  selectedIndex,
  onChange,
  testIDs,
  scrollX,
  screenWidth = 0,
  syncWithScroll = true,
  isImmediatePressFeedback = false,
  animationDurationMs = PILL_ANIMATION_MS
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const [containerWidth, setContainerWidth] = (0, _react.useState)(0);
  const segmentWidth = options.length > 0 ? containerWidth / options.length : 0;
  const indicatorTranslateX = (0, _reactNativeReanimated.useSharedValue)(0);
  const containerWidthRef = (0, _react.useRef)(0);
  const isMeasuredRef = (0, _react.useRef)(false);
  const prevSelectedIndexRef = (0, _react.useRef)(selectedIndex);
  const immediateTargetIndexRef = (0, _react.useRef)(null);
  const isScrollLinked = syncWithScroll && !!scrollX;
  const scrollTranslateX = (0, _react.useMemo)(() => {
    if (!isScrollLinked || !scrollX || screenWidth <= 0 || segmentWidth <= 0 || options.length === 0) {
      return null;
    }
    return scrollX.interpolate({
      inputRange: options.map((_, i) => i * screenWidth),
      outputRange: options.map((_, i) => i * segmentWidth),
      extrapolate: 'clamp'
    });
    // Only the option count matters for the ranges, as in the app.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrollLinked, scrollX, screenWidth, segmentWidth, options.length]);
  const isUsingScrollLinkedIndicator = scrollTranslateX !== null;
  const indicatorAnimatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateX: indicatorTranslateX.value
    }]
  }));
  (0, _react.useEffect)(() => {
    if (isUsingScrollLinkedIndicator) {
      isMeasuredRef.current = false;
      prevSelectedIndexRef.current = selectedIndex;
      immediateTargetIndexRef.current = null;
      return;
    }
    if (segmentWidth <= 0) {
      return;
    }
    const targetPx = selectedIndex * segmentWidth;
    const previousSelectedIndex = prevSelectedIndexRef.current;
    const isSelectedIndexChanged = previousSelectedIndex !== selectedIndex;
    const isImmediateTargetConfirmed = isSelectedIndexChanged && immediateTargetIndexRef.current === selectedIndex;
    prevSelectedIndexRef.current = selectedIndex;
    if (isImmediateTargetConfirmed) {
      immediateTargetIndexRef.current = null;
      isMeasuredRef.current = true;
      return;
    }
    if (isSelectedIndexChanged) {
      immediateTargetIndexRef.current = null;
    }
    if (!isMeasuredRef.current || !isSelectedIndexChanged) {
      isMeasuredRef.current = true;
      indicatorTranslateX.value = targetPx;
      return;
    }
    indicatorTranslateX.value = (0, _reactNativeReanimated.withTiming)(targetPx, {
      duration: animationDurationMs,
      easing: PILL_EASING
    });
  }, [indicatorTranslateX, isUsingScrollLinkedIndicator, animationDurationMs, selectedIndex, segmentWidth]);
  const handleLayout = e => {
    const layoutWidth = e.nativeEvent.layout.width;
    const nextWidth = layoutWidth - CONTAINER_HORIZONTAL_PADDING;
    if (nextWidth <= 0 || options.length === 0) {
      return;
    }
    const prevWidth = containerWidthRef.current;
    if (prevWidth > 0 && Math.abs(nextWidth - prevWidth) < LAYOUT_WIDTH_EPSILON) {
      return;
    }
    containerWidthRef.current = nextWidth;
    setContainerWidth(nextWidth);
  };
  const handleOptionPress = index => {
    if (isImmediatePressFeedback && !isUsingScrollLinkedIndicator && segmentWidth > 0 && index !== selectedIndex) {
      immediateTargetIndexRef.current = index;
      indicatorTranslateX.value = (0, _reactNativeReanimated.withTiming)(index * segmentWidth, {
        duration: animationDurationMs,
        easing: PILL_EASING
      });
    }
    onChange(index);
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    onLayout: handleLayout,
    accessibilityRole: "tablist",
    children: [scrollTranslateX ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      pointerEvents: "none",
      style: [styles.selectedBackground, {
        width: segmentWidth,
        transform: [{
          translateX: scrollTranslateX
        }]
      }]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
      pointerEvents: "none",
      style: [styles.selectedBackground, {
        width: segmentWidth
      }, indicatorAnimatedStyle]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.segmentsRow,
      pointerEvents: "box-none",
      children: options.map((option, idx) => {
        const isSelected = selectedIndex === idx;
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          testID: testIDs?.[idx],
          accessibilityRole: "tab",
          accessibilityState: {
            selected: isSelected
          },
          style: segmentWidth ? [styles.option, {
            width: segmentWidth
          }] : [styles.option,
          // The pill needs a measured width. Until the first layout,
          // the selected segment paints the same shape in place so
          // the control does not appear without a selection.
          isSelected && styles.unmeasuredSelectedOption],
          onPress: () => handleOptionPress(idx),
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
            variant: isSelected ? 'body/bold' : 'body/medium',
            color: isSelected ? 'accent' : 'primary',
            align: "center",
            children: option
          })
        }, idx);
      })
    })]
  });
};
exports.SegmentedControl = SegmentedControl;
const createStyles = theme => {
  const pillShadow = {
    shadowColor: theme.colors.bg.accent,
    shadowOffset: PILL_SHADOW_OFFSET,
    shadowOpacity: PILL_SHADOW_OPACITY,
    shadowRadius: PILL_SHADOW_RADIUS
  };
  return _reactNative.StyleSheet.create({
    container: {
      backgroundColor: theme.colors.bg.accentSoft,
      borderRadius: theme.radius.lg,
      flexDirection: 'row',
      overflow: 'hidden',
      padding: theme.space[1],
      position: 'relative'
    },
    option: {
      alignItems: 'center',
      borderRadius: theme.radius.md,
      flex: 1,
      height: SEGMENT_HEIGHT,
      justifyContent: 'center'
    },
    segmentsRow: {
      flex: 1,
      flexDirection: 'row',
      ..._reactNative.Platform.select({
        android: {
          elevation: SEGMENTS_ANDROID_ELEVATION,
          zIndex: 2
        },
        ios: {
          zIndex: 2
        }
      })
    },
    selectedBackground: {
      backgroundColor: theme.colors.bg.surface,
      borderRadius: theme.radius.md,
      bottom: theme.space[1],
      left: theme.space[1],
      position: 'absolute',
      top: theme.space[1],
      ..._reactNative.Platform.select({
        android: {
          elevation: 0
        },
        ios: pillShadow
      })
    },
    unmeasuredSelectedOption: {
      backgroundColor: theme.colors.bg.surface,
      ..._reactNative.Platform.select({
        ios: pillShadow
      })
    }
  });
};
//# sourceMappingURL=SegmentedControl.js.map