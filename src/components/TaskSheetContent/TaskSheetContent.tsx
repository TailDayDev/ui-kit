import { StyleSheet, View } from 'react-native';

import { IconTrash2 } from '../../icons/figma';
import { useThemedStyles, type Theme } from '../../theme';
import { TaskSheetRow } from '../TaskSheetRow';
import type {
  TaskSheetContentProps,
  TaskSheetContentRow,
} from './TaskSheetContent.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    actions: {
      alignSelf: 'stretch',
      gap: theme.space[2],
    },
    container: {
      // Figma: 382pt rows centered in the 430pt sheet → 24pt on each side.
      paddingBottom: theme.space[5],
      paddingHorizontal: theme.space[6],
    },
    destructive: {
      alignSelf: 'stretch',
      gap: theme.space[2],
      paddingTop: theme.space[13],
    },
  });

const renderRow = ({
  key,
  label,
  icon,
  onPress,
  isDestructive = false,
  disabled,
  testID,
}: TaskSheetContentRow) => (
  <TaskSheetRow
    key={key}
    label={label}
    icon={icon ?? (isDestructive ? IconTrash2 : undefined)}
    isDestructive={isDestructive}
    onPress={onPress}
    disabled={disabled}
    testID={testID}
  />
);

/**
 * Body of the task sheet (Figma `TaskSheetContent`): `TaskSheetRow`s 8pt apart
 * and, when a row is destructive, a "Delete" row 52pt below them.
 */
export const TaskSheetContent = ({
  rows,
  style,
  testID,
}: TaskSheetContentProps) => {
  const styles = useThemedStyles(createStyles);
  const actionRows = rows.filter(row => !row.isDestructive);
  const destructiveRows = rows.filter(row => row.isDestructive);

  return (
    <View testID={testID} style={[styles.container, style]}>
      {actionRows.length > 0 ? (
        <View style={styles.actions}>{actionRows.map(renderRow)}</View>
      ) : null}
      {destructiveRows.length > 0 ? (
        <View
          testID={testID ? `${testID}.destructive` : undefined}
          style={styles.destructive}
        >
          {destructiveRows.map(renderRow)}
        </View>
      ) : null}
    </View>
  );
};
