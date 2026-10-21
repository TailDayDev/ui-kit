import { Pressable, StyleSheet, View } from 'react-native';

import { FilterIcon } from '../../icons/FilterIcon';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { FilterTriggerProps } from './FilterTrigger.types';

/** Counts above this show as "999+". */
const MAX_FILTER_BADGE_COUNT = 999;
/** App filter button diameter (Figma IconRoundButton size=40). */
const BUTTON_SIZE = 40;
const ICON_SIZE = 24;
// off-scale: badge pill geometry from the app (no Figma tokens).
const BADGE_OFFSET = -4;
const BADGE_MIN_WIDTH = 20;
const BADGE_HEIGHT = 14;
// off-scale: the app dims to 0.6 and presses to 0.9, not the kit opacity tokens.
const DISABLED_OPACITY = 0.6;
const PRESSED_OPACITY = 0.9;
const IDLE_OPACITY = 1;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: theme.radius.full,
      height: BUTTON_SIZE,
      justifyContent: 'center',
      width: BUTTON_SIZE,
    },
    badge: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.accent,
      borderRadius: theme.radius.full,
      height: BADGE_HEIGHT,
      justifyContent: 'center',
      minWidth: BADGE_MIN_WIDTH,
      paddingHorizontal: theme.space[1],
      position: 'absolute',
      right: BADGE_OFFSET,
      top: BADGE_OFFSET,
    },
  });

/** Round filter button; a purple badge shows the active filter count. */
export const FilterTrigger = ({
  accessibilityLabel,
  testID,
  count = 0,
  disabled = false,
  onPress,
  style,
}: FilterTriggerProps) => {
  const styles = useThemedStyles(createStyles);
  const badgeText =
    count > MAX_FILTER_BADGE_COUNT
      ? `${MAX_FILTER_BADGE_COUNT}+`
      : String(count);

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        {
          opacity: disabled
            ? DISABLED_OPACITY
            : pressed
              ? PRESSED_OPACITY
              : IDLE_OPACITY,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
    >
      <Icon icon={FilterIcon} size={ICON_SIZE} />
      {count > 0 ? (
        <View style={styles.badge}>
          <Text
            variant="caption/medium"
            color="inverse"
            align="center"
            numberOfLines={1}
          >
            {badgeText}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
};
