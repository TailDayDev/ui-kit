"use strict";

import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text as RNText, StyleSheet, TouchableOpacity, View } from 'react-native';
import { DotsVerticalIcon } from "../../icons/DotsVerticalIcon.js";
import { Icon, Text } from "../../primitives/index.js";
import { useTheme, useThemedStyles } from "../../theme/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const createStyles = theme => StyleSheet.create({
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
    ...StyleSheet.absoluteFillObject,
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
export const PhotoUploadPreview = ({
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
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const [displayUrl, setDisplayUrl] = useState(photo.fileUrl ?? undefined);
  const photoStatus = photo.status ?? 'loaded';
  const isLoaded = photoStatus === 'loaded';
  const isErrorStatus = photoStatus === 'error';
  const hasActionHandler = Boolean(onImagePress || onSettingsPress);
  const photoCacheKey = photo.fileUrl ? providedPhotoCacheKey : undefined;
  useEffect(() => {
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
    content = displayUrl ? /*#__PURE__*/_jsx(Image, {
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
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.root, {
      width: size,
      height: size
    }, containerStyle],
    testID: testID,
    accessibilityState: isLoaded ? undefined : {
      busy: !isErrorStatus
    },
    children: [isLoaded && onImagePress ? /*#__PURE__*/_jsx(Pressable, {
      style: styles.fill,
      onPress: onImagePress,
      accessibilityRole: "imagebutton",
      accessibilityLabel: photo.description ?? undefined,
      children: content
    }) : content, isLoaded && photo.isCover && coverLabel ? /*#__PURE__*/_jsx(Text, {
      variant: "caption/medium",
      color: "inverse",
      style: styles.coverBadge,
      children: coverLabel
    }) : null, isLoaded && hasActionHandler ? /*#__PURE__*/_jsx(TouchableOpacity, {
      style: styles.settingsBtn,
      onPress: onSettingsPress ?? onImagePress,
      accessibilityRole: "button",
      accessibilityLabel: settingsAccessibilityLabel,
      children: /*#__PURE__*/_jsx(Icon, {
        icon: DotsVerticalIcon,
        color: "text.inverse"
      })
    }) : null, isLoaded ? null : /*#__PURE__*/_jsxs(View, {
      style: [styles.overlay, placeholderStyle],
      children: [isErrorStatus ? null : /*#__PURE__*/_jsx(ActivityIndicator, {
        color: theme.colors.text.inverse
      }), isErrorStatus && errorText ?
      /*#__PURE__*/
      // App: plain text with only a color (platform font), kept 1:1.
      _jsx(RNText, {
        style: styles.errorText,
        children: errorText
      }) : null]
    })]
  });
};
//# sourceMappingURL=PhotoUploadPreview.js.map