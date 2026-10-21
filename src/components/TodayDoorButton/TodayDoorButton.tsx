import { Pressable, StyleSheet } from 'react-native';

import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { TodayDoorButtonProps } from './TodayDoorButton.types';

const IDLE_OPACITY = 1;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: theme.radius.sm,
      flexDirection: 'row',
      height: theme.space[12],
      justifyContent: 'center',
      paddingHorizontal: theme.space[8],
      paddingVertical: theme.space[4],
    },
  });

/**
 * Footer action of a Today card that works with a booking: check in, check
 * out, move (Figma `TodayDoorButton`). Soft-gray 48pt bar, radius 8,
 * centered `headline/medium` label.
 */
export const TodayDoorButton = ({
  label,
  onPress,
  isDisabled = false,
  accessibilityLabel,
  style,
  testID,
}: TodayDoorButtonProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: isDisabled
            ? theme.opacity.disabled
            : pressed
              ? theme.opacity.pressed
              : IDLE_OPACITY,
        },
        style,
      ]}
    >
      <Text variant="headline/medium" align="center" numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
};
