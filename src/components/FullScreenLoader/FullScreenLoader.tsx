import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { FullScreenLoaderProps } from './FullScreenLoader.types';
import { LoadingScreenIllustration } from './LoadingScreenIllustration';

// App value: keeps the overlay above every sibling, incl. Android elevation.
const OVERLAY_Z_INDEX = 999999;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    fullScreen: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface,
      elevation: OVERLAY_Z_INDEX,
      justifyContent: 'center',
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      zIndex: OVERLAY_Z_INDEX,
    },
    wallpaper: {
      ...StyleSheet.absoluteFillObject,
      margin: 0,
      padding: 0,
    },
  });

/** Blocking full-screen loader: branded wallpaper or an accent spinner. */
export const FullScreenLoader = ({
  wallpaperSource = true,
  visible = true,
  accessibilityLabel,
  testID,
}: FullScreenLoaderProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);

  if (!visible) {
    return null;
  }

  return (
    <View
      pointerEvents="auto"
      style={styles.fullScreen}
      testID={testID}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ busy: true }}
    >
      {wallpaperSource ? (
        <View
          style={styles.wallpaper}
          testID={testID ? `${testID}.wallpaper` : undefined}
        >
          <LoadingScreenIllustration />
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color={theme.colors.icon.accent}
          testID={testID ? `${testID}.spinner` : undefined}
        />
      )}
    </View>
  );
};
