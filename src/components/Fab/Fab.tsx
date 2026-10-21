import { StyleSheet } from 'react-native';

import { PlusIcon } from '../../icons/PlusIcon';
import { Icon, Pressable } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import type { FabProps } from './Fab.types';

/** Figma `Fab` frame: 56×56. */
const FAB_SIZE = 56;
/** Glyph size used by every app FAB (`PlusIcon size={28}`). */
const FAB_ICON_SIZE = 28;

/** Floating action button: 56pt green circle with a white glyph (Figma `Fab`). */
export const Fab = ({
  onPress,
  accessibilityLabel,
  disabled = false,
  icon = PlusIcon,
  style,
  testID,
}: FabProps) => {
  const styles = useThemedStyles(createStyles);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={[styles.fab, style]}
    >
      <Icon icon={icon} size={FAB_ICON_SIZE} color="text.inverse" />
    </Pressable>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    fab: {
      alignItems: 'center',
      backgroundColor: theme.palette.secondary,
      borderRadius: theme.radius.full,
      boxShadow: [...theme.shadows.fab],
      height: FAB_SIZE,
      justifyContent: 'center',
      width: FAB_SIZE,
    },
  });
