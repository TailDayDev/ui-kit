import { StyleSheet } from 'react-native';

import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { OptionRowProps } from './OptionRow.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    label: {
      flex: 1,
    },
    row: {
      alignItems: 'center',
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.sm,
      borderWidth: theme.stroke[1],
      flexDirection: 'row',
      gap: theme.space[2],
      paddingHorizontal: theme.space[4],
      paddingVertical: theme.space[3],
    },
    rowSelected: {
      backgroundColor: theme.colors.bg.accentSoft,
      borderColor: theme.colors.bg.accent,
    },
  });

/**
 * Single-choice text row (Figma `OptionRow`). The row is the radio: put several
 * in a list and keep the selection in the parent.
 */
export const OptionRow = ({
  label,
  isSelected = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  testID,
}: OptionRowProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      testID={testID}
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ checked: isSelected }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.row, isSelected ? styles.rowSelected : null, style]}
    >
      <Text
        variant="body/medium"
        color={isSelected ? 'accent' : 'primary'}
        style={styles.label}
      >
        {label}
      </Text>
    </Pressable>
  );
};
