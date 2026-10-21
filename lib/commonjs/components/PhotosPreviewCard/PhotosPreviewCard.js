"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotosPreviewCard = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _index3 = require("../Card/index.js");
var _jsxRuntime = require("react/jsx-runtime");
/** App photo sizes. */
const MAIN_PHOTO_SIZE = 144;
const SIDE_PHOTO_SIZE = 120;
/** App fan rotation of the side photos. */
const SIDE_PHOTO_ROTATION = '5deg';
/** App compact two-photo layout: overlap and width of the second photo (off-scale). */
const COMPACT_SECOND_OVERLAP = -41;
const COMPACT_SECOND_WIDTH = 130;
/**
 * App main photo shadow (rgba(0,0,0,.25), 0/8, radius 16, elevation 8).
 * No Figma effect exists for it, so the current look is kept.
 */
const MAIN_PHOTO_SHADOW_ALPHA_HEX = '40'; // 0x40 / 0xFF = 25%
const MAIN_PHOTO_SHADOW = {
  elevation: 8,
  shadowOffset: {
    width: 0,
    height: 8
  },
  shadowOpacity: 1,
  shadowRadius: 16
};
const createStyles = theme => _reactNative.StyleSheet.create({
  additionalText: {
    color: theme.colors.text.secondary
  },
  images: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.space[3],
    position: 'relative',
    width: '100%'
  },
  leftImage: {
    borderRadius: theme.radius.sm,
    height: SIDE_PHOTO_SIZE,
    left: theme.space[3],
    overflow: 'hidden',
    position: 'absolute',
    top: theme.space[3],
    transform: [{
      rotate: `-${SIDE_PHOTO_ROTATION}`
    }],
    width: SIDE_PHOTO_SIZE
  },
  mainImageView: {
    ...MAIN_PHOTO_SHADOW,
    shadowColor: `${theme.palette.black}${MAIN_PHOTO_SHADOW_ALPHA_HEX}`,
    borderRadius: theme.radius.sm,
    height: MAIN_PHOTO_SIZE,
    overflow: 'hidden',
    width: MAIN_PHOTO_SIZE,
    zIndex: 1
  },
  rightImage: {
    borderRadius: theme.radius.sm,
    height: SIDE_PHOTO_SIZE,
    overflow: 'hidden',
    position: 'absolute',
    right: theme.space[3],
    top: theme.space[3],
    transform: [{
      rotate: SIDE_PHOTO_ROTATION
    }],
    width: SIDE_PHOTO_SIZE
  },
  secondPhotos: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  secondRightImage: {
    marginLeft: COMPACT_SECOND_OVERLAP,
    position: 'relative',
    right: 'auto',
    top: 'auto',
    width: COMPACT_SECOND_WIDTH
  },
  textPlaceholder: {
    color: theme.palette.lightGray
  }
});
const renderDefaultImage = ({
  uri,
  size
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Image, {
  source: {
    uri
  },
  style: {
    width: size,
    height: size
  },
  resizeMode: "cover"
});

/** Card with a fanned stack of up to three photos, or an empty text. */
const PhotosPreviewCard = ({
  title,
  photos = [],
  onPress,
  withShadow = true,
  photoCountText,
  emptyText,
  useCompactTwoPhotoLayout = false,
  renderImage = renderDefaultImage,
  accessibilityLabel
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const normalizedPhotos = (0, _react.useMemo)(() => photos.filter(photo => typeof photo?.fileUrl === 'string' && photo.fileUrl.length > 0).map(photo => ({
    fileUrl: photo.fileUrl,
    isCover: Boolean(photo.isCover)
  })), [photos]);
  const hasExplicitCover = normalizedPhotos.some(photo => photo.isCover);
  const mainPhotoUrl = hasExplicitCover ? normalizedPhotos.find(photo => photo.isCover)?.fileUrl ?? '' : normalizedPhotos[0]?.fileUrl ?? '';
  const sidePhotos = hasExplicitCover ? normalizedPhotos.filter(photo => !photo.isCover) : normalizedPhotos.slice(1);
  const leftPhotoUrl = sidePhotos[1]?.fileUrl;
  const rightPhotoUrl = sidePhotos[0]?.fileUrl;
  const isTwoPhotos = normalizedPhotos.length === 2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.Card, {
    withShadow: withShadow,
    onPress: onPress,
    title: title,
    accessibilityLabel: accessibilityLabel ?? title,
    additional: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "headline/regular",
      style: styles.additionalText,
      children: photoCountText
    }),
    children: normalizedPhotos.length ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.images, isTwoPhotos && styles.secondPhotos],
      children: [leftPhotoUrl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.leftImage,
        children: renderImage({
          uri: leftPhotoUrl,
          size: SIDE_PHOTO_SIZE
        })
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.mainImageView,
        children: renderImage({
          uri: mainPhotoUrl,
          size: MAIN_PHOTO_SIZE
        })
      }), rightPhotoUrl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: [styles.rightImage, useCompactTwoPhotoLayout && isTwoPhotos && styles.secondRightImage],
        children: renderImage({
          uri: rightPhotoUrl,
          size: SIDE_PHOTO_SIZE
        })
      }) : null]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
      variant: "body/regular",
      style: styles.textPlaceholder,
      children: emptyText
    })
  });
};
exports.PhotosPreviewCard = PhotosPreviewCard;
//# sourceMappingURL=PhotosPreviewCard.js.map