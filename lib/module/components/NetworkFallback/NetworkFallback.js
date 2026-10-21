"use strict";

import { useCallback, useRef, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from "../../theme/index.js";
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
const styles = StyleSheet.create({
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
export const NetworkFallback = ({
  children,
  isContentAvailable,
  isOffline,
  refreshNetwork,
  resetCallback,
  view
}) => {
  const theme = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isRefreshInProgressRef = useRef(false);
  const isFallbackVisible = !isContentAvailable && (isOffline || isRefreshing);
  const handleRefresh = useCallback(async () => {
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
    return /*#__PURE__*/_jsx(_Fragment, {
      children: children
    });
  }
  return /*#__PURE__*/_jsx(ScrollView, {
    alwaysBounceVertical: true,
    contentContainerStyle: styles.content,
    refreshControl: /*#__PURE__*/_jsx(RefreshControl, {
      refreshing: isRefreshing,
      onRefresh: handleRefresh,
      tintColor: theme.colors.icon.accent
    }),
    showsVerticalScrollIndicator: false,
    style: styles.container,
    children: view
  });
};
//# sourceMappingURL=NetworkFallback.js.map