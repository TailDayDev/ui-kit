import { StyleSheet } from 'react-native';

import { IconCalendarDays } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { TaskSheetRowProps } from './TaskSheetRow.types';

// Figma TaskSheetRow › Icon: 20×20 instance of the 24pt icon set.
const TASK_SHEET_ROW_ICON_SIZE = 20;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    label: {
      flexShrink: 1,
    },
    row: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.palette.lightGray,
      borderRadius: theme.radius.sm,
      borderWidth: theme.stroke[1],
      flexDirection: 'row',
      justifyContent: 'space-between',
      // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
      paddingHorizontal: theme.space[6] - theme.stroke[1],
      paddingVertical: theme.space[4] - theme.stroke[1],
    },
  });

/**
 * Action row of the task sheet (Figma `TaskSheetRow`): label on the left,
 * icon on the right; the destructive variant paints only the icon red.
 */
export const TaskSheetRow = ({
  label,
  icon = IconCalendarDays,
  isDestructive = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  testID,
}: TaskSheetRowProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled}
      onPress={onPress}
      style={[styles.row, style]}
    >
      <Text variant="headline/medium" style={styles.label}>
        {label}
      </Text>
      <Icon
        icon={icon}
        size={TASK_SHEET_ROW_ICON_SIZE}
        color={isDestructive ? 'text.error' : 'default'}
      />
    </Pressable>
  );
};
