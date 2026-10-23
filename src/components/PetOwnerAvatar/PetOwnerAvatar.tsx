import { StyleSheet, View } from 'react-native';

import { IconPawPrint } from '../../icons/figma';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { EmptyProfileImage } from '../EmptyProfileImage';
import { PET_AVATAR_SIZES, PetAvatar } from '../PetAvatar';
import type { PetOwnerAvatarProps } from './PetOwnerAvatar.types';

// App owner badge: 28pt circle (24pt xs photo + 2pt white ring), off-scale.
const OWNER_BADGE_SIZE = 28;
// Paw in the no-photo tile (Figma `NoImageIcon` artwork: ~10pt paw), off-scale.
const PAW_SIZE = 12;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    pawTile: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      flex: 1,
      justifyContent: 'center',
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
      width: OWNER_BADGE_SIZE,
    },
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
  size = 64,
  accessibilityLabel,
  testID,
}: PetOwnerAvatarProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const isLabelled = Boolean(accessibilityLabel);
  const isFigmaSize = size === 64;
  const petSize = isFigmaSize ? 'lg' : 'l';

  return (
    <View
      style={[
        styles.container,
        { height: PET_AVATAR_SIZES[petSize], width: PET_AVATAR_SIZES[petSize] },
      ]}
      testID={testID}
      accessible={isLabelled}
      accessibilityRole={isLabelled ? 'image' : undefined}
      accessibilityLabel={accessibilityLabel}
    >
      <PetAvatar
        photoUrl={petPhotoUrl}
        photoCacheKey={petCacheKey}
        size={petSize}
        shape="square"
        radius={isFigmaSize ? 'md' : 'sm'}
        placeholder={
          petPlaceholder ?? (
            <View
              style={styles.pawTile}
              testID={testID ? `${testID}.paw` : undefined}
            >
              <IconPawPrint size={PAW_SIZE} color={theme.palette.lightGray} />
            </View>
          )
        }
        renderImage={renderPetImage}
        testID={testID ? `${testID}.pet` : undefined}
      />
      <View
        style={styles.ownerBadge}
        testID={testID ? `${testID}.ownerBadge` : undefined}
      >
        <EmptyProfileImage
          firstName={ownerFirstName ?? undefined}
          lastName={ownerLastName ?? undefined}
          imageUrl={ownerPhotoUrl?.trim() || null}
          photoCacheKey={ownerCacheKey}
          size="xs"
          shape="circle"
          // Regular weight at the app size (Inter Regular 14), not bold.
          initialsVariant="body/regular"
          renderImage={renderOwnerImage}
          testID={testID ? `${testID}.owner` : undefined}
        />
      </View>
    </View>
  );
};
