"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkFallback = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1
  }
});

/**
 * Shows `children` when online or when content is available; otherwise shows
 * `view` in a pull-to-refresh `ScrollView` that re-checks the network and calls
 * `resetCallback` once it is back.
 */
const NetworkFallback = ({
  children,
  isContentAvailable,
  isOffline,
  refreshNetwork,
  resetCallback,
  view
}) => {
  const theme = (0, _index.useTheme)();
  const [isRefreshing, setIsRefreshing] = (0, _react.useState)(false);
  const isRefreshInProgressRef = (0, _react.useRef)(false);
  const isFallbackVisible = !isContentAvailable && (isOffline || isRefreshing);
  const handleRefresh = (0, _react.useCallback)(async () => {
    if (isRefreshInProgressRef.current) {
      return;
    }
    isRefreshInProgressRef.current = true;
    setIsRefreshing(true);
    try {
      const isNetworkRestored = await refreshNetwork();
      if (isNetworkRestored) {
        await resetCallback();
      }
    } catch {
      // The owning query renders its error state after connectivity is restored.
    } finally {
      isRefreshInProgressRef.current = false;
      setIsRefreshing(false);
    }
  }, [refreshNetwork, resetCallback]);
  if (!isFallbackVisible) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: children
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
    alwaysBounceVertical: true,
    contentContainerStyle: styles.content,
    refreshControl: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.RefreshControl, {
      refreshing: isRefreshing,
      onRefresh: handleRefresh,
      tintColor: theme.colors.icon.accent
    }),
    showsVerticalScrollIndicator: false,
    style: styles.container,
    children: view
  });
};
exports.NetworkFallback = NetworkFallback;
//# sourceMappingURL=NetworkFallback.js.map