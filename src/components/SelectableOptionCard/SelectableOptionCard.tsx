import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '../../primitives';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { SelectableOptionCardProps } from './SelectableOptionCard.types';

/** App `SelectableOptionCard` default title line limit. */
const DEFAULT_TITLE_LINES = 3;
/** App `SelectableOptionCard` default description line limit. */
const DEFAULT_DESCRIPTION_LINES = 4;
/** App `SelectableOptionCard` title right inset that keeps text clear of the badge (off-scale). */
const TITLE_BADGE_INSET = 96;
/** App `SelectableOptionCard` disabled opacity (differs from `theme.opacity.disabled`; kept 1:1). */
const DISABLED_OPACITY = 0.6;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    badge: {
      backgroundColor: theme.colors.bg.accent,
      borderBottomLeftRadius: theme.radius.lg,
      paddingHorizontal: theme.space[3],
      paddingVertical: theme.space[0.5],
      position: 'absolute',
      right: 0,
      top: 0,
    },
    card: {
      borderRadius: theme.radius.lg,
      borderWidth: theme.stroke[1],
      overflow: 'hidden',
      padding: theme.space[4],
      position: 'relative',
      width: '100%',
    },
    cardDefault: {
      borderColor: theme.colors.border.default,
    },
    cardDisabled: {
      opacity: DISABLED_OPACITY,
    },
    cardSelected: {
      backgroundColor: theme.colors.bg.accentSoft,
      borderColor: theme.colors.bg.accent,
    },
    description: {
      marginTop: theme.space[2],
    },
    footer: {
      marginTop: theme.space[3],
    },
    titleWithBadge: {
      paddingRight: TITLE_BADGE_INSET,
    },
  });

/**
 * Selectable option card. With `onPress` it is a button reporting
 * `selected`/`disabled`; without it, a static card.
 */
export const SelectableOptionCard = memo(
  ({
    title,
    description,
    badgeText,
    footer,
    isSelected = false,
    isDisabled = false,
    onPress,
    style,
    titleStyle,
    descriptionStyle,
    titleNumberOfLines = DEFAULT_TITLE_LINES,
    descriptionNumberOfLines = DEFAULT_DESCRIPTION_LINES,
    testID,
  }: SelectableOptionCardProps) => {
    const theme = useTheme();
    const styles = useThemedStyles(createStyles);

    const content = (
      <View
        style={[
          styles.card,
          isSelected ? styles.cardSelected : styles.cardDefault,
          isDisabled ? styles.cardDisabled : null,
          style,
        ]}
      >
        {badgeText ? (
          <View style={styles.badge}>
            <Text variant="caption/regular" color="inverse" numberOfLines={1}>
              {badgeText}
            </Text>
          </View>
        ) : null}

        <Text
          variant="headline/bold"
          color={isSelected ? 'accent' : 'primary'}
          style={[badgeText ? styles.titleWithBadge : null, titleStyle]}
          numberOfLines={titleNumberOfLines}
        >
          {title}
        </Text>

        {description ? (
          <Text
            variant="caption/regular"
            color={isSelected ? 'accent' : 'secondary'}
            style={[styles.description, descriptionStyle]}
            numberOfLines={descriptionNumberOfLines}
          >
            {description}
          </Text>
        ) : null}

        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </View>
    );

    if (!onPress) {
      return content;
    }

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected, disabled: isDisabled }}
        disabled={isDisabled}
        onPress={onPress}
        testID={testID}
        android_ripple={{ color: theme.colors.border.default }}
      >
        {content}
      </Pressable>
    );
  },
);

SelectableOptionCard.displayName = 'SelectableOptionCard';
