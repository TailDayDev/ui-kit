import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { InfoCardProps } from './InfoCard.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      gap: theme.space[4],
      flex: 1,
    },
    rightContainer: {
      flex: 1,
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: theme.space[1],
    },
  });

/** Row with a leading illustration, a bold title and an optional caption. */
export const InfoCard = ({ icon, title, description }: InfoCardProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.card}>
      {icon}
      <View style={styles.rightContainer}>
        <Text variant="body/bold" color="primary">
          {title}
        </Text>
        {description ? (
          <Text variant="caption/regular" color="secondary">
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
