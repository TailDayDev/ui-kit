"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetOwnerAvatar = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../EmptyProfileImage/index.js");
var _index3 = require("../PetAvatar/index.js");
var _jsxRuntime = require("react/jsx-runtime");
// App owner badge: 28pt circle (24pt xs photo + 2pt white ring), off-scale.
const OWNER_BADGE_SIZE = 28;
const createStyles = theme => _reactNative.StyleSheet.create({
  container: {
    position: 'relative'
  },
  ownerBadge: {
    alignItems: 'center',
    backgroundColor: theme.colors.bg.successSoft,
    borderColor: theme.colors.bg.surface,
    borderRadius: OWNER_BADGE_SIZE / 2,
    borderWidth: theme.stroke[2],
    bottom: -theme.space[0.5],
    height: OWNER_BADGE_SIZE,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'absolute',
    right: -theme.space[0.5],
    width: OWNER_BADGE_SIZE
  }
});

/** Pet photo with the owner's photo or initials overlapping its bottom-right corner. */
const PetOwnerAvatar = ({
  petPhotoUrl,
  petCacheKey,
  ownerFirstName,
  ownerLastName,
  ownerPhotoUrl,
  ownerCacheKey,
  petPlaceholder,
  renderPetImage,
  renderOwnerImage,
  size = 56,
  accessibilityLabel,
  testID
}) => {
  const styles = (0, _index.useThemedStyles)(createStyles);
  const isLabelled = Boolean(accessibilityLabel);
  const isFigmaSize = size === 64;
  const petSize = isFigmaSize ? 'lg' : 'l';
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: [styles.container, {
      height: _index3.PET_AVATAR_SIZES[petSize],
      width: _index3.PET_AVATAR_SIZES[petSize]
    }],
    testID: testID,
    accessible: isLabelled,
    accessibilityRole: isLabelled ? 'image' : undefined,
    accessibilityLabel: accessibilityLabel,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.PetAvatar, {
      photoUrl: petPhotoUrl,
      photoCacheKey: petCacheKey,
      size: petSize,
      shape: "square",
      radius: isFigmaSize ? 'md' : 'sm',
      placeholder: petPlaceholder,
      renderImage: renderPetImage,
      testID: testID ? `${testID}.pet` : undefined
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.ownerBadge,
      testID: testID ? `${testID}.ownerBadge` : undefined,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.EmptyProfileImage, {
        firstName: ownerFirstName ?? undefined,
        lastName: ownerLastName ?? undefined,
        imageUrl: ownerPhotoUrl?.trim() || null,
        photoCacheKey: ownerCacheKey,
        size: "xs",
        shape: "circle",
        initialsVariant: isFigmaSize ? 'body/regular' : undefined,
        renderImage: renderOwnerImage,
        testID: testID ? `${testID}.owner` : undefined
      })
    })]
  });
};
exports.PetOwnerAvatar = PetOwnerAvatar;
//# sourceMappingURL=PetOwnerAvatar.js.map