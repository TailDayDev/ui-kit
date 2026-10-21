import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { TodayTaskDetailsProps } from './TodayTaskDetails.types';

// Figma TodayTaskDetails › Иконка: 24×24 artwork.
const ICON_SIZE = 24;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    block: {
      gap: theme.space[3],
      justifyContent: 'center',
      padding: theme.space[4],
    },
    divider: {
      alignSelf: 'stretch',
      backgroundColor: theme.colors.border.default,
      height: theme.stroke[1],
    },
    header: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      gap: theme.space[3],
    },
    icon: {
      alignItems: 'center',
      height: ICON_SIZE,
      justifyContent: 'center',
      width: ICON_SIZE,
    },
    task: {
      gap: theme.space[1],
    },
    title: {
      flex: 1,
    },
  });

/** Task details under a divider: icon, title, amount and note (Figma `TodayTaskDetails`). */
export const TodayTaskDetails = ({
  title,
  hasIcon = true,
  icon,
  hasTrailing = true,
  trailing,
  hasNote = true,
  note,
  style,
  testID,
  titleTestID,
}: TodayTaskDetailsProps) => {
  const styles = useThemedStyles(createStyles);
  const isIconVisible = hasIcon && Boolean(icon);
  const isTrailingVisible = hasTrailing && Boolean(trailing);
  const isNoteVisible = hasNote && Boolean(note);

  return (
    <View testID={testID} style={[styles.block, style]}>
      <View style={styles.divider} />
      <View style={styles.task}>
        <View style={styles.header}>
          {isIconVisible ? <View style={styles.icon}>{icon}</View> : null}
          <Text testID={titleTestID} variant="body/bold" style={styles.title}>
            {title}
          </Text>
          {isTrailingVisible ? (
            <Text variant="body/regular">{trailing}</Text>
          ) : null}
        </View>
        {isNoteVisible ? (
          <Text variant="caption/regular" color="secondary">
            {note}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
