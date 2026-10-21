import { StyleSheet, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import { TodayTaskTime } from '../TodayTaskTime';
import { TodayTaskTypeBadge } from '../TodayTaskTypeBadge';
import type { TodayTaskHeaderProps } from './TodayTaskHeader.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    badge: {
      flexShrink: 1,
      minWidth: 0,
    },
    header: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
      paddingBottom: 0,
      paddingLeft: theme.space[0.25],
      paddingRight: theme.space[4],
      paddingTop: theme.space[2],
    },
  });

/** Today task card header: type badge left, time right (Figma `TodayTaskHeader`). */
export const TodayTaskHeader = ({
  badge,
  time,
  style,
  testID,
}: TodayTaskHeaderProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View testID={testID} style={[styles.header, style]}>
      <TodayTaskTypeBadge {...badge} style={[styles.badge, badge.style]} />
      {time ? <TodayTaskTime {...time} /> : null}
    </View>
  );
};
