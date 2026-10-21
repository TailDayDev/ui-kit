import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type { ActionListRowProps } from './ActionListRow.types';
import {
  getActionListRowVariantStyles,
  isActionListRowCardVariant,
} from './actionListRowVariants';

/** App flat row content height (off-scale size, not spacing). */
const ROW_CONTENT_MIN_HEIGHT = 56;
/** Leading / trailing icon slot (Figma icon frame). */
const ICON_SLOT_SIZE = 24;
/** Right text never takes more than this share of the row. */
const RIGHT_TEXT_MAX_WIDTH = '36%';
// off-scale: the app dims a disabled row to 0.6, not the kit `opacity.disabled` (0.45).
const ROW_DISABLED_OPACITY = 0.6;
const DEFAULT_LINES = 2;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[3],
      minHeight: ROW_CONTENT_MIN_HEIGHT,
      width: '100%',
    },
    description: {
      marginTop: theme.space[1],
    },
    leading: {
      alignItems: 'center',
      flexGrow: 0,
      flexShrink: 0,
      justifyContent: 'center',
      minWidth: ICON_SLOT_SIZE,
      width: ICON_SLOT_SIZE,
    },
    rightText: {
      flexShrink: 0,
      maxWidth: RIGHT_TEXT_MAX_WIDTH,
    },
    row: {
      paddingVertical: theme.space[3],
      width: '100%',
    },
    rowCardReset: {
      paddingVertical: 0,
    },
    rowDisabled: {
      opacity: ROW_DISABLED_OPACITY,
    },
    rowWithDivider: {
      borderBottomColor: theme.colors.border.default,
      borderBottomWidth: theme.stroke[1],
    },
    textBlock: {
      flex: 1,
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
    },
    trailing: {
      alignItems: 'center',
      flexGrow: 0,
      flexShrink: 0,
      height: ICON_SLOT_SIZE,
      justifyContent: 'center',
      minWidth: ICON_SLOT_SIZE,
      width: ICON_SLOT_SIZE,
    },
  });

/**
 * List / sheet row with an icon slot, title, description, right text and a
 * trailing slot. Tappable when `onPress` is set. Figma `TaskSheetRow` is the
 * `trailing-icon` variant (`isDanger` for the red destructive row).
 */
export const ActionListRow = memo(function ActionListRow({
  accessibilityLabel,
  title,
  description,
  rightText,
  leading,
  trailing,
  isDanger = false,
  isDisabled = false,
  showDivider,
  variant = 'flat',
  onPress,
  style,
  contentStyle,
  titleStyle,
  descriptionStyle,
  rightTextStyle,
  titleNumberOfLines,
  descriptionNumberOfLines,
  testID,
}: ActionListRowProps) {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const variantStyles = useMemo(
    () => getActionListRowVariantStyles(theme, variant),
    [theme, variant],
  );
  const isCardVariant = isActionListRowCardVariant(variant);
  const resolvedShowDivider = showDivider ?? !isCardVariant;
  const resolvedTitleNumberOfLines =
    titleNumberOfLines ?? variantStyles?.titleNumberOfLines ?? DEFAULT_LINES;
  const resolvedDescriptionNumberOfLines =
    descriptionNumberOfLines ??
    variantStyles?.descriptionNumberOfLines ??
    DEFAULT_LINES;
  const isIconPlacedOnTrailingSide =
    variantStyles?.iconPlacement === 'trailing';
  const resolvedLeading = isIconPlacedOnTrailingSide ? null : leading;
  const resolvedTrailing = isIconPlacedOnTrailingSide
    ? (trailing ?? leading)
    : trailing;

  const content = (
    <View
      testID={onPress ? undefined : testID}
      style={[
        styles.row,
        isCardVariant ? styles.rowCardReset : null,
        resolvedShowDivider ? styles.rowWithDivider : null,
        isDisabled ? styles.rowDisabled : null,
        variantStyles?.row,
        style,
      ]}
    >
      <View style={[styles.content, variantStyles?.content, contentStyle]}>
        {resolvedLeading ? (
          <View style={styles.leading}>{resolvedLeading}</View>
        ) : null}
        <View style={styles.textBlock}>
          <Text
            variant="body/medium"
            color={isDanger ? 'error' : 'primary'}
            style={[
              variantStyles?.title,
              isDanger ? { color: theme.colors.text.error } : null,
              titleStyle,
            ]}
            numberOfLines={resolvedTitleNumberOfLines}
          >
            {title}
          </Text>
          {description ? (
            <Text
              variant="caption/regular"
              color="secondary"
              style={[
                styles.description,
                variantStyles?.description,
                descriptionStyle,
              ]}
              numberOfLines={resolvedDescriptionNumberOfLines}
            >
              {description}
            </Text>
          ) : null}
        </View>
        {rightText ? (
          <Text
            variant="body/regular"
            style={[styles.rightText, variantStyles?.rightText, rightTextStyle]}
            numberOfLines={1}
          >
            {rightText}
          </Text>
        ) : null}
        {resolvedTrailing ? (
          <View style={styles.trailing}>{resolvedTrailing}</View>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      testID={testID}
    >
      {content}
    </Pressable>
  );
});
