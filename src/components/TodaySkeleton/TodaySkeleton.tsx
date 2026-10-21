import { StyleSheet, View } from 'react-native';

import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { BaseSkeleton } from '../BaseSkeleton';
import type { TodaySkeletonProps } from './TodaySkeleton.types';

// Figma TodaySkeleton: three "Карточка · заглушка" frames.
const CARD_COUNT = 3;
// Figma TodaySkeleton › Заголовок раздела · заглушка: frame height 44.
const SECTION_HEADER_HEIGHT = 44;
// Figma TodaySkeleton › Заглушка заголовка: 120×20.
const SECTION_TITLE_WIDTH = 120;
const SECTION_TITLE_HEIGHT = 20;
// Figma TodaySkeleton › Плашка: 140×32.
const BADGE_WIDTH = 140;
const BADGE_HEIGHT = 32;
// Figma TodaySkeleton › Круг: 40×40.
const AVATAR_SIZE = 40;
// Figma TodaySkeleton › Полоса (name): 140×16.
const NAME_BAR_WIDTH = 140;
const NAME_BAR_HEIGHT = 16;
// Figma TodaySkeleton › Полоса (breed): 90×12.
const BREED_BAR_WIDTH = 90;
const BREED_BAR_HEIGHT = 12;
// Figma TodaySkeleton › Полоса деталей: 256×16.
const DETAILS_BAR_WIDTH = 256;
const DETAILS_BAR_HEIGHT = 16;
// Figma TodaySkeleton › Полоса действия / Квадрат: height 48, square 48×48.
const FOOTER_CONTROL_SIZE = 48;

const CARD_KEYS = Array.from({ length: CARD_COUNT }, (_, index) => index);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    avatarRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[3],
      paddingHorizontal: theme.space[4],
      paddingTop: theme.space[4],
    },
    card: {
      backgroundColor: theme.colors.bg.surface,
      borderRadius: theme.radius.lg,
      boxShadow: [...theme.shadows.block],
      paddingTop: theme.space[2],
    },
    container: {
      gap: theme.space[4],
      paddingHorizontal: theme.space[4],
    },
    details: {
      flexDirection: 'row',
      paddingHorizontal: theme.space[4],
    },
    footer: {
      flexDirection: 'row',
      gap: theme.space[3],
      paddingBottom: theme.space[4],
      paddingHorizontal: theme.space[4],
      paddingTop: theme.space[2],
    },
    footerAction: {
      flex: 1,
    },
    nameColumn: {
      gap: theme.space[1],
    },
    sectionHeader: {
      height: SECTION_HEADER_HEIGHT,
      paddingTop: theme.space[4],
    },
  });

/** One "Карточка · заглушка": badge, avatar + two bars, details bar, footer. */
const SkeletonCard = ({
  styles,
  theme,
}: {
  styles: ReturnType<typeof createStyles>;
  theme: Theme;
}) => (
  <View style={styles.card}>
    <BaseSkeleton
      borderRadius={theme.radius.sm}
      height={BADGE_HEIGHT}
      width={BADGE_WIDTH}
    />
    <View style={styles.avatarRow}>
      <BaseSkeleton
        borderRadius={theme.radius.full}
        height={AVATAR_SIZE}
        width={AVATAR_SIZE}
      />
      <View style={styles.nameColumn}>
        <BaseSkeleton
          borderRadius={theme.radius.sm}
          height={NAME_BAR_HEIGHT}
          width={NAME_BAR_WIDTH}
        />
        <BaseSkeleton
          borderRadius={theme.radius.sm}
          height={BREED_BAR_HEIGHT}
          width={BREED_BAR_WIDTH}
        />
      </View>
    </View>
    <View style={styles.details}>
      <BaseSkeleton
        borderRadius={theme.radius.sm}
        height={DETAILS_BAR_HEIGHT}
        width={DETAILS_BAR_WIDTH}
      />
    </View>
    <View style={styles.footer}>
      <BaseSkeleton
        borderRadius={theme.radius.sm}
        height={FOOTER_CONTROL_SIZE}
        style={styles.footerAction}
      />
      <BaseSkeleton
        borderRadius={theme.radius.sm}
        height={FOOTER_CONTROL_SIZE}
        width={FOOTER_CONTROL_SIZE}
      />
    </View>
  </View>
);

/**
 * Loading placeholder of the Today feed (Figma `TodaySkeleton`): a section
 * title bar and three task-card placeholders built from kit `BaseSkeleton`
 * blocks (with its running shimmer).
 */
export const TodaySkeleton = ({
  accessibilityLabel,
  style,
  testID,
}: TodaySkeletonProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const isAnnounced = Boolean(accessibilityLabel);

  return (
    <View
      accessible={isAnnounced}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={isAnnounced ? 'progressbar' : undefined}
      accessibilityState={isAnnounced ? { busy: true } : undefined}
      style={[styles.container, style]}
      testID={testID}
    >
      <View style={styles.sectionHeader}>
        <BaseSkeleton
          borderRadius={theme.radius.sm}
          height={SECTION_TITLE_HEIGHT}
          width={SECTION_TITLE_WIDTH}
        />
      </View>
      {CARD_KEYS.map(key => (
        <SkeletonCard key={key} styles={styles} theme={theme} />
      ))}
    </View>
  );
};
