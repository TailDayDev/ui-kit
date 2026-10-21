import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { TodayTaskFooter } from '../TodayTaskFooter';
import { TodayTaskHeader } from '../TodayTaskHeader';
import type { TodayTaskCardProps } from './TodayTaskCard.types';

// Figma TodayTaskCard › Вуаль · выполнено: white fill at opacity 0.6.
const FINISHED_VEIL_OPACITY = 0.6;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      alignSelf: 'stretch',
      backgroundColor: theme.colors.bg.surface,
      borderRadius: theme.radius.lg,
      boxShadow: [...theme.shadows.block],
    },
    // Clips the header badge (square left corners) to the card radius.
    content: {
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
    },
    skipReason: {
      paddingBottom: theme.space[4],
      paddingHorizontal: theme.space[4],
      paddingTop: 0,
    },
    veil: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.bg.surface,
      borderRadius: theme.radius.lg,
      opacity: FINISHED_VEIL_OPACITY,
    },
  });

/** Today feed task card: header, pet, details, footer and finished veil (Figma `TodayTaskCard`). */
export const TodayTaskCard = ({
  hasHeader = true,
  header,
  hasPet = true,
  pet,
  hasDetails = true,
  details,
  footer,
  isFinished = false,
  hasSkipReason = false,
  skipReason,
  accessibilityLabel,
  style,
  testID,
}: TodayTaskCardProps) => {
  const styles = useThemedStyles(createStyles);
  const isSkipReasonVisible = hasSkipReason && Boolean(skipReason);
  const isVeilPressable = !footer.isMenuDisabled && !footer.isMenuLoading;

  return (
    <View testID={testID} style={[styles.card, style]}>
      <View accessibilityLabel={accessibilityLabel} style={styles.content}>
        {hasHeader && header ? <TodayTaskHeader {...header} /> : null}
        {hasPet && pet ? pet : null}
        {hasDetails && details ? details : null}
        <TodayTaskFooter {...footer} />
        {isFinished ? (
          // Figma: the veil covers the whole card, footer included; a tap
          // on a finished card opens the «⋮» sheet.
          <Pressable
            testID={testID ? `${testID}.veil` : undefined}
            accessibilityRole="button"
            accessibilityLabel={footer.menuAccessibilityLabel}
            accessibilityState={{ disabled: !isVeilPressable }}
            disabled={!isVeilPressable}
            onPress={footer.onMenuPress}
            style={styles.veil}
          />
        ) : null}
        {isSkipReasonVisible ? (
          // Above the veil: the reason stays readable on a finished card.
          <View style={styles.skipReason}>
            <Text variant="caption/regular" color="secondary">
              {skipReason}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
