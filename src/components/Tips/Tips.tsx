import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { TipsProps } from './Tips.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    tipsContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.successSoft,
      borderRadius: theme.radius.lg,
      flexDirection: 'row',
      gap: theme.space[3],
      paddingHorizontal: theme.space[4],
      paddingVertical: theme.space[3],
      width: '100%',
    },
    tipsText: {
      flex: 1,
      flexShrink: 1,
      flexWrap: 'wrap',
    },
  });

/** Green hint banner with a leading illustration. */
export const Tips = ({ icon, text }: TipsProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.tipsContainer}>
      {icon}
      <Text variant="caption/regular" style={styles.tipsText}>
        {text}
      </Text>
    </View>
  );
};
