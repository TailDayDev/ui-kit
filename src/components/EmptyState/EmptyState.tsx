import { StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { Button } from '../Button';
import type { EmptyStateProps } from './EmptyState.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: theme.space[8],
      justifyContent: 'center',
      paddingHorizontal: theme.space[6],
      paddingVertical: theme.space[8],
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      alignItems: 'center',
      gap: theme.space[2],
    },
  });

/** Centered empty / error state with an optional action. Figma pattern: `TodayScreenState`. */
export const EmptyState = ({
  title,
  description,
  actionTitle,
  illustration,
  messageStyle,
  onAction,
  style,
  textContainerStyle,
  titleStyle,
  descriptionStyle,
  actionButtonStyle,
  actionTextStyle,
  testID,
  actionTestID,
  isActionVisible = true,
}: EmptyStateProps) => {
  const styles = useThemedStyles(createStyles);
  const shouldShowAction = isActionVisible && onAction !== undefined;

  const illustrationElement = (
    <View style={styles.iconContainer}>{illustration}</View>
  );
  const textElement = (
    <View style={[styles.textContainer, textContainerStyle]}>
      <Text
        variant="title/bold"
        color="primary"
        align="center"
        style={titleStyle}
      >
        {title}
      </Text>
      {description ? (
        <Text
          variant="body/regular"
          color="secondary"
          align="center"
          style={descriptionStyle}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );

  return (
    <View style={[styles.container, style]} testID={testID}>
      {messageStyle ? (
        <View style={messageStyle}>
          {illustrationElement}
          {textElement}
        </View>
      ) : (
        <>
          {illustrationElement}
          {textElement}
        </>
      )}

      {shouldShowAction && onAction ? (
        // Figma `TodayScreenState`: the shared Button (51pt, side padding 32).
        <Button
          title={actionTitle ?? ''}
          accessibilityLabel={actionTitle}
          onPress={onAction}
          restStyle={actionButtonStyle}
          textStyle={actionTextStyle}
          testID={actionTestID}
        />
      ) : null}
    </View>
  );
};
