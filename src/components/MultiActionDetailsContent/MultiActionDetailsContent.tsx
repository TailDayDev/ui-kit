import { ScrollView, StyleSheet, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import { TodayTaskCard } from '../TodayTaskCard';
import { TodayTaskHeader } from '../TodayTaskHeader';
import type { MultiActionDetailsContentProps } from './MultiActionDetailsContent.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    body: {
      backgroundColor: theme.colors.bg.screen,
      flex: 1,
      paddingTop: theme.space[2],
    },
    // Header stays put while the cards scroll (app MultiActionDetails).
    header: {
      paddingHorizontal: theme.space[4],
    },
    list: {
      flex: 1,
    },
    // Figma body: gap 16 between all children, padding 8/16/24/16.
    listContent: {
      gap: theme.space[4],
      paddingBottom: theme.space[6],
      paddingHorizontal: theme.space[4],
      paddingTop: theme.space[4],
    },
  });

/** Details modal body: shared task header and one card per pet (Figma `MultiActionDetailsContent`). */
export const MultiActionDetailsContent = ({
  header,
  items,
  nestedOverlay,
  style,
  testID,
  listTestID,
}: MultiActionDetailsContentProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View testID={testID} style={[styles.body, style]}>
      <View style={styles.header}>
        <TodayTaskHeader {...header} />
      </View>
      <ScrollView
        testID={listTestID}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      >
        {items.map(({ id, ...card }) => (
          <TodayTaskCard key={id} {...card} hasHeader={false} />
        ))}
      </ScrollView>
      {nestedOverlay}
    </View>
  );
};
