"use strict";

import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { EmptyProfileImage } from "../EmptyProfileImage/index.js";
import { PET_AVATAR_SIZES, PetAvatar } from "../PetAvatar/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// App owner badge: 28pt circle (24pt xs photo + 2pt white ring), off-scale.
const OWNER_BADGE_SIZE = 28;
const createStyles = theme => StyleSheet.create({
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
export const PetOwnerAvatar = ({
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
  const styles = useThemedStyles(createStyles);
  const isLabelled = Boolean(accessibilityLabel);
  const isFigmaSize = size === 64;
  const petSize = isFigmaSize ? 'lg' : 'l';
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, {
      height: PET_AVATAR_SIZES[petSize],
      width: PET_AVATAR_SIZES[petSize]
    }],
    testID: testID,
    accessible: isLabelled,
    accessibilityRole: isLabelled ? 'image' : undefined,
    accessibilityLabel: accessibilityLabel,
    children: [/*#__PURE__*/_jsx(PetAvatar, {
      photoUrl: petPhotoUrl,
      photoCacheKey: petCacheKey,
      size: petSize,
      shape: "square",
      radius: isFigmaSize ? 'md' : 'sm',
      placeholder: petPlaceholder,
      renderImage: renderPetImage,
      testID: testID ? `${testID}.pet` : undefined
    }), /*#__PURE__*/_jsx(View, {
      style: styles.ownerBadge,
      testID: testID ? `${testID}.ownerBadge` : undefined,
      children: /*#__PURE__*/_jsx(EmptyProfileImage, {
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
//# sourceMappingURL=PetOwnerAvatar.js.map