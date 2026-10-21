import { StyleSheet } from 'react-native';

import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { Radio } from '../Radio';
import type { PickerNoneRowProps } from './PickerNoneRow.types';

// Figma TodayManualPetPickerContent › Без питомца / TodayManualStaffPickerContent › Без сотрудника: fixed height 88.
const NONE_ROW_HEIGHT = 88;
// Figma › Radio: size=20 (inner dot 10).
const RADIO_SIZE = 20;
const RADIO_DOT_SIZE = 10;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    label: {
      flex: 1,
    },
    row: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.lg,
      borderWidth: theme.stroke[1],
      flexDirection: 'row',
      gap: theme.space[3],
      height: NONE_ROW_HEIGHT,
      // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
      paddingHorizontal: theme.space[4] - theme.stroke[1],
    },
    rowSelected: {
      backgroundColor: theme.colors.bg.accentSoft,
      borderColor: theme.colors.bg.accent,
    },
  });

/**
 * "Nothing selected" option of a picker list (Figma frames `Без питомца` and
 * `Без сотрудника`): label and a radio; the whole row is the radio.
 */
export const PickerNoneRow = ({
  label,
  isSelected,
  onPress,
  testID,
}: PickerNoneRowProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      testID={testID}
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ checked: isSelected }}
      onPress={onPress}
      style={[styles.row, isSelected ? styles.rowSelected : null]}
    >
      <Text variant="headline/medium" style={styles.label}>
        {label}
      </Text>
      <Radio
        isActive={isSelected}
        size={RADIO_SIZE}
        dotSize={RADIO_DOT_SIZE}
        testID={testID ? `${testID}.radio` : undefined}
      />
    </Pressable>
  );
};
