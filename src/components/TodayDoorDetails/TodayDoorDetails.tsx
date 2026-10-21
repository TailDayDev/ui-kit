import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { TextColorRole } from '../../tokens';
import type { TodayDoorDetailsProps } from './TodayDoorDetails.types';

// Figma TodayDoorDetails › Картинка места: 40×40 image.
const ICON_SIZE = 40;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    block: {
      gap: theme.space[3],
      justifyContent: 'center',
      padding: theme.space[4],
    },
    body: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[3],
    },
    dates: {
      alignItems: 'flex-end',
      gap: theme.space[1],
      justifyContent: 'center',
    },
    divider: {
      alignSelf: 'stretch',
      backgroundColor: theme.colors.border.default,
      height: theme.stroke[1],
    },
    icon: {
      alignItems: 'center',
      height: ICON_SIZE,
      justifyContent: 'center',
      width: ICON_SIZE,
    },
    placement: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      gap: theme.space[3],
      minWidth: 0,
    },
    title: {
      flex: 1,
    },
  });

interface DateLine {
  key: 'checkIn' | 'checkOut';
  value?: string;
  color: TextColorRole;
}

/** Placement and booking dates under a divider (Figma `TodayDoorDetails`). */
export const TodayDoorDetails = ({
  actionType = 'CheckIn',
  isDaycare = false,
  title,
  checkInDate,
  checkOutDate,
  icon,
  style,
  testID,
  titleTestID,
}: TodayDoorDetailsProps) => {
  const styles = useThemedStyles(createStyles);
  const isCheckIn = actionType === 'CheckIn';
  const checkIn: DateLine = {
    key: 'checkIn',
    value: checkInDate,
    color: isCheckIn ? 'primary' : 'secondary',
  };
  const checkOut: DateLine = {
    key: 'checkOut',
    value: checkOutDate,
    color: isCheckIn ? 'secondary' : 'primary',
  };
  const dates = (
    isDaycare
      ? [isCheckIn ? { ...checkIn, color: 'primary' as const } : checkOut]
      : [checkIn, checkOut]
  ).filter(line => Boolean(line.value));

  return (
    <View testID={testID} style={[styles.block, style]}>
      <View style={styles.divider} />
      <View style={styles.body}>
        <View style={styles.placement}>
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <Text
            testID={titleTestID}
            variant="body/bold"
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </Text>
        </View>
        {dates.length > 0 ? (
          <View style={styles.dates}>
            {dates.map(line => (
              <Text
                key={line.key}
                testID={testID ? `${testID}.${line.key}` : undefined}
                variant="body/regular"
                color={line.color}
                align="right"
              >
                {line.value}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
};
