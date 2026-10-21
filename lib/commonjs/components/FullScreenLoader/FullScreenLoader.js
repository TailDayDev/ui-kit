"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullScreenLoader = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _LoadingScreenIllustration = require("./LoadingScreenIllustration.js");
var _jsxRuntime = require("react/jsx-runtime");
// App value: keeps the overlay above every sibling, incl. Android elevation.
const OVERLAY_Z_INDEX = 999999;
const createStyles = theme => _reactNative.StyleSheet.create({
  fullScreen: {
    ..._reactNative.StyleSheet.absoluteFillObject,
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
    ..._reactNative.StyleSheet.absoluteFillObject,
    margin: 0,
    padding: 0
  }
});

/** Blocking full-screen loader: branded wallpaper or an accent spinner. */
const FullScreenLoader = ({
  wallpaperSource = true,
  visible = true,
  accessibilityLabel,
  testID
}) => {
  const theme = (0, _index.useTheme)();
  const styles = (0, _index.useThemedStyles)(createStyles);
  if (!visible) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    pointerEvents: "auto",
    style: styles.fullScreen,
    testID: testID,
    accessible: true,
    accessibilityRole: "progressbar",
    accessibilityLabel: accessibilityLabel,
    accessibilityState: {
      busy: true
    },
    children: wallpaperSource ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.wallpaper,
      testID: testID ? `${testID}.wallpaper` : undefined,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadingScreenIllustration.LoadingScreenIllustration, {})
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
      size: "large",
      color: theme.colors.icon.accent,
      testID: testID ? `${testID}.spinner` : undefined
    })
  });
};
exports.FullScreenLoader = FullScreenLoader;
//# sourceMappingURL=FullScreenLoader.js.map