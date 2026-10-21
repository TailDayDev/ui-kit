"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingWrapper = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const IS_ANDROID = _reactNative.Platform.OS === 'android';
// App cross-fade between skeleton and content.
const CONTENT_TRANSITION_DURATION_MS = 300;
const styles = _reactNative.StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    flex: 1
  },
  contentContainer: {
    flexGrow: 1
  },
  content: {
    width: '100%',
    flex: 1
  },
  scrollSkeleton: {
    width: '100%',
    flexGrow: 1
  },
  contentFitContent: {
    flex: 0
  },
  exitingSkeleton: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    zIndex: 1
  },
  containerFitContent: {
    flex: 0
  }
});

/**
 * Shows `skeleton` while `loading`, then the `children`. On iOS the skeleton
 * cross-fades into the content; Android switches instantly. With
 * `enablePullToRefresh` the content sits in a `ScrollView` with a `RefreshControl`.
 */
const LoadingWrapper = props => {
  const {
    loading,
    skeleton,
    children,
    fitContent = false,
    style,
    nestedScrollEnabled,
    keyboardShouldPersistTaps,
    showsVerticalScrollIndicator,
    onScroll,
    scrollEventThrottle,
    contentContainerStyle,
    onLayout,
    progressViewOffset,
    skipExitAnimation = false
  } = props;
  const theme = (0, _index.useTheme)();
  const contentOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(loading ? 0 : 1)).current;
  const skeletonOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(loading ? 1 : 0)).current;
  const [isSkeletonVisible, setIsSkeletonVisible] = (0, _react.useState)(loading);
  (0, _react.useEffect)(() => {
    contentOpacity.stopAnimation();
    skeletonOpacity.stopAnimation();
    if (IS_ANDROID) {
      contentOpacity.setValue(loading ? 0 : 1);
      skeletonOpacity.setValue(loading ? 1 : 0);
      setIsSkeletonVisible(loading);
      return undefined;
    }
    if (loading) {
      contentOpacity.setValue(0);
      skeletonOpacity.setValue(1);
      setIsSkeletonVisible(true);
      return undefined;
    }
    if (skipExitAnimation) {
      contentOpacity.setValue(1);
      skeletonOpacity.setValue(0);
      setIsSkeletonVisible(false);
      return undefined;
    }
    if (!isSkeletonVisible) {
      contentOpacity.setValue(1);
      skeletonOpacity.setValue(0);
      return undefined;
    }
    const transition = _reactNative.Animated.parallel([_reactNative.Animated.timing(contentOpacity, {
      toValue: 1,
      duration: CONTENT_TRANSITION_DURATION_MS,
      useNativeDriver: true
    }), _reactNative.Animated.timing(skeletonOpacity, {
      toValue: 0,
      duration: CONTENT_TRANSITION_DURATION_MS,
      useNativeDriver: true
    })]);
    transition.start(({
      finished
    }) => {
      if (finished) {
        setIsSkeletonVisible(false);
      }
    });
    return () => transition.stop();
  }, [contentOpacity, isSkeletonVisible, loading, skeletonOpacity, skipExitAnimation]);

  // The skeleton has to occupy the same box as the content it stands in for.
  // In the ScrollView branch the content height is unbounded, where the
  // content style (flexBasis 0) would collapse to nothing, so grow instead.
  const skeletonLayoutStyle = props.enablePullToRefresh ? styles.scrollSkeleton : styles.content;
  const shouldSkipExitAnimation = skipExitAnimation && !loading;
  let skeletonNode = null;
  if (loading) {
    skeletonNode = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      style: [skeletonLayoutStyle, fitContent && styles.contentFitContent, {
        opacity: skeletonOpacity
      }],
      children: skeleton
    });
  } else if (!shouldSkipExitAnimation && isSkeletonVisible) {
    skeletonNode = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
      pointerEvents: "none",
      style: [styles.exitingSkeleton, {
        opacity: skeletonOpacity
      }],
      children: skeleton
    });
  }
  const contentNode = loading ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Animated.View, {
    style: [styles.content, fitContent && styles.contentFitContent, {
      opacity: shouldSkipExitAnimation ? 1 : contentOpacity
    }],
    children: children
  });
  if (props.enablePullToRefresh) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.ScrollView, {
      style: [styles.container, style],
      contentContainerStyle: [styles.contentContainer, contentContainerStyle],
      alwaysBounceVertical: true,
      refreshControl: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.RefreshControl, {
        refreshing: props.refreshing,
        onRefresh: props.onRetry,
        tintColor: theme.colors.icon.accent,
        progressViewOffset: progressViewOffset
      }),
      nestedScrollEnabled: nestedScrollEnabled,
      keyboardShouldPersistTaps: keyboardShouldPersistTaps,
      showsVerticalScrollIndicator: showsVerticalScrollIndicator,
      onScroll: onScroll,
      scrollEventThrottle: scrollEventThrottle,
      onLayout: onLayout,
      children: [skeletonNode, contentNode]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.container, fitContent && styles.containerFitContent, style],
    children: [skeletonNode, contentNode]
  });
};
exports.LoadingWrapper = LoadingWrapper;
//# sourceMappingURL=LoadingWrapper.js.map