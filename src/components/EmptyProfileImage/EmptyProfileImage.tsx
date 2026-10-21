import { isValidElement, memo, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
  type ColorValue,
  type TextStyle,
} from 'react-native';

import { Text } from '../../primitives';
import { useTheme, type Theme } from '../../theme';
import {
  PROFILE_IMAGE_SIZES,
  type EmptyProfileImageProps,
  type ProfileImageShape,
  type ProfileImageSize,
} from './EmptyProfileImage.types';

// App initials letter spacing (off-scale: Figma text styles use 0).
const INITIALS_LETTER_SPACING = -0.154;
// App loading scrim: black at 45% over the photo.
const LOADING_SCRIM_OPACITY = 0.45;

const getInitials = (firstName = '', lastName = ''): string =>
  firstName.trim().charAt(0).toUpperCase() +
  lastName.trim().charAt(0).toUpperCase();

const getInitialsSize = (
  theme: Theme,
  size: ProfileImageSize,
): Pick<TextStyle, 'fontSize' | 'lineHeight'> => {
  const style = {
    xs: theme.typography.smallCaption.regular,
    s: theme.typography.caption.bold,
    m: theme.typography.body.bold,
    l: theme.typography.headline.bold,
    xl: theme.typography.largeTitle.semibold,
  }[size];
  return { fontSize: style.fontSize, lineHeight: style.lineHeight };
};

const createStyles = (
  theme: Theme,
  size: ProfileImageSize,
  shape: ProfileImageShape,
  backgroundColor?: ColorValue,
  initialsColor?: ColorValue,
) => {
  const dimension = PROFILE_IMAGE_SIZES[size];
  const borderRadius = shape === 'circle' ? dimension / 2 : theme.radius.sm;
  return StyleSheet.create({
    container: {
      borderRadius,
      height: dimension,
      overflow: 'hidden',
      width: dimension,
    },
    image: {
      height: dimension,
      width: dimension,
    },
    initials: {
      ...getInitialsSize(theme, size),
      letterSpacing: INITIALS_LETTER_SPACING,
      color: initialsColor ?? theme.colors.text.success,
    },
    placeholder: {
      alignItems: 'center',
      backgroundColor: backgroundColor ?? theme.colors.bg.successSoft,
      borderRadius,
      height: dimension,
      justifyContent: 'center',
      width: dimension,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingScrim: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.palette.black,
      opacity: LOADING_SCRIM_OPACITY,
    },
  });
};

const hasImage = (imageUrl: EmptyProfileImageProps['imageUrl']): boolean =>
  typeof imageUrl === 'string' ? imageUrl.trim().length > 0 : Boolean(imageUrl);

const EmptyProfileImageComponent = ({
  firstName,
  lastName,
  size = 'l',
  shape = 'square',
  backgroundColor,
  initialsColor,
  imageUrl,
  photoCacheKey,
  imageRefreshKey,
  imageCache,
  loading = false,
  renderImage,
  accessibilityLabel,
  testID,
}: EmptyProfileImageProps) => {
  const theme = useTheme();
  const [hasImageError, setHasImageError] = useState(false);
  const dimension = PROFILE_IMAGE_SIZES[size];
  const styles = useMemo(
    () => createStyles(theme, size, shape, backgroundColor, initialsColor),
    [backgroundColor, initialsColor, shape, size, theme],
  );
  const initials = useMemo(
    () => getInitials(firstName, lastName),
    [firstName, lastName],
  );

  useEffect(() => {
    setHasImageError(false);
  }, [imageUrl, imageRefreshKey]);

  const renderPhoto = () => {
    if (isValidElement(imageUrl)) {
      return <View style={styles.image}>{imageUrl}</View>;
    }
    if (typeof imageUrl !== 'string' && typeof imageUrl !== 'number') {
      return null;
    }
    const onLoadError = () => setHasImageError(true);
    const source =
      typeof imageUrl === 'number'
        ? imageUrl
        : { uri: imageUrl.trim(), cache: imageCache };
    return renderImage ? (
      renderImage({
        imageUrl: typeof imageUrl === 'number' ? imageUrl : imageUrl.trim(),
        size: dimension,
        photoCacheKey,
        refreshKey: imageRefreshKey,
        cache: imageCache,
        onLoadError,
      })
    ) : (
      <Image
        key={imageRefreshKey}
        source={source}
        style={styles.image}
        resizeMode="cover"
        onError={onLoadError}
        testID={testID ? `${testID}.photo` : undefined}
      />
    );
  };

  const isLabelled = Boolean(accessibilityLabel);

  return (
    <View
      style={styles.container}
      testID={testID}
      accessible={isLabelled}
      accessibilityRole={isLabelled ? 'image' : undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={loading ? { busy: true } : undefined}
    >
      {hasImage(imageUrl) && !hasImageError ? (
        renderPhoto()
      ) : (
        <View style={styles.placeholder}>
          <Text variant="body/bold" align="center" style={styles.initials}>
            {initials}
          </Text>
        </View>
      )}
      {loading ? (
        <View pointerEvents="none" style={styles.loadingOverlay}>
          <View style={styles.loadingScrim} />
          <ActivityIndicator
            size="small"
            color={theme.colors.text.inverse}
            testID={testID ? `${testID}.loading` : undefined}
          />
        </View>
      ) : null}
    </View>
  );
};

/** Profile photo with an initials fallback on a soft green tile. */
export const EmptyProfileImage = memo(EmptyProfileImageComponent);
