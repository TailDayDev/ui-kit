"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoUploadPreview = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _DotsVerticalIcon = require("../../icons/DotsVerticalIcon.js");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App overlay: `mediumGray` at 50%. */
const OVERLAY_ALPHA = 0.5;
/** App pill radius of the cover badge and the settings button (off-scale). */
const PILL_RADIUS = 20;
/** App settings button side (off-scale). */
const SETTINGS_BUTTON_SIZE = 28;
const REMOTE_URL_PATTERN = /^https?:\/\//i;

/** `#rgb` / `#rrggbb` → `rgba(...)`; other values are returned as is. */
const withOpacity = (color, alpha) => {
  const normalized = color.trim();
  if (normalized.startsWith('#')) {
    const hex = normalized.slice(1);
    const full = hex.length === 3 ? hex.split('').map(char => char + char).join('') : hex;
    if (full.length === 6) {
      const r = parseInt(full.slice(0, 2), 16);
      const g = parseInt(full.slice(2, 4), 16);
      const b = parseInt(full.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
  return normalized;
};
const createStyles = theme => _reactNative.StyleSheet.create({
  fill: {
    height: '100%',
    width: '100%'
  },
  root: {
    backgroundColor: theme.colors.overlay.scrim,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    position: 'relative'
  },
  overlay: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: withOpacity(theme.colors.text.secondary, OVERLAY_ALPHA),
    borderRadius: theme.radius.md,
    gap: theme.space[2],
    justifyContent: 'center'
  },
  errorText: {
    color: theme.colors.text.inverse
  },
  coverBadge: {
    backgroundColor: theme.colors.overlay.scrim,
    borderRadius: PILL_RADIUS,
    left: theme.space[2],
    padding: theme.space[2],
    position: 'absolute',
    top: theme.space[2]
  },
  settingsBtn: {
    alignItems: 'center',
    backgroundColor: theme.colors.overlay.scrim,
    borderRadius: PILL_RADIUS,
    height: SETTINGS_BUTTON_SIZE,
    justifyContent: 'center',
    position: 'absolute',
    right: theme.space[2],
    top: theme.space[2],
    width: SETTINGS_BUTTON_SIZE
  }
});

/** Square photo tile with upload overlay, cover badge and a settings button. */
const PhotoUploadPreview = ({
  photo,
  size,
  errorText,
  containerStyle,
  placeholderStyle,
  photoCacheKey: providedPhotoCacheKey,
  onImagePress,
  onSettingsPress,
  coverLabel,
  settingsAccessibilityLabel,
  renderImage,
  prefetchImage,
  testID
}) => {
  const theme = (0, _index2.useTheme)();
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const [displayUrl, setDisplayUrl] = (0, _react.useState)(photo.fileUrl ?? undefined);
  const photoStatus = photo.status ?? 'loaded';
  const isLoaded = photoStatus === 'loaded';
  const isErrorStatus = photoStatus === 'error';
  const hasActionHandler = Boolean(onImagePress || onSettingsPress);
  const photoCacheKey = photo.fileUrl ? providedPhotoCacheKey : undefined;
  (0, _react.useEffect)(() => {
    const nextUrl = photo.fileUrl ?? undefined;
    if (!nextUrl || nextUrl === displayUrl) {
      return;
    }
    const isRemote = REMOTE_URL_PATTERN.test(nextUrl.trim());
    if (prefetchImage && isRemote && displayUrl) {
      let isCancelled = false;
      prefetchImage(nextUrl, photoCacheKey).catch(() => null).finally(() => {
        if (!isCancelled) {
          setDisplayUrl(nextUrl);
        }
      });
      return () => {
        isCancelled = true;
      };
    }
    setDisplayUrl(nextUrl);
    return undefined;
  }, [displayUrl, photo.fileUrl, photoCacheKey, prefetchImage]);
  let content = renderImage?.({
    uri: displayUrl,
    size,
    photoCacheKey
  });
  if (!renderImage) {
    content = displayUrl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
      source: {
        uri: displayUrl
      },
      style: {
        width: size,
        height: size
      },
      resizeMode: "cover",
      testID: testID ? `${testID}.photo` : undefined
    }) : null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.root, {
      width: size,
      height: size
    }, containerStyle],
    testID: testID,
    accessibilityState: isLoaded ? undefined : {
      busy: !isErrorStatus
    },
    children: [isLoaded && onImagePress ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Pressable, {
      style: styles.fill,
      onPress: onImagePress,
      accessibilityRole: "imagebutton",
      accessibilityLabel: photo.description ?? undefined,
      children: content
    }) : content, isLoaded && photo.isCover && coverLabel ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "caption/medium",
      color: "inverse",
      style: styles.coverBadge,
      children: coverLabel
    }) : null, isLoaded && hasActionHandler ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      style: styles.settingsBtn,
      onPress: onSettingsPress ?? onImagePress,
      accessibilityRole: "button",
      accessibilityLabel: settingsAccessibilityLabel,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Icon, {
        icon: _DotsVerticalIcon.DotsVerticalIcon,
        color: "text.inverse"
      })
    }) : null, isLoaded ? null : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.overlay, placeholderStyle],
      children: [isErrorStatus ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
        color: theme.colors.text.inverse
      }), isErrorStatus && errorText ?
      /*#__PURE__*/
      // App: plain text with only a color (platform font), kept 1:1.
      (0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.errorText,
        children: errorText
      }) : null]
    })]
  });
};
exports.PhotoUploadPreview = PhotoUploadPreview;
//# sourceMappingURL=PhotoUploadPreview.js.map