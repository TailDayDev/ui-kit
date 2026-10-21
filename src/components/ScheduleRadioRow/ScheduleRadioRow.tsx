import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import { Radio } from '../Radio';
import type { ScheduleRadioRowProps } from './ScheduleRadioRow.types';

/** App `ScheduleRadioRow` slot around the 24pt radio (gives the 34pt Figma row its height). */
const RADIO_SLOT_SIZE = 32;
/** App `ScheduleRadioRow` pressed opacity. */
const PRESSED_OPACITY = 0.8;
/** App `ScheduleRadioRow` disabled opacity (differs from `theme.opacity.disabled`; kept 1:1). */
const DISABLED_OPACITY = 0.5;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    description: {
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    disabled: {
      opacity: DISABLED_OPACITY,
    },
    radioSlot: {
      alignItems: 'center',
      height: RADIO_SLOT_SIZE,
      justifyContent: 'center',
      width: RADIO_SLOT_SIZE,
    },
    textColumn: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      flexShrink: 1,
    },
    wrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[2],
    },
  });

/** Radio option row: radio indicator, title and description. The row owns the radio role. */
export const ScheduleRadioRow = ({
  testID,
  title,
  description,
  descriptionColor,
  selected,
  disabled = false,
  onPress,
}: ScheduleRadioRowProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={title}
      style={[styles.wrapper, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={PRESSED_OPACITY}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, selected, disabled }}
    >
      <View style={styles.radioSlot}>
        <Radio isActive={selected} />
      </View>
      <View style={styles.textColumn}>
        <Text variant="headline/medium" color="primary" style={styles.title}>
          {title}
        </Text>
        <Text
          variant="caption/regular"
          color="secondary"
          style={[
            styles.description,
            descriptionColor ? { color: descriptionColor } : null,
          ]}
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
