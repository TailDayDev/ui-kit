import { memo, useCallback, useEffect, useId, useRef, useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { TabBarItem } from '../TabBarItem';
import type { CustomTabBarProps } from './CustomTabBar.types';

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
const INDICATOR_EASING = Easing.out(Easing.cubic);
const PERCENT = 100;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      height: BACKDROP_HEIGHT,
      justifyContent: 'flex-end',
      paddingBottom: theme.space[6],
      paddingHorizontal: theme.space[6],
    },
    pill: {
      backgroundColor: theme.colors.bg.surface,
      borderRadius: theme.radius.full,
      boxShadow: [...theme.shadows.barFloating],
      padding: theme.space[2],
    },
    tabs: {
      flexDirection: 'row',
    },
    indicator: {
      backgroundColor: theme.colors.bg.accentSoft,
      borderRadius: theme.radius.full,
      height: INDICATOR_HEIGHT,
      left: 0,
      position: 'absolute',
      top: 0,
    },
    tab: {
      flex: 1,
      width: 'auto',
    },
  });

const CustomTabBarComponent = ({
  tabs,
  activeKey,
  onTabPress,
  onTabPressIn,
  onTabLongPress,
  style,
  testID,
}: CustomTabBarProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const gradientId = `custom-tab-bar-backdrop-${useId()}`;
  const [tabsWidth, setTabsWidth] = useState<number | null>(null);

  // A key outside the bar keeps the indicator where it was (app behaviour).
  const focusedIndex = tabs.findIndex(tab => tab.key === activeKey);
  const lastIndexRef = useRef(Math.max(focusedIndex, 0));
  if (focusedIndex >= 0) {
    lastIndexRef.current = focusedIndex;
  }
  const indicatorIndex = lastIndexRef.current;

  const tabCount = Math.max(tabs.length, 1);
  const tabWidth = tabsWidth === null ? 0 : tabsWidth / tabCount;
  const position = useSharedValue(indicatorIndex);

  useEffect(() => {
    position.value = withTiming(indicatorIndex, {
      duration: INDICATOR_DURATION_MS,
      easing: INDICATOR_EASING,
    });
  }, [indicatorIndex, position]);

  const indicatorAnimatedStyle = useAnimatedStyle(
    () => ({ transform: [{ translateX: position.value * tabWidth }] }),
    [tabWidth],
  );

  const handleTabsLayout = useCallback((event: LayoutChangeEvent) => {
    setTabsWidth(event.nativeEvent.layout.width);
  }, []);

  const indicatorWidth = `${PERCENT / tabCount}%` as const;

  return (
    <View style={[styles.root, style]} pointerEvents="box-none" testID={testID}>
      <Svg
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%"
        pointerEvents="none"
      >
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop
              offset={0}
              stopColor={theme.palette.black}
              stopOpacity={BACKDROP_TOP_OPACITY}
            />
            <Stop
              offset={1}
              stopColor={theme.palette.black}
              stopOpacity={BACKDROP_BOTTOM_OPACITY}
            />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${gradientId})`} />
      </Svg>
      <View style={styles.pill}>
        <View
          accessibilityRole="tablist"
          testID={testID ? `${testID}.tabs` : undefined}
          onLayout={handleTabsLayout}
          style={styles.tabs}
        >
          <Animated.View
            pointerEvents="none"
            testID={testID ? `${testID}.indicator` : undefined}
            style={[
              styles.indicator,
              { width: indicatorWidth },
              tabsWidth === null
                ? { left: `${(PERCENT * indicatorIndex) / tabCount}%` }
                : indicatorAnimatedStyle,
            ]}
          />
          {tabs.map(tab => (
            <TabBarItem
              key={tab.key}
              icon={tab.icon}
              isFocused={tab.key === activeKey}
              hasBadge={tab.hasBadge}
              accessibilityLabel={tab.accessibilityLabel}
              onPress={() => onTabPress(tab.key)}
              onPressIn={onTabPressIn ? () => onTabPressIn(tab.key) : undefined}
              onLongPress={
                onTabLongPress ? () => onTabLongPress(tab.key) : undefined
              }
              style={styles.tab}
              testID={tab.testID}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

/** Floating bottom tab bar: icon tabs in a white pill over a fade backdrop. Figma `CustomTabBar`. */
export const CustomTabBar = memo(CustomTabBarComponent);
