import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
} from 'react-native';

import { ChevronDownSmallIcon } from '../../icons/ChevronDownSmallIcon';
import { CloseIcon } from '../../icons/CloseIcon';
import { RepeatEndCalendarIcon } from '../../icons/RepeatEndCalendarIcon';
import { ReverseIcon } from '../../icons/ReverseIcon';
import { TimelineClockOutlineIcon } from '../../icons/TimelineClockOutlineIcon';
import { Icon, Text, type IconComponent } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import type { ScheduleOverviewProps } from './ScheduleOverview.types';

/** App row height (Figma field row). */
const ROW_HEIGHT = 52;
/** App pressed row opacity (differs from `opacity.pressed`). */
const ROW_PRESSED_OPACITY = 0.8;
/** App trailing round button side and radius (off-scale). */
const TRAILING_BUTTON_SIZE = 28;
const TRAILING_BUTTON_RADIUS = 14;
/** App trailing icon size. */
const TRAILING_ICON_SIZE = 20;
const TRAILING_HIT_SLOP = 8;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { paddingHorizontal: theme.space[6] },
    label: { flexShrink: 1 },
    pressedRow: { opacity: ROW_PRESSED_OPACITY },
    row: {
      alignItems: 'center',
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.sm,
      borderWidth: theme.stroke[1],
      flexDirection: 'row',
      gap: theme.space[2],
      height: ROW_HEIGHT,
      paddingHorizontal: theme.space[3],
    },
    rows: { gap: theme.space[2] },
    rowText: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      gap: theme.space[2],
      justifyContent: 'space-between',
      minWidth: 0,
    },
    title: { marginBottom: theme.space[6] },
    trailingButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: TRAILING_BUTTON_RADIUS,
      height: TRAILING_BUTTON_SIZE,
      justifyContent: 'center',
      width: TRAILING_BUTTON_SIZE,
    },
    value: { flexShrink: 1 },
  });

type Styles = ReturnType<typeof createStyles>;

interface ScheduleFieldRowProps {
  icon: IconComponent;
  isSelected: boolean;
  label: string;
  onClear?: () => void;
  onPress: () => void;
  styles: Styles;
  testID: string;
  value: string;
}

const ScheduleFieldRow = ({
  icon,
  isSelected,
  label,
  onClear,
  onPress,
  styles,
  testID,
  value,
}: ScheduleFieldRowProps) => {
  const handleClear = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onClear?.();
  };
  const handleExpand = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onPress();
  };

  return (
    <Pressable
      accessibilityLabel={`${label}: ${value}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressedRow]}
      testID={testID}
    >
      <Icon icon={icon} />
      <View style={styles.rowText}>
        <Text numberOfLines={1} style={styles.label}>
          {label}
        </Text>
        <Text
          variant="body/medium"
          color={isSelected ? 'accent' : 'secondary'}
          align="right"
          numberOfLines={1}
          style={styles.value}
        >
          {value}
        </Text>
      </View>
      <Pressable
        accessibilityLabel={`${label}: ${value}`}
        accessibilityRole="button"
        hitSlop={TRAILING_HIT_SLOP}
        onPress={onClear ? handleClear : handleExpand}
        style={styles.trailingButton}
        testID={`${testID}.${onClear ? 'clear' : 'expand'}`}
      >
        <Icon
          icon={onClear ? CloseIcon : ChevronDownSmallIcon}
          size={TRAILING_ICON_SIZE}
        />
      </Pressable>
    </Pressable>
  );
};

/** Summary of a schedule: timing, repeat, start and end rows that open their pickers. */
export const ScheduleOverview = ({
  labels,
  endValue,
  isEndSelected,
  isRepeatSelected,
  isStartSelected,
  isTimingSelected,
  onClearEnd,
  onClearRepeat,
  onClearTiming,
  onEndPress,
  onRepeatPress,
  onStartPress,
  onTimingPress,
  repeatValue,
  showEnd,
  showRepeat,
  showStart,
  showTiming = true,
  startValue,
  testIDPrefix,
  timingValue,
}: ScheduleOverviewProps) => {
  const styles = useThemedStyles(createStyles);

  const rows: ReactNode[] = [
    showTiming ? (
      <ScheduleFieldRow
        key="timing"
        icon={TimelineClockOutlineIcon}
        isSelected={isTimingSelected}
        label={labels.timing}
        onClear={isTimingSelected ? onClearTiming : undefined}
        onPress={onTimingPress}
        styles={styles}
        testID={`${testIDPrefix}.timing`}
        value={timingValue}
      />
    ) : null,
    showRepeat ? (
      <ScheduleFieldRow
        key="repeat"
        icon={ReverseIcon}
        isSelected={isRepeatSelected}
        label={labels.repeat}
        onClear={isRepeatSelected ? onClearRepeat : undefined}
        onPress={onRepeatPress}
        styles={styles}
        testID={`${testIDPrefix}.repeat`}
        value={repeatValue}
      />
    ) : null,
    showStart ? (
      <ScheduleFieldRow
        key="start"
        icon={RepeatEndCalendarIcon}
        isSelected={isStartSelected}
        label={labels.start}
        onPress={onStartPress}
        styles={styles}
        testID={`${testIDPrefix}.start`}
        value={startValue}
      />
    ) : null,
    showEnd ? (
      <ScheduleFieldRow
        key="end"
        icon={RepeatEndCalendarIcon}
        isSelected={isEndSelected}
        label={labels.end}
        onClear={isEndSelected ? onClearEnd : undefined}
        onPress={onEndPress}
        styles={styles}
        testID={`${testIDPrefix}.end`}
        value={endValue}
      />
    ) : null,
  ];

  return (
    <View style={styles.container} testID="schedule.overview">
      <Text variant="largeTitle/semibold" style={styles.title}>
        {labels.title}
      </Text>
      <View style={styles.rows}>{rows}</View>
    </View>
  );
};
