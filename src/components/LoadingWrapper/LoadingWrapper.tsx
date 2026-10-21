import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { useTheme } from '../../theme';
import type { LoadingWrapperProps } from './LoadingWrapper.types';

const IS_ANDROID = Platform.OS === 'android';
// App cross-fade between skeleton and content.
const CONTENT_TRANSITION_DURATION_MS = 300;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
    flex: 1,
  },
  scrollSkeleton: {
    width: '100%',
    flexGrow: 1,
  },
  contentFitContent: {
    flex: 0,
  },
  exitingSkeleton: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  containerFitContent: {
    flex: 0,
  },
});

/**
 * Shows `skeleton` while `loading`, then the `children`. On iOS the skeleton
 * cross-fades into the content; Android switches instantly. With
 * `enablePullToRefresh` the content sits in a `ScrollView` with a `RefreshControl`.
 */
export const LoadingWrapper = (props: LoadingWrapperProps) => {
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
    skipExitAnimation = false,
  } = props;
  const theme = useTheme();
  const contentOpacity = useRef(new Animated.Value(loading ? 0 : 1)).current;
  const skeletonOpacity = useRef(new Animated.Value(loading ? 1 : 0)).current;
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(loading);

  useEffect(() => {
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

    const transition = Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: CONTENT_TRANSITION_DURATION_MS,
        useNativeDriver: true,
      }),
      Animated.timing(skeletonOpacity, {
        toValue: 0,
        duration: CONTENT_TRANSITION_DURATION_MS,
        useNativeDriver: true,
      }),
    ]);

    transition.start(({ finished }) => {
      if (finished) {
        setIsSkeletonVisible(false);
      }
    });

    return () => transition.stop();
  }, [
    contentOpacity,
    isSkeletonVisible,
    loading,
    skeletonOpacity,
    skipExitAnimation,
  ]);

  // The skeleton has to occupy the same box as the content it stands in for.
  // In the ScrollView branch the content height is unbounded, where the
  // content style (flexBasis 0) would collapse to nothing, so grow instead.
  const skeletonLayoutStyle = props.enablePullToRefresh
    ? styles.scrollSkeleton
    : styles.content;

  const shouldSkipExitAnimation = skipExitAnimation && !loading;

  let skeletonNode = null;
  if (loading) {
    skeletonNode = (
      <Animated.View
        style={[
          skeletonLayoutStyle,
          fitContent && styles.contentFitContent,
          { opacity: skeletonOpacity },
        ]}
      >
        {skeleton}
      </Animated.View>
    );
  } else if (!shouldSkipExitAnimation && isSkeletonVisible) {
    skeletonNode = (
      <Animated.View
        pointerEvents="none"
        style={[styles.exitingSkeleton, { opacity: skeletonOpacity }]}
      >
        {skeleton}
      </Animated.View>
    );
  }

  const contentNode = loading ? null : (
    <Animated.View
      style={[
        styles.content,
        fitContent && styles.contentFitContent,
        { opacity: shouldSkipExitAnimation ? 1 : contentOpacity },
      ]}
    >
      {children}
    </Animated.View>
  );

  if (props.enablePullToRefresh) {
    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        alwaysBounceVertical
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRetry}
            tintColor={theme.colors.icon.accent}
            progressViewOffset={progressViewOffset}
          />
        }
        nestedScrollEnabled={nestedScrollEnabled}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
        onLayout={onLayout}
      >
        {skeletonNode}
        {contentNode}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        fitContent && styles.containerFitContent,
        style,
      ]}
    >
      {skeletonNode}
      {contentNode}
    </View>
  );
};
