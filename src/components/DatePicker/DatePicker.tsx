import { StyleSheet, Text, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import { WheelPicker } from '../WheelPicker';
import type { DatePickerProps } from './DatePicker.types';

/** Optional title and description above a date wheel. */
export const DatePicker = ({
  value,
  onChange,
  monthLabels,
  locale,
  label,
  autoInitialize = true,
  description,
  minDateIso,
  maxDateIso,
  testID,
}: DatePickerProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      {!!label && (
        <Text accessibilityRole="header" style={styles.title}>
          {label}
        </Text>
      )}
      {!!description && <Text style={styles.description}>{description}</Text>}
      <View style={styles.pickerWrapper}>
        <WheelPicker
          mode="date"
          value={value}
          onChange={onChange}
          monthLabels={monthLabels}
          locale={locale}
          minDateIso={minDateIso}
          maxDateIso={maxDateIso}
          autoInitialize={autoInitialize}
          itemTextStyle={styles.pickerStyle}
          testID={testID}
        />
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    description: {
      ...theme.typography.body.regular,
      color: theme.colors.text.secondary,
    },
    pickerStyle: {
      ...theme.typography.headline.bold,
      color: theme.colors.text.primary,
    },
    // flexGrow (not flex: 1) keeps a content-based basis, so the wheel keeps
    // its height inside auto-height modals and still fills full-screen hosts.
    container: {
      flexGrow: 1,
      gap: theme.space[6],
    },
    pickerWrapper: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    title: {
      ...theme.typography.largeTitle.semibold,
      color: theme.colors.text.primary,
    },
  });
