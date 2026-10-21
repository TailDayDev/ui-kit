import { StyleSheet, View } from 'react-native';

import { IconX } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { TodaySkippedActionProps } from './TodaySkippedAction.types';

// Figma TodaySkippedAction: capsule 180×48 (FIXED, no width token).
const CAPSULE_WIDTH = 180;
// Figma TodaySkippedAction › Ручка › x: 20×20.
const HANDLE_ICON_SIZE = 20;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    capsule: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.full,
      borderWidth: theme.stroke[1],
      flexDirection: 'row',
      height: theme.space[12],
      justifyContent: 'space-between',
      overflow: 'hidden',
      // Figma strokes are INSIDE and do not shift auto-layout content; RN
      // borders do, so the border width is taken out of the padding.
      paddingLeft: theme.space[6] - theme.stroke[1],
      paddingRight: theme.space[1] - theme.stroke[1],
      width: CAPSULE_WIDTH,
    },
    handle: {
      alignItems: 'center',
      backgroundColor: theme.colors.icon.default,
      borderRadius: theme.radius.full,
      height: theme.space[10],
      justifyContent: 'center',
      width: theme.space[10],
    },
    label: {
      flexShrink: 1,
    },
  });

/**
 * Footer state of a skipped Today task (Figma `TodaySkippedAction`): an
 * inactive soft-gray capsule with the status text and a gray × handle.
 * Not interactive; the skip reason is a card layer, not part of this component.
 */
export const TodaySkippedAction = ({
  label,
  style,
  testID,
}: TodaySkippedActionProps) => {
  const styles = useThemedStyles(createStyles);
  return (
    <View
      testID={testID}
      accessible
      accessibilityRole="text"
      accessibilityLabel={label}
      style={[styles.capsule, style]}
    >
      <Text variant="headline/medium" numberOfLines={1} style={styles.label}>
        {label}
      </Text>
      <View style={styles.handle}>
        <Icon icon={IconX} size={HANDLE_ICON_SIZE} color="text.inverse" />
      </View>
    </View>
  );
};
