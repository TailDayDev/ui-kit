import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { DashedBorder } from '../DashedBorder';
import { PlusIcon } from '../../icons/PlusIcon';
import { Icon, Text } from '../../primitives';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type {
  DashedButtonProps,
  DashedButtonVariant,
} from './DashedButton.types';

// Values copied from the app `shared/ui/DashedButton`; no Figma token yet.
/** Window-width offsets used when neither `width` nor `widthOffset` is given. */
const EXTERNAL_WIDTH_OFFSET = 48;
const INTERNAL_WIDTH_OFFSET = 82;
/** Outline heights per variant. */
const HEIGHT_BY_VARIANT: Record<DashedButtonVariant, number> = {
  internal: 48,
  external: 56,
  externalWrapped: 86,
};
/** Dash and gap length of the outline. */
const DASH_LENGTH = 8;
/** off-scale: disabled/loading opacity (kit `opacity.disabled` is 0.45). */
const DASHED_BUTTON_DISABLED_OPACITY = 0.6;
const PLUS_ICON_SIZE = 24;

/** "Add …" button: dashed outline, plus icon (or spinner) and a label. */
export const DashedButton = ({
  onPress,
  title,
  testID,
  cardStyle,
  width,
  widthOffset,
  textStyle,
  style,
  strokeWidth,
  disabled = false,
  loading = false,
}: DashedButtonProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const { width: windowWidth } = useWindowDimensions();
  const isDisabled = disabled || loading;
  const defaultWidthOffset =
    style === 'external' ? EXTERNAL_WIDTH_OFFSET : INTERNAL_WIDTH_OFFSET;
  const resolvedWidth =
    width ?? windowWidth - (widthOffset ?? defaultWidthOffset);
  const height = HEIGHT_BY_VARIANT[style];

  return (
    // Default TouchableOpacity active opacity (0.2) kept from the app.
    <TouchableOpacity
      testID={testID}
      style={[
        styles.card,
        { height },
        cardStyle,
        isDisabled && styles.disabledItem,
      ]}
      disabled={isDisabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      <DashedBorder
        width={resolvedWidth}
        height={height}
        dashLength={DASH_LENGTH}
        gapLength={DASH_LENGTH}
        strokeWidth={strokeWidth}
        borderRadius={style === 'external' ? theme.radius.lg : theme.radius.sm}
        color={theme.palette.lightGray}
        style={[styles.dashContainer, styles[`${style}Container`]]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.text.primary} />
        ) : (
          <Icon icon={PlusIcon} size={PLUS_ICON_SIZE} />
        )}
        <Text variant="headline/regular" style={textStyle}>
          {title}
        </Text>
      </DashedBorder>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      // Kept from the app; has no visible effect without a border width.
      borderColor: theme.palette.lightGray,
    },
    dashContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[4],
      justifyContent: 'flex-start',
      paddingHorizontal: theme.space[4],
    },
    disabledItem: {
      opacity: DASHED_BUTTON_DISABLED_OPACITY,
    },
    externalWrappedContainer: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: theme.space[2],
      paddingHorizontal: theme.space[2],
      paddingVertical: theme.space[2],
    },
    externalContainer: {
      paddingVertical: theme.space[4],
    },
    internalContainer: {
      paddingVertical: theme.space[3],
    },
  });
