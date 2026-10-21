"use strict";

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { LoadingScreenIllustration } from "./LoadingScreenIllustration.js";

// App value: keeps the overlay above every sibling, incl. Android elevation.
import { jsx as _jsx } from "react/jsx-runtime";
const OVERLAY_Z_INDEX = 999999;
const createStyles = theme => StyleSheet.create({
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
    zIndex: OVERLAY_Z_INDEX
  },
  wallpaper: {
    ...StyleSheet.absoluteFillObject,
    margin: 0,
    padding: 0
  }
});

/** Blocking full-screen loader: branded wallpaper or an accent spinner. */
export const FullScreenLoader = ({
  wallpaperSource = true,
  visible = true,
  accessibilityLabel,
  testID
}) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  if (!visible) {
    return null;
  }
  return /*#__PURE__*/_jsx(View, {
    pointerEvents: "auto",
    style: styles.fullScreen,
    testID: testID,
    accessible: true,
    accessibilityRole: "progressbar",
    accessibilityLabel: accessibilityLabel,
    accessibilityState: {
      busy: true
    },
    children: wallpaperSource ? /*#__PURE__*/_jsx(View, {
      style: styles.wallpaper,
      testID: testID ? `${testID}.wallpaper` : undefined,
      children: /*#__PURE__*/_jsx(LoadingScreenIllustration, {})
    }) : /*#__PURE__*/_jsx(ActivityIndicator, {
      size: "large",
      color: theme.colors.icon.accent,
      testID: testID ? `${testID}.spinner` : undefined
    })
  });
};
//# sourceMappingURL=FullScreenLoader.js.map