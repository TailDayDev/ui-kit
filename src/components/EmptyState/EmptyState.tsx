import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { EmptyStateProps } from './EmptyState.types';

/** App action pressed opacity (differs from `opacity.pressed`). */
const ACTION_PRESSED_OPACITY = 0.8;
/** App action minimum width (off-scale). */
const ACTION_MIN_WIDTH = 120;

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
    actionButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.accent,
      borderRadius: theme.radius.sm,
      justifyContent: 'center',
      minHeight: theme.minTouchTarget,
      minWidth: ACTION_MIN_WIDTH,
      paddingHorizontal: theme.space[5],
      paddingVertical: theme.space[3],
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
  const shouldShowAction = isActionVisible && Boolean(onAction);

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

      {shouldShowAction ? (
        <TouchableOpacity
          activeOpacity={ACTION_PRESSED_OPACITY}
          accessibilityLabel={actionTitle}
          accessibilityRole="button"
          onPress={onAction}
          style={[styles.actionButton, actionButtonStyle]}
          testID={actionTestID}
        >
          <Text
            variant="headline/medium"
            color="inverse"
            align="center"
            style={actionTextStyle}
          >
            {actionTitle}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
