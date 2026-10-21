import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { CardProps } from './Card.types';

/** Pressed opacity of a tappable card (app `Card`; differs from `opacity.pressed`). */
const CARD_PRESSED_OPACITY = 0.8;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      alignItems: 'stretch',
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.lg,
      borderWidth: theme.stroke[1],
      gap: theme.space[3],
      padding: theme.space[4],
      width: '100%',
    },
    cardShadow: {
      boxShadow: [...theme.shadows.block],
    },
    pressed: {
      opacity: CARD_PRESSED_OPACITY,
    },
    topContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      rowGap: theme.space[1],
      width: '100%',
    },
    leadingHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[2],
      flex: 1,
    },
  });

/** Bordered surface with an optional title row. Tappable when `onPress` is set. */
export const Card = ({
  title,
  children,
  additional,
  additionalPosition = 'right',
  cardStyles,
  onPress,
  disabled = false,
  withShadow = false,
  pointerEvents = 'auto',
  topContainerStyles,
  style,
  testID,
  titleNumberOfLines = 1,
  titleStyles,
  accessibilityLabel,
}: CardProps) => {
  const styles = useThemedStyles(createStyles);

  const titleText = (
    <Text
      variant="headline/bold"
      color="primary"
      style={titleStyles}
      numberOfLines={titleNumberOfLines}
      ellipsizeMode="tail"
    >
      {title}
    </Text>
  );

  const header = title ? (
    <View style={[styles.topContainer, topContainerStyles]}>
      {additionalPosition === 'left' ? (
        <View style={styles.leadingHeader}>
          {additional}
          {titleText}
        </View>
      ) : (
        <>
          {titleText}
          {additional}
        </>
      )}
    </View>
  ) : null;

  if (onPress) {
    return (
      <Pressable
        onPress={disabled ? undefined : onPress}
        pointerEvents={pointerEvents}
        disabled={disabled}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          styles.card,
          style,
          withShadow && styles.cardShadow,
          cardStyles,
          pressed && !disabled && styles.pressed,
        ]}
      >
        {header}
        {children}
      </Pressable>
    );
  }

  return (
    <View
      pointerEvents={pointerEvents}
      testID={testID}
      style={[styles.card, style, withShadow && styles.cardShadow, cardStyles]}
    >
      {header}
      {children}
    </View>
  );
};
