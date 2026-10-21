import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { areNormalizedIdsEqual } from './areNormalizedIdsEqual';
import type { TagProps } from './Tag.types';

/** React Native `TouchableOpacity` default, which the app `Tag` relies on. */
const TAG_ACTIVE_OPACITY = 0.2;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    codeItem: {
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.sm,
      borderWidth: theme.stroke[1],
      maxWidth: 'auto',
      paddingHorizontal: theme.space[4],
      paddingVertical: theme.space[3],
    },
    selectedItem: {
      backgroundColor: theme.colors.bg.accentSoft,
      // No `border.accent` role yet.
      borderColor: theme.palette.primary,
    },
  });

/** Selectable chip (single tag of a multi-select group). */
export const Tag = ({ item, selectedItems, handlePress, testID }: TagProps) => {
  const styles = useThemedStyles(createStyles);
  const id = item.id ?? '';
  const isSelected = selectedItems.some(selectedId =>
    areNormalizedIdsEqual(selectedId, id),
  );

  return (
    <TouchableOpacity
      activeOpacity={TAG_ACTIVE_OPACITY}
      style={[styles.codeItem, isSelected && styles.selectedItem]}
      onPress={() => handlePress(id)}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <Text variant="body/medium" color={isSelected ? 'accent' : 'primary'}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};
