import { Pressable, StyleSheet, View } from 'react-native';

import { IconChevronRight } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { IconRoundButton } from '../IconButton';
import type { TodayMultiPetSummaryProps } from './TodayMultiPetSummary.types';

// Figma TodayMultiPetSummary › Фото питомца: 64×64 circle.
const PHOTO_SIZE = 64;
// Figma TodayMultiPetSummary › Заглушка: 32×32 no-photo artwork.
const NO_PHOTO_IMAGE_SIZE = 32;
// Figma TodayMultiPetSummary › Кнопка · подробнее: IconRoundButton size=28.
const DETAILS_BUTTON_SIZE = 28;
// Figma IconRoundButton size=28: 20pt glyph inside 4pt padding.
const DETAILS_ICON_SIZE = 20;
// off-scale: pressed feedback of the details control, same as the app icon buttons.
const DETAILS_PRESSED_OPACITY = 0.9;
const IDLE_OPACITY = 1;

const createStyles = (theme: Theme) => {
  // Figma draws the 4pt white ring OUTSIDE the 64pt circle; RN borders are
  // inside, so the ring frame is 72pt and pulled back by 4pt on every side.
  const ring = theme.stroke[4];
  return StyleSheet.create({
    block: {
      alignItems: 'center',
      borderRadius: theme.radius.lg,
      gap: theme.space[2],
      paddingBottom: theme.space[2],
      paddingLeft: theme.space[4],
      paddingRight: theme.space[4],
      paddingTop: theme.space[4],
    },
    details: {
      alignItems: 'center',
      borderRadius: theme.radius.sm,
      flexDirection: 'row',
      gap: theme.space[2],
      justifyContent: 'center',
      paddingBottom: theme.space[1],
      paddingLeft: theme.space[3],
      paddingRight: theme.space[1],
      paddingTop: theme.space[1],
    },
    extra: {
      backgroundColor: theme.palette.secondary,
    },
    noPhoto: {
      backgroundColor: theme.colors.bg.subtle,
    },
    noPhotoImage: {
      alignItems: 'center',
      height: NO_PHOTO_IMAGE_SIZE,
      justifyContent: 'center',
      width: NO_PHOTO_IMAGE_SIZE,
    },
    overlap: {
      marginLeft: theme.space.neg2 - ring,
    },
    photo: {
      alignItems: 'center',
      borderColor: theme.colors.bg.surface,
      borderRadius: theme.radius.full,
      borderWidth: ring,
      height: PHOTO_SIZE + ring * 2,
      justifyContent: 'center',
      margin: -ring,
      overflow: 'hidden',
      width: PHOTO_SIZE + ring * 2,
    },
    photoContent: {
      alignItems: 'center',
      height: PHOTO_SIZE,
      justifyContent: 'center',
      overflow: 'hidden',
      width: PHOTO_SIZE,
    },
    stack: {
      alignItems: 'center',
      flexDirection: 'row',
      height: PHOTO_SIZE,
    },
  });
};

/** Stack of pet photos with a "show details" control (Figma `TodayMultiPetSummary`). */
export const TodayMultiPetSummary = ({
  pets,
  extraCount,
  noPhotoImage,
  detailsLabel,
  onDetailsPress,
  detailsTestID,
  style,
  testID,
}: TodayMultiPetSummaryProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View testID={testID} style={[styles.block, style]}>
      <View style={styles.stack}>
        {pets.map((pet, index) => (
          <View
            key={pet.id}
            testID={testID ? `${testID}.pet.${pet.id}` : undefined}
            accessible={Boolean(pet.accessibilityLabel)}
            accessibilityRole={pet.accessibilityLabel ? 'image' : undefined}
            accessibilityLabel={pet.accessibilityLabel}
            style={[
              styles.photo,
              index > 0 ? styles.overlap : null,
              pet.photo ? null : styles.noPhoto,
            ]}
          >
            <View style={styles.photoContent}>
              {pet.photo ?? (
                <View style={styles.noPhotoImage}>{noPhotoImage}</View>
              )}
            </View>
          </View>
        ))}
        {extraCount ? (
          <View
            testID={testID ? `${testID}.extra` : undefined}
            style={[
              styles.photo,
              pets.length > 0 ? styles.overlap : null,
              styles.extra,
            ]}
          >
            <Text variant="headline/medium" color="inverse" align="center">
              {extraCount}
            </Text>
          </View>
        ) : null}
      </View>
      <Pressable
        testID={detailsTestID}
        onPress={onDetailsPress}
        disabled={!onDetailsPress}
        accessibilityRole="button"
        accessibilityLabel={detailsLabel}
        accessibilityState={{ disabled: !onDetailsPress }}
        style={({ pressed }) => [
          styles.details,
          { opacity: pressed ? DETAILS_PRESSED_OPACITY : IDLE_OPACITY },
        ]}
      >
        <Text variant="body/regular">{detailsLabel}</Text>
        {/* Visual only: the whole row is the button, so the round button is
            hidden from touches and screen readers to avoid a nested control. */}
        <View
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <IconRoundButton
            size={DETAILS_BUTTON_SIZE}
            accessibilityLabel={detailsLabel}
            icon={<Icon icon={IconChevronRight} size={DETAILS_ICON_SIZE} />}
          />
        </View>
      </Pressable>
    </View>
  );
};
