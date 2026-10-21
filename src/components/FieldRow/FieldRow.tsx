import { useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  type GestureResponderEvent,
} from 'react-native';

import { ChevronDownIcon } from '../../icons/ChevronDownIcon';
import { CloseIcon } from '../../icons/CloseIcon';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import type { FieldRowProps } from './FieldRow.types';

// off-scale: the app row presses to 0.7, not the kit `opacity.pressed` (0.85).
const ROW_PRESSED_OPACITY = 0.7;
/** A static row does not react to touches. */
const STATIC_OPACITY = 1;
/** Round action button (app `rowAction`, 28pt circle). */
const ACTION_SIZE = 28;
/** Chevron / clear glyph size. */
const ACTION_ICON_SIZE = 20;
/** Icon slot width (Figma icon frame). */
const ICON_SLOT_WIDTH = 24;
/** Extra touch area around the round action. */
const ACTION_HIT_SLOP = 8;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.sm,
      borderWidth: theme.stroke[1],
      flexDirection: 'row',
      gap: theme.space[2],
      justifyContent: 'space-between',
      padding: theme.space[3],
    },
    rowAction: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: ACTION_SIZE / 2,
      height: ACTION_SIZE,
      justifyContent: 'center',
      width: ACTION_SIZE,
    },
    rowContent: {
      alignItems: 'center',
      flexDirection: 'row',
      flexShrink: 1,
      gap: theme.space[2],
    },
    rowError: {
      borderColor: theme.colors.text.error,
    },
    rowIcon: {
      alignItems: 'center',
      width: ICON_SLOT_WIDTH,
    },
    rowValue: {
      flexShrink: 1,
    },
  });

/**
 * Picker-style form row (Figma `FieldRow`): icon and label on the left, value
 * and a round chevron (or clear ×) on the right.
 */
export const FieldRow = ({
  icon = null,
  label,
  value,
  isEmpty = false,
  isError = false,
  onPress,
  onClear,
  showAction = true,
  restValueStyle,
  style,
  testID,
  accessibilityLabel,
  actionAccessibilityLabel,
  actionTestID,
}: FieldRowProps) => {
  const styles = useThemedStyles(createStyles);
  const isInteractive = Boolean(onPress);
  const canPressAction = isInteractive || Boolean(onClear);

  const handleRowPress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  const handleActionPress = useCallback(
    (event: GestureResponderEvent) => {
      event.stopPropagation();

      const action = onClear ?? onPress;
      action?.();
    },
    [onClear, onPress],
  );

  const valueColor = isError ? 'error' : isEmpty ? 'secondary' : 'accent';

  return (
    <TouchableOpacity
      testID={testID}
      style={[styles.row, isError ? styles.rowError : null, style]}
      onPress={handleRowPress}
      disabled={!isInteractive}
      activeOpacity={isInteractive ? ROW_PRESSED_OPACITY : STATIC_OPACITY}
      accessibilityRole={isInteractive ? 'button' : undefined}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={styles.rowContent}>
        <View style={styles.rowIcon}>{icon}</View>
        <Text variant="body/regular">{label}</Text>
      </View>

      <View style={styles.rowContent}>
        <Text
          variant="body/medium"
          color={valueColor}
          align="right"
          style={[styles.rowValue, restValueStyle]}
        >
          {value}
        </Text>
        {showAction ? (
          <TouchableOpacity
            style={styles.rowAction}
            onPress={handleActionPress}
            hitSlop={ACTION_HIT_SLOP}
            disabled={!canPressAction}
            accessibilityRole={canPressAction ? 'button' : undefined}
            accessibilityLabel={actionAccessibilityLabel}
            testID={actionTestID}
          >
            <Icon
              icon={onClear ? CloseIcon : ChevronDownIcon}
              size={ACTION_ICON_SIZE}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
