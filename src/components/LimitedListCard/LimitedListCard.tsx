import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { Card } from '../Card';
import type { LimitedListCardProps } from './LimitedListCard.types';

/** App default number of visible items. */
const DEFAULT_MAX_VISIBLE = 3;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    containerList: {
      gap: theme.space[1],
    },
    items: {
      gap: theme.space[2],
    },
    moreText: {
      marginTop: theme.space[1],
    },
  });

/** Shadowed card listing the first `maxVisible` items and a "+N more" line. */
export const LimitedListCard = ({
  title,
  items,
  maxVisible = DEFAULT_MAX_VISIBLE,
  onPress,
  formatMoreLabel,
  testID,
}: LimitedListCardProps) => {
  const styles = useThemedStyles(createStyles);
  const visibleItems = items.slice(0, maxVisible);
  const remainingCount = items.length - visibleItems.length;

  return (
    <Card
      title={title}
      withShadow
      onPress={onPress}
      accessibilityLabel={title}
      testID={testID}
    >
      <View style={styles.containerList}>
        <View style={styles.items}>
          {visibleItems.map((item, index) => (
            // Items are plain strings that may repeat; position is the stable key.
            <Text key={index} variant="body/regular" color="primary">
              {item}
            </Text>
          ))}
        </View>
        {remainingCount > 0 ? (
          <Text
            variant="caption/regular"
            color="secondary"
            style={styles.moreText}
          >
            {formatMoreLabel(remainingCount)}
          </Text>
        ) : null}
      </View>
    </Card>
  );
};
