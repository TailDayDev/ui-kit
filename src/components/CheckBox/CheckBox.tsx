import { StyleSheet, TouchableOpacity } from 'react-native';

import { CheckIcon } from '../../icons/CheckIcon';
import { Icon } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import type { CheckBoxProps } from './CheckBox.types';

/** App `CheckBox` box size (off-scale: not a Figma size token). */
const BOX_SIZE = 16;
/** App `CheckBox` corner radius (off-scale: below `radius.sm`). */
const BOX_RADIUS = 4;
/** App `CheckBox` check mark size. */
const CHECK_ICON_SIZE = 12;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    box: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.colors.border.default,
      borderRadius: BOX_RADIUS,
      borderWidth: theme.stroke[1],
      height: BOX_SIZE,
      justifyContent: 'center',
      width: BOX_SIZE,
    },
    boxActive: {
      backgroundColor: theme.colors.bg.accent,
      borderWidth: 0,
    },
    boxDisabled: {
      opacity: theme.opacity.disabled,
    },
  });

/**
 * Checkbox control. Uses `TouchableOpacity` (default pressed opacity) to keep
 * the app's press feedback 1:1.
 */
export const CheckBox = ({
  isActive,
  handlePress,
  disabled = false,
  accessibilityLabel,
  testID,
}: CheckBoxProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.box,
        isActive && styles.boxActive,
        disabled && styles.boxDisabled,
      ]}
      testID={testID}
      accessibilityRole="checkbox"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: isActive, disabled }}
    >
      {isActive ? (
        <Icon icon={CheckIcon} size={CHECK_ICON_SIZE} color="text.inverse" />
      ) : null}
    </TouchableOpacity>
  );
};
