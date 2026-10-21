import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { EmptyListProps } from './EmptyList.types';

/** App top offset of the placeholder (off-scale). */
const TOP_OFFSET = 150;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: TOP_OFFSET,
      gap: theme.space[4],
    },
  });

/** "No results" placeholder for lists: an image above a grey message. */
export const EmptyList = ({
  message,
  illustration,
  style,
  textStyle,
  testID,
}: EmptyListProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {illustration}
      <Text variant="headline/medium" color="secondary" style={textStyle}>
        {message}
      </Text>
    </View>
  );
};
