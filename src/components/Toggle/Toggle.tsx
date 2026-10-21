import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { CheckIcon } from '../../icons/CheckIcon';
import { Icon } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import type { ToggleProps } from './Toggle.types';

/** App `Toggle` track size. */
const TRACK_WIDTH = 56;
const TRACK_HEIGHT = 32;
/** App `Toggle` thumb diameter. */
const THUMB_SIZE = 24;
/** App `Toggle` check mark size inside the thumb. */
const CHECK_ICON_SIZE = 16;
/** App `Toggle` extra touch area around the track. */
const HIT_SLOP = 6;
/** App `Toggle` disabled opacity (differs from `theme.opacity.disabled`; kept 1:1). */
const DISABLED_OPACITY = 0.6;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    disabled: {
      opacity: DISABLED_OPACITY,
    },
    thumb: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface,
      borderRadius: theme.radius.full,
      flexShrink: 0,
      height: THUMB_SIZE,
      justifyContent: 'center',
      width: THUMB_SIZE,
    },
    track: {
      alignItems: 'flex-start',
      backgroundColor: theme.palette.darkGray,
      borderRadius: theme.radius.full,
      height: TRACK_HEIGHT,
      justifyContent: 'center',
      padding: theme.space[1],
      width: TRACK_WIDTH,
    },
    trackActive: {
      alignItems: 'flex-end',
      backgroundColor: theme.colors.bg.accent,
    },
  });

/**
 * On/off switch. Uses `TouchableOpacity` (default pressed opacity) to keep the
 * app's press feedback 1:1.
 */
export const Toggle = ({
  isActive,
  handlePress,
  disabled = false,
  testID,
  controlTestID,
  accessibilityLabel,
}: ToggleProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <TouchableOpacity
      onPress={event => {
        event?.stopPropagation?.();
        handlePress();
      }}
      style={[
        styles.track,
        isActive && styles.trackActive,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
      testID={controlTestID ?? testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="switch"
      accessibilityState={{ checked: isActive, disabled }}
      hitSlop={HIT_SLOP}
    >
      <View style={styles.thumb}>
        {isActive ? (
          <Icon icon={CheckIcon} size={CHECK_ICON_SIZE} color="accent" />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
