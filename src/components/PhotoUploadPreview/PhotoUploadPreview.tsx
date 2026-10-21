import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { DotsVerticalIcon } from '../../icons/DotsVerticalIcon';
import { Icon, Text } from '../../primitives';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { PhotoUploadPreviewProps } from './PhotoUploadPreview.types';

/** App overlay: `mediumGray` at 50%. */
const OVERLAY_ALPHA = 0.5;
/** App pill radius of the cover badge and the settings button (off-scale). */
const PILL_RADIUS = 20;
/** App settings button side (off-scale). */
const SETTINGS_BUTTON_SIZE = 28;
const REMOTE_URL_PATTERN = /^https?:\/\//i;

/** `#rgb` / `#rrggbb` → `rgba(...)`; other values are returned as is. */
const withOpacity = (color: string, alpha: number) => {
  const normalized = color.trim();
  if (normalized.startsWith('#')) {
    const hex = normalized.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split('')
            .map(char => char + char)
            .join('')
        : hex;
    if (full.length === 6) {
      const r = parseInt(full.slice(0, 2), 16);
      const g = parseInt(full.slice(2, 4), 16);
      const b = parseInt(full.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
  return normalized;
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    fill: {
      height: '100%',
      width: '100%',
    },
    root: {
      backgroundColor: theme.colors.overlay.scrim,
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
      position: 'relative',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      backgroundColor: withOpacity(theme.colors.text.secondary, OVERLAY_ALPHA),
      borderRadius: theme.radius.md,
      gap: theme.space[2],
      justifyContent: 'center',
    },
    errorText: {
      color: theme.colors.text.inverse,
    },
    coverBadge: {
      backgroundColor: theme.colors.overlay.scrim,
      borderRadius: PILL_RADIUS,
      left: theme.space[2],
      padding: theme.space[2],
      position: 'absolute',
      top: theme.space[2],
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
      width: SETTINGS_BUTTON_SIZE,
    },
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
  testID,
}: PhotoUploadPreviewProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const [displayUrl, setDisplayUrl] = useState<string | undefined>(
    photo.fileUrl ?? undefined,
  );
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
      prefetchImage(nextUrl, photoCacheKey)
        .catch(() => null)
        .finally(() => {
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

  let content = renderImage?.({ uri: displayUrl, size, photoCacheKey });
  if (!renderImage) {
    content = displayUrl ? (
      <Image
        source={{ uri: displayUrl }}
        style={{ width: size, height: size }}
        resizeMode="cover"
        testID={testID ? `${testID}.photo` : undefined}
      />
    ) : null;
  }

  return (
    <View
      style={[styles.root, { width: size, height: size }, containerStyle]}
      testID={testID}
      accessibilityState={isLoaded ? undefined : { busy: !isErrorStatus }}
    >
      {isLoaded && onImagePress ? (
        <Pressable
          style={styles.fill}
          onPress={onImagePress}
          accessibilityRole="imagebutton"
          accessibilityLabel={photo.description ?? undefined}
        >
          {content}
        </Pressable>
      ) : (
        content
      )}

      {isLoaded && photo.isCover && coverLabel ? (
        <Text
          variant="caption/medium"
          color="inverse"
          style={styles.coverBadge}
        >
          {coverLabel}
        </Text>
      ) : null}

      {isLoaded && hasActionHandler ? (
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={onSettingsPress ?? onImagePress}
          accessibilityRole="button"
          accessibilityLabel={settingsAccessibilityLabel}
        >
          <Icon icon={DotsVerticalIcon} color="text.inverse" />
        </TouchableOpacity>
      ) : null}

      {isLoaded ? null : (
        <View style={[styles.overlay, placeholderStyle]}>
          {isErrorStatus ? null : (
            <ActivityIndicator color={theme.colors.text.inverse} />
          )}
          {isErrorStatus && errorText ? (
            // App: plain text with only a color (platform font), kept 1:1.
            <RNText style={styles.errorText}>{errorText}</RNText>
          ) : null}
        </View>
      )}
    </View>
  );
};
