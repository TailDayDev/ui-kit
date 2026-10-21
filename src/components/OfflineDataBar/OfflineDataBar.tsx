import { StyleSheet, View } from 'react-native';

import { WifiOffIcon } from '../../icons/WifiOffIcon';
import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { OfflineDataBarProps } from './OfflineDataBar.types';

/** App band height. */
const BAR_HEIGHT = 40;
/** App icon size. */
const ICON_SIZE = 16;
/** App label line height, tighter than `caption/regular` (14). */
const LABEL_LINE_HEIGHT = 12;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bar: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      flexDirection: 'row',
      gap: theme.space[2],
      height: BAR_HEIGHT,
      paddingHorizontal: theme.space[4],
      width: '100%',
    },
    label: {
      lineHeight: LABEL_LINE_HEIGHT,
    },
  });

/** Full-width band telling the user the list shows data without a network. */
export const OfflineDataBar = ({
  label,
  style,
  testID,
}: OfflineDataBarProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={[styles.bar, style]} testID={testID}>
      <WifiOffIcon color={theme.colors.icon.default} size={ICON_SIZE} />
      <Text variant="caption/regular" color="secondary" style={styles.label}>
        {label}
      </Text>
    </View>
  );
};
