import { StyleSheet, View } from 'react-native';

import { DEFAULT_ICON_SIZE } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import { LockIcon } from '../../icons/LockIcon';
import { Card } from '../Card';
import type { CardLockedProps } from './CardLocked.types';

/** Padlock size in the app `CardLocked` (off-scale: smaller than the 24pt icon frame). */
const LOCK_ICON_SIZE = 20;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.border.default,
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[3],
      justifyContent: 'space-between',
      width: '100%',
    },
    iconBlock: {
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'center',
      minWidth: DEFAULT_ICON_SIZE,
    },
    textBlock: {
      flex: 1,
      gap: theme.space[3],
    },
  });

/** Read-only card for a value that cannot be edited, with a padlock on the right. */
export const CardLocked = ({ title, value, testID }: CardLockedProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <Card
      cardStyles={styles.card}
      style={styles.card}
      pointerEvents="none"
      testID={testID}
    >
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text
            variant="headline/bold"
            color="secondary"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text variant="body/regular" color="secondary">
            {value}
          </Text>
        </View>
        <View style={styles.iconBlock}>
          <LockIcon color={theme.palette.lightGray} size={LOCK_ICON_SIZE} />
        </View>
      </View>
    </Card>
  );
};
