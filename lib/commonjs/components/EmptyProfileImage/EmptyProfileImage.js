"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyProfileImage = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _EmptyProfileImageTypes = require("./EmptyProfileImage.types.js");
var _jsxRuntime = require("react/jsx-runtime");
// App initials letter spacing (off-scale: Figma text styles use 0).
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
  const dimension = _EmptyProfileImageTypes.PROFILE_IMAGE_SIZES[size];
  const borderRadius = shape === 'circle' ? dimension / 2 : theme.radius.sm;
  return _reactNative.StyleSheet.create({
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
    placeholder: {
      alignItems: 'center',
      backgroundColor: backgroundColor ?? theme.colors.bg.successSoft,
      borderRadius,
      height: dimension,
      justifyContent: 'center',
      width: dimension
    },
    loadingOverlay: {
      ..._reactNative.StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingScrim: {
      ..._reactNative.StyleSheet.absoluteFillObject,
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
  imageUrl,
  photoCacheKey,
  imageRefreshKey,
  imageCache,
  loading = false,
  renderImage,
  accessibilityLabel,
  testID
}) => {
  const theme = (0, _index2.useTheme)();
  const [hasImageError, setHasImageError] = (0, _react.useState)(false);
  const dimension = _EmptyProfileImageTypes.PROFILE_IMAGE_SIZES[size];
  const styles = (0, _react.useMemo)(() => createStyles(theme, size, shape, backgroundColor, initialsColor), [backgroundColor, initialsColor, shape, size, theme]);
  const initials = (0, _react.useMemo)(() => getInitials(firstName, lastName), [firstName, lastName]);
  (0, _react.useEffect)(() => {
    setHasImageError(false);
  }, [imageUrl, imageRefreshKey]);
  const renderPhoto = () => {
    if (/*#__PURE__*/(0, _react.isValidElement)(imageUrl)) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
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
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
      source: source,
      style: styles.image,
      resizeMode: "cover",
      onError: onLoadError,
      testID: testID ? `${testID}.photo` : undefined
    }, imageRefreshKey);
  };
  const isLabelled = Boolean(accessibilityLabel);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.container,
    testID: testID,
    accessible: isLabelled,
    accessibilityRole: isLabelled ? 'image' : undefined,
    accessibilityLabel: accessibilityLabel,
    accessibilityState: loading ? {
      busy: true
    } : undefined,
    children: [hasImage(imageUrl) && !hasImageError ? renderPhoto() : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.placeholder,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "body/bold",
        align: "center",
        style: styles.initials,
        children: initials
      })
    }), loading ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      pointerEvents: "none",
      style: styles.loadingOverlay,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.loadingScrim
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
        size: "small",
        color: theme.colors.text.inverse,
        testID: testID ? `${testID}.loading` : undefined
      })]
    }) : null]
  });
};

/** Profile photo with an initials fallback on a soft green tile. */
const EmptyProfileImage = exports.EmptyProfileImage = /*#__PURE__*/(0, _react.memo)(EmptyProfileImageComponent);
//# sourceMappingURL=EmptyProfileImage.js.map