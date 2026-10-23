import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { PullToRefreshErrorStateProps } from './PullToRefreshErrorState.types';

/** Figma `PullToRefreshErrorState` frame width. */
const MAX_WIDTH = 382;
/** App title metrics, tighter than `title/medium` (Figma export values). */
const TITLE_LINE_HEIGHT = 24;
const TITLE_LETTER_SPACING = -0.32;
/** App description metrics, tighter than `body/regular` (Figma export values). */
const DESCRIPTION_LINE_HEIGHT = 17;
const DESCRIPTION_LETTER_SPACING = -0.154;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      alignSelf: 'center',
      // Figma: 48 between the image and the texts, 40 on the sides.
      gap: theme.space[12],
      justifyContent: 'center',
      maxWidth: MAX_WIDTH,
      paddingHorizontal: theme.space[10],
      width: '100%',
    },
    texts: {
      alignItems: 'center',
      gap: theme.space[2],
      width: '100%',
    },
    title: {
      letterSpacing: TITLE_LETTER_SPACING,
      lineHeight: TITLE_LINE_HEIGHT,
      width: '100%',
    },
    description: {
      letterSpacing: DESCRIPTION_LETTER_SPACING,
      lineHeight: DESCRIPTION_LINE_HEIGHT,
      width: '100%',
    },
  });

/** Load-error message shown inside a pull-to-refresh list. Figma: `PullToRefreshErrorState`. */
export const PullToRefreshErrorState = ({
  title,
  description,
  illustration,
  style,
  testID,
}: PullToRefreshErrorStateProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {illustration}
      <View style={styles.texts}>
        <Text
          variant="title/medium"
          color="primary"
          align="center"
          style={styles.title}
        >
          {title}
        </Text>
        <Text
          variant="body/regular"
          color="secondary"
          align="center"
          style={styles.description}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};
