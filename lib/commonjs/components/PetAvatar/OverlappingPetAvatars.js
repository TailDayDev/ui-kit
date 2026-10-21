"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlappingPetAvatars = void 0;
var _reactNative = require("react-native");
var _index = require("../../primitives/index.js");
var _index2 = require("../../theme/index.js");
var _PetAvatar = require("./PetAvatar.js");
var _PetAvatarTypes = require("./PetAvatar.types.js");
var _jsxRuntime = require("react/jsx-runtime");
// App defaults (OverlappingPetAvatars.tsx).
const DEFAULT_MAX_VISIBLE = 3;
const DEFAULT_OVERLAP = 8;
const DEFAULT_BORDER_WIDTH = 2;
const getAvatarsRowWidth = (count, overlap, size) => count <= 1 ? size : size + (count - 1) * (size - overlap);
const createStyles = theme => _reactNative.StyleSheet.create({
  border: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    borderColor: theme.colors.bg.surface
  },
  avatarFrame: {
    alignItems: 'center',
    borderColor: theme.colors.bg.surface,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  remainingBadge: {
    alignItems: 'center',
    backgroundColor: theme.palette.secondary,
    borderColor: theme.colors.bg.surface,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  }
});

/** Overlapping row of circular pet avatars with an optional "+N" badge. */
const OverlappingPetAvatars = ({
  borderWidth = DEFAULT_BORDER_WIDTH,
  maxVisible = DEFAULT_MAX_VISIBLE,
  overlap = DEFAULT_OVERLAP,
  pets,
  showRemainingBadge = false,
  size = 'xs',
  placeholder,
  renderImage,
  testID
}) => {
  const styles = (0, _index2.useThemedStyles)(createStyles);
  const visiblePets = pets.slice(0, maxVisible);
  const remainingCount = Math.max(pets.length - visiblePets.length, 0);
  const isBadgeShown = showRemainingBadge && remainingCount > 0;
  const dimension = _PetAvatarTypes.PET_AVATAR_SIZES[size];
  const avatarRadius = dimension / 2;
  const avatarCount = visiblePets.length + (isBadgeShown ? 1 : 0);
  const rowWidth = getAvatarsRowWidth(Math.max(avatarCount, 1), overlap, dimension);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.row, {
      height: dimension,
      width: rowWidth
    }],
    testID: testID,
    children: [visiblePets.map((pet, index) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.avatarFrame, {
        borderRadius: avatarRadius,
        height: dimension,
        marginLeft: index === 0 ? 0 : -overlap,
        width: dimension,
        zIndex: index + 1
      }],
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PetAvatar.PetAvatar, {
        photoUrl: pet.photoUrl,
        size: size,
        shape: "circle",
        placeholder: placeholder,
        renderImage: renderImage,
        testID: testID ? `${testID}.avatar.${index}` : undefined
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        pointerEvents: "none",
        style: [styles.border, {
          borderRadius: avatarRadius,
          borderWidth
        }]
      })]
    }, `${pet.id ?? pet.name ?? 'pet'}-${index}`)), isBadgeShown ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: [styles.remainingBadge, {
        borderRadius: avatarRadius,
        borderWidth,
        height: dimension,
        marginLeft: visiblePets.length ? -overlap : 0,
        width: dimension,
        zIndex: visiblePets.length + 1
      }],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Text, {
        variant: "caption/medium",
        color: "inverse",
        children: `+${remainingCount}`
      })
    }) : null]
  });
};
exports.OverlappingPetAvatars = OverlappingPetAvatars;
//# sourceMappingURL=OverlappingPetAvatars.js.map