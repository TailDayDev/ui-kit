import { memo, useCallback, useEffect, useId, useMemo, useState } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { BaseSkeletonProps } from './BaseSkeleton.types';
import {
  retainSkeletonAnimation,
  skeletonAnimationProgress,
} from './skeletonAnimation';

// Figma `BaseSkeleton` default height.
const DEFAULT_HEIGHT = 20;
// The shimmer band is 1.2× the block width and sweeps from -band to +band.
const SHIMMER_WIDTH_FACTOR = 1.2;
// App gradient used `${color}80` / `#FFFFFF80`: hex alpha 0x80.
const SHIMMER_ALPHA = 0x80 / 0xff;
// App gradient `locations`; outer stops are the solid fill, inner ones the white glare.
const SHIMMER_STOPS = [
  { offset: 0, isGlare: false, opacity: 1 },
  { offset: 0.1, isGlare: false, opacity: SHIMMER_ALPHA },
  { offset: 0.3, isGlare: true, opacity: SHIMMER_ALPHA },
  { offset: 0.5, isGlare: true, opacity: SHIMMER_ALPHA },
  { offset: 0.7, isGlare: true, opacity: SHIMMER_ALPHA },
  { offset: 0.9, isGlare: false, opacity: SHIMMER_ALPHA },
  { offset: 1, isGlare: false, opacity: 1 },
] as const;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    measured: {
      borderWidth: theme.stroke[1],
      overflow: 'hidden',
    },
    shimmer: {
      height: '100%',
    },
  });

const BaseSkeletonComponent = ({
  width = '100%',
  height = DEFAULT_HEIGHT,
  borderRadius,
  backgroundColor,
  style,
  accessibilityLabel,
  testID,
}: BaseSkeletonProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const gradientId = `skeleton-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [containerWidth, setContainerWidth] = useState(0);
  const isMeasured = containerWidth > 0;
  // The shared shimmer loop runs while at least one measured skeleton is mounted.
  // Kept out of a callback ref: Animated re-creates refs on JS-driven frames (web),
  // which would restart the loop on every frame.
  useEffect(
    () => (isMeasured ? retainSkeletonAnimation() : undefined),
    [isMeasured],
  );

  const fillColor = backgroundColor ?? theme.colors.bg.subtle;
  const baseStyle = useMemo<ViewStyle>(
    () => ({
      width,
      height,
      borderRadius: borderRadius ?? theme.radius.sm,
      backgroundColor: fillColor,
    }),
    [borderRadius, fillColor, height, theme.radius.sm, width],
  );

  const gradientWidth = containerWidth * SHIMMER_WIDTH_FACTOR;
  // One native interpolation node per measured width, not per render.
  const translateX = useMemo(
    () =>
      skeletonAnimationProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [-gradientWidth, gradientWidth],
      }),
    [gradientWidth],
  );

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;
    setContainerWidth(prev => (prev === nextWidth ? prev : nextWidth));
  }, []);

  const isAccessible = Boolean(accessibilityLabel);
  const a11yProps = {
    accessible: isAccessible,
    accessibilityRole: isAccessible ? ('progressbar' as const) : undefined,
    accessibilityLabel,
    accessibilityState: isAccessible ? { busy: true } : undefined,
    accessibilityElementsHidden: !isAccessible,
    importantForAccessibility: isAccessible
      ? ('auto' as const)
      : ('no-hide-descendants' as const),
  };

  if (!isMeasured) {
    return (
      <View
        onLayout={onLayout}
        style={[baseStyle, style]}
        testID={testID}
        {...a11yProps}
      />
    );
  }

  return (
    <View
      onLayout={onLayout}
      style={[baseStyle, styles.measured, { borderColor: fillColor }, style]}
      testID={testID}
      {...a11yProps}
    >
      <Animated.View
        style={[
          styles.shimmer,
          { width: gradientWidth, transform: [{ translateX }] },
        ]}
      >
        <Svg width={gradientWidth} height="100%">
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              {SHIMMER_STOPS.map(stop => (
                <Stop
                  key={stop.offset}
                  offset={stop.offset}
                  stopColor={stop.isGlare ? theme.palette.white : fillColor}
                  stopOpacity={stop.opacity}
                />
              ))}
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill={`url(#${gradientId})`} />
        </Svg>
      </Animated.View>
    </View>
  );
};

/** Shimmering placeholder block. All skeletons on screen share one native animation loop. */
export const BaseSkeleton = memo(BaseSkeletonComponent);
