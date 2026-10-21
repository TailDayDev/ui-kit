import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import { PetAvatar } from './PetAvatar';
import { PET_AVATAR_SIZES } from './PetAvatar.types';
import type { OverlappingPetAvatarsProps } from './OverlappingPetAvatars.types';

// App defaults (OverlappingPetAvatars.tsx).
const DEFAULT_MAX_VISIBLE = 3;
const DEFAULT_OVERLAP = 8;
const DEFAULT_BORDER_WIDTH = 2;

const getAvatarsRowWidth = (
  count: number,
  overlap: number,
  size: number,
): number => (count <= 1 ? size : size + (count - 1) * (size - overlap));

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    border: {
      ...StyleSheet.absoluteFillObject,
      borderColor: theme.colors.bg.surface,
    },
    avatarFrame: {
      alignItems: 'center',
      borderColor: theme.colors.bg.surface,
      justifyContent: 'center',
      overflow: 'hidden',
    },
    remainingBadge: {
      alignItems: 'center',
      backgroundColor: theme.palette.secondary,
      borderColor: theme.colors.bg.surface,
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
    },
  });

/** Overlapping row of circular pet avatars with an optional "+N" badge. */
export const OverlappingPetAvatars = ({
  borderWidth = DEFAULT_BORDER_WIDTH,
  maxVisible = DEFAULT_MAX_VISIBLE,
  overlap = DEFAULT_OVERLAP,
  pets,
  showRemainingBadge = false,
  size = 'xs',
  placeholder,
  renderImage,
  testID,
}: OverlappingPetAvatarsProps) => {
  const styles = useThemedStyles(createStyles);
  const visiblePets = pets.slice(0, maxVisible);
  const remainingCount = Math.max(pets.length - visiblePets.length, 0);
  const isBadgeShown = showRemainingBadge && remainingCount > 0;
  const dimension = PET_AVATAR_SIZES[size];
  const avatarRadius = dimension / 2;
  const avatarCount = visiblePets.length + (isBadgeShown ? 1 : 0);
  const rowWidth = getAvatarsRowWidth(
    Math.max(avatarCount, 1),
    overlap,
    dimension,
  );

  return (
    <View
      style={[styles.row, { height: dimension, width: rowWidth }]}
      testID={testID}
    >
      {visiblePets.map((pet, index) => (
        <View
          key={`${pet.id ?? pet.name ?? 'pet'}-${index}`}
          style={[
            styles.avatarFrame,
            {
              borderRadius: avatarRadius,
              height: dimension,
              marginLeft: index === 0 ? 0 : -overlap,
              width: dimension,
              zIndex: index + 1,
            },
          ]}
        >
          <PetAvatar
            photoUrl={pet.photoUrl}
            size={size}
            shape="circle"
            placeholder={placeholder}
            renderImage={renderImage}
            testID={testID ? `${testID}.avatar.${index}` : undefined}
          />
          <View
            pointerEvents="none"
            style={[styles.border, { borderRadius: avatarRadius, borderWidth }]}
          />
        </View>
      ))}

      {isBadgeShown ? (
        <View
          style={[
            styles.remainingBadge,
            {
              borderRadius: avatarRadius,
              borderWidth,
              height: dimension,
              marginLeft: visiblePets.length ? -overlap : 0,
              width: dimension,
              zIndex: visiblePets.length + 1,
            },
          ]}
        >
          <Text variant="caption/medium" color="inverse">
            {`+${remainingCount}`}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
