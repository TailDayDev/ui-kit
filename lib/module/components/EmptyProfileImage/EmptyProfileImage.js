"use strict";

import { isValidElement, memo, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/index.js";
import { useTheme } from "../../theme/index.js";
import { PROFILE_IMAGE_SIZES } from "./EmptyProfileImage.types.js";

// App initials letter spacing (off-scale: Figma text styles use 0).
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const INITIALS_LETTER_SPACING = -0.154;
// App loading scrim: black at 45% over the photo.
const LOADING_SCRIM_OPACITY = 0.45;
const getInitials = (firstName = '', lastName = '') => firstName.trim().charAt(0).toUpperCase() + lastName.trim().charAt(0).toUpperCase();
const getInitialsSize = (theme, size) => {
  const style = {
    xs: theme.typography.smallCaption.regular,
    s: theme.typography.caption.bold,
    m: theme.typography.body.bold,
    l: theme.typography.headline.bold,
    xl: theme.typography.largeTitle.semibold
  }[size];
  return {
    fontSize: style.fontSize,
    lineHeight: style.lineHeight
  };
};
const createStyles = (theme, size, shape, backgroundColor, initialsColor) => {
  const dimension = PROFILE_IMAGE_SIZES[size];
  const borderRadius = shape === 'circle' ? dimension / 2 : theme.radius.sm;
  return StyleSheet.create({
    container: {
      borderRadius,
      height: dimension,
      overflow: 'hidden',
      width: dimension
    },
    image: {
      height: dimension,
      width: dimension
    },
    initials: {
      ...getInitialsSize(theme, size),
      letterSpacing: INITIALS_LETTER_SPACING,
      color: initialsColor ?? theme.colors.text.success
    },
    initialsColor: {
      color: initialsColor ?? theme.colors.text.success
    },
    placeholder: {
      alignItems: 'center',
      backgroundColor: backgroundColor ?? theme.colors.bg.successSoft,
      borderRadius,
      height: dimension,
      justifyContent: 'center',
      width: dimension
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingScrim: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.palette.black,
      opacity: LOADING_SCRIM_OPACITY
    }
  });
};
const hasImage = imageUrl => typeof imageUrl === 'string' ? imageUrl.trim().length > 0 : Boolean(imageUrl);
const EmptyProfileImageComponent = ({
  firstName,
  lastName,
  size = 'l',
  shape = 'square',
  backgroundColor,
  initialsColor,
  initialsVariant,
  imageUrl,
  photoCacheKey,
  imageRefreshKey,
  imageCache,
  loading = false,
  renderImage,
  accessibilityLabel,
  testID
}) => {
  const theme = useTheme();
  const [hasImageError, setHasImageError] = useState(false);
  const dimension = PROFILE_IMAGE_SIZES[size];
  const styles = useMemo(() => createStyles(theme, size, shape, backgroundColor, initialsColor), [backgroundColor, initialsColor, shape, size, theme]);
  const initials = useMemo(() => getInitials(firstName, lastName), [firstName, lastName]);
  useEffect(() => {
    setHasImageError(false);
  }, [imageUrl, imageRefreshKey]);
  const renderPhoto = () => {
    if (/*#__PURE__*/isValidElement(imageUrl)) {
      return /*#__PURE__*/_jsx(View, {
        style: styles.image,
        children: imageUrl
      });
    }
    if (typeof imageUrl !== 'string' && typeof imageUrl !== 'number') {
      return null;
    }
    const onLoadError = () => setHasImageError(true);
    const source = typeof imageUrl === 'number' ? imageUrl : {
      uri: imageUrl.trim(),
      cache: imageCache
    };
    return renderImage ? renderImage({
      imageUrl: typeof imageUrl === 'number' ? imageUrl : imageUrl.trim(),
      size: dimension,
      photoCacheKey,
      refreshKey: imageRefreshKey,
      cache: imageCache,
      onLoadError
    }) : /*#__PURE__*/_jsx(Image, {
      source: source,
      style: styles.image,
      resizeMode: "cover",
      onError: onLoadError,
      testID: testID ? `${testID}.photo` : undefined
    }, imageRefreshKey);
  };
  const isLabelled = Boolean(accessibilityLabel);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.container,
    testID: testID,
    accessible: isLabelled,
    accessibilityRole: isLabelled ? 'image' : undefined,
    accessibilityLabel: accessibilityLabel,
    accessibilityState: loading ? {
      busy: true
    } : undefined,
    children: [hasImage(imageUrl) && !hasImageError ? renderPhoto() : /*#__PURE__*/_jsx(View, {
      style: styles.placeholder,
      children: /*#__PURE__*/_jsx(Text, {
        variant: initialsVariant ?? 'body/bold',
        align: "center",
        style: initialsVariant ? styles.initialsColor : styles.initials,
        children: initials
      })
    }), loading ? /*#__PURE__*/_jsxs(View, {
      pointerEvents: "none",
      style: styles.loadingOverlay,
      children: [/*#__PURE__*/_jsx(View, {
        style: styles.loadingScrim
      }), /*#__PURE__*/_jsx(ActivityIndicator, {
        size: "small",
        color: theme.colors.text.inverse,
        testID: testID ? `${testID}.loading` : undefined
      })]
    }) : null]
  });
};

/** Profile photo with an initials fallback on a soft green tile. */
export const EmptyProfileImage = /*#__PURE__*/memo(EmptyProfileImageComponent);
//# sourceMappingURL=EmptyProfileImage.js.map