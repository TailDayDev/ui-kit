import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { ConfirmationModalContentProps } from './ConfirmationModalContent.types';

// Figma ConfirmationModalContent › Картинка: 100×100 (off-scale).
const ILLUSTRATION_SIZE = 100;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: theme.space[8],
      paddingBottom: theme.space[6],
      paddingHorizontal: theme.space[6],
    },
    illustration: {
      alignItems: 'center',
      borderRadius: theme.radius.sm,
      height: ILLUSTRATION_SIZE,
      justifyContent: 'center',
      overflow: 'hidden',
      width: ILLUSTRATION_SIZE,
    },
    texts: {
      alignItems: 'center',
      alignSelf: 'stretch',
      gap: theme.space[2],
    },
    text: {
      alignSelf: 'stretch',
    },
  });

/**
 * Body of a confirmation sheet (Figma `ConfirmationModalContent`): a 100pt
 * picture, the question and an optional explanation, all centered.
 */
export const ConfirmationModalContent = ({
  title,
  description,
  hasDescription = true,
  illustration,
  style,
  testID,
}: ConfirmationModalContentProps) => {
  const styles = useThemedStyles(createStyles);
  const isDescriptionVisible = hasDescription && Boolean(description);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {illustration ? (
        <View style={styles.illustration}>{illustration}</View>
      ) : null}
      <View style={styles.texts}>
        <Text
          accessibilityRole="header"
          align="center"
          style={styles.text}
          variant="title/bold"
        >
          {title}
        </Text>
        {isDescriptionVisible ? (
          <Text
            align="center"
            color="secondary"
            style={styles.text}
            variant="caption/regular"
          >
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
