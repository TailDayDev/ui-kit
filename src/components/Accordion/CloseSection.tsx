import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { CloseSectionProps } from './Accordion.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[2],
      justifyContent: 'space-between',
      minWidth: 0,
      overflow: 'hidden',
    },
    label: {
      flexShrink: 0,
    },
    value: {
      flex: 1,
      flexShrink: 1,
      minWidth: 0,
    },
  });

/** Closed-accordion summary row: label left, value (or placeholder) right. */
export const CloseSection = ({
  label,
  value,
  emptyLabel,
}: CloseSectionProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text
        variant="headline/regular"
        style={styles.label}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
      <Text
        variant="headline/bold"
        color={value ? 'primary' : 'secondary'}
        align="right"
        style={styles.value}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {value || emptyLabel}
      </Text>
    </View>
  );
};
