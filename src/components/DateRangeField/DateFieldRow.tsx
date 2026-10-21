import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { CalendarExpiresIcon } from '../../icons/CalendarExpiresIcon';
import { CalendarOutlineIcon } from '../../icons/CalendarOutlineIcon';
import { ChevronDownSmallIcon } from '../../icons/ChevronDownSmallIcon';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { ActionListRow } from '../ActionListRow';
import type { DateRangeFieldRowConfig } from './DateRangeField.types';

/** Icon and chevron container sizes from the app `DateFieldRow`. */
const LEADING_ICON_SIZE = 20;
const TRAILING_ICON_SIZE = 16;
const TRAILING_CONTAINER_SIZE = 28;

interface DateFieldRowProps extends DateRangeFieldRowConfig {
  boundary: 'start' | 'end';
  dateValue: string | null;
  isDisabled: boolean;
  isReadOnly: boolean;
  onPress: () => void;
}

export const DateFieldRow = memo(function DateFieldRow({
  affordanceTestID,
  accessibilityLabel,
  boundary,
  dateValue,
  displayValue,
  emptyValue = '',
  formatValue,
  isDisabled,
  isReadOnly,
  label,
  onPress,
  testID,
}: DateFieldRowProps) {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const isInteractive = !isDisabled && !isReadOnly;
  const iconColor = theme.colors.icon.default;
  const resolvedDisplayValue =
    displayValue !== undefined
      ? (displayValue ?? emptyValue)
      : formatValue
        ? formatValue(dateValue)
        : (dateValue ?? emptyValue);
  const leading =
    boundary === 'start' ? (
      <CalendarOutlineIcon color={iconColor} size={LEADING_ICON_SIZE} />
    ) : (
      <CalendarExpiresIcon color={iconColor} size={LEADING_ICON_SIZE} />
    );
  const trailing = !isReadOnly ? (
    <View
      pointerEvents="none"
      style={styles.trailing}
      testID={affordanceTestID}
    >
      <ChevronDownSmallIcon color={iconColor} size={TRAILING_ICON_SIZE} />
    </View>
  ) : undefined;

  return (
    <ActionListRow
      accessibilityLabel={accessibilityLabel ?? label}
      isDisabled={isDisabled}
      leading={leading}
      onPress={isInteractive ? onPress : undefined}
      rightText={resolvedDisplayValue}
      testID={testID}
      title={label}
      trailing={trailing}
      variant="card-settings"
    />
  );
});

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    trailing: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: TRAILING_CONTAINER_SIZE / 2,
      height: TRAILING_CONTAINER_SIZE,
      justifyContent: 'center',
      width: TRAILING_CONTAINER_SIZE,
    },
  });
