import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { InfoRowProps } from './InfoRow.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    childrenContainer: {
      alignItems: 'center',
      flexShrink: 0,
      justifyContent: 'center',
    },
    shrinkable: {
      flexShrink: 1,
    },
    infoContainer: {
      alignItems: 'flex-start',
      flex: 1,
      flexDirection: 'column',
      gap: theme.space[1],
      paddingRight: theme.space[4],
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxWidth: '100%',
      paddingVertical: theme.space[2],
      width: '100%',
    },
  });

/** Settings row: title and caption on the left, a control on the right. */
export const InfoRow = ({ children, title, description }: InfoRowProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.row}>
      <View style={styles.infoContainer}>
        <Text variant="headline/regular" style={styles.shrinkable}>
          {title}
        </Text>
        {description ? (
          <Text
            variant="caption/regular"
            color="secondary"
            style={styles.shrinkable}
          >
            {description}
          </Text>
        ) : null}
      </View>
      <View style={styles.childrenContainer}>{children}</View>
    </View>
  );
};
