import { useMemo, type ReactNode } from 'react';
import { StyleSheet, View, type TextStyle } from 'react-native';

import { CheckIcon } from '../../icons/CheckIcon';
import { TriangleAlertIcon } from '../../icons/TriangleAlertIcon';
import { Icon, type IconColor } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type {
  StatusBadgeIconPosition,
  StatusBadgeProps,
  StatusBadgeTone,
} from './StatusBadge.types';

/** App badge height (off-scale size). */
const STATUS_BADGE_HEIGHT = 20;
const STATUS_BADGE_ICON_SIZE = 14;
const STATUS_BADGE_ICON_ONLY_SIZE = 20;
// off-scale: the app full-width and icon-only badges use radius 10 (not in Figma Radius).
const STATUS_BADGE_SQUARE_RADIUS = 10;

interface StatusBadgeVisualConfig {
  backgroundColor: string;
  icon: ReactNode;
  iconPosition: StatusBadgeIconPosition;
  textColor: string;
  textStyle?: TextStyle;
}

const renderToneIcon = (tone: StatusBadgeTone, color: IconColor) => (
  <Icon
    icon={tone === 'success' ? CheckIcon : TriangleAlertIcon}
    color={color}
    size={STATUS_BADGE_ICON_SIZE}
  />
);

const getToneConfig = (
  tone: StatusBadgeTone,
  theme: Theme,
): StatusBadgeVisualConfig => {
  switch (tone) {
    case 'success':
      return {
        backgroundColor: theme.colors.bg.successSoft,
        icon: renderToneIcon(tone, 'text.success'),
        iconPosition: 'left',
        textColor: theme.colors.text.success,
      };
    case 'danger':
      return {
        backgroundColor: theme.colors.bg.errorSoft,
        icon: renderToneIcon(tone, 'text.error'),
        iconPosition: 'right',
        textColor: theme.colors.text.error,
      };
    case 'warning':
      return {
        backgroundColor: theme.palette.warningLight,
        icon: renderToneIcon(tone, 'text.primary'),
        iconPosition: 'right',
        textColor: theme.colors.text.primary,
      };
    case 'neutral':
      return {
        backgroundColor: theme.colors.bg.subtle,
        icon: renderToneIcon(tone, 'text.secondary'),
        iconPosition: 'right',
        textColor: theme.colors.text.secondary,
      };
  }
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    badgeBase: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    badgeFullWidth: {
      alignSelf: 'stretch',
      borderRadius: STATUS_BADGE_SQUARE_RADIUS,
      gap: theme.space[1],
      height: STATUS_BADGE_HEIGHT,
      justifyContent: 'center',
      paddingHorizontal: theme.space[2],
    },
    badgeIconOnly: {
      alignSelf: 'flex-start',
      borderRadius: STATUS_BADGE_SQUARE_RADIUS,
      height: STATUS_BADGE_ICON_ONLY_SIZE,
      justifyContent: 'center',
      width: STATUS_BADGE_ICON_ONLY_SIZE,
    },
    badgeInline: {
      alignSelf: 'flex-start',
      borderRadius: theme.radius.lg,
      gap: theme.space[1],
      height: STATUS_BADGE_HEIGHT,
      paddingHorizontal: theme.space[2],
    },
    iconOnlySlot: {
      alignItems: 'center',
      height: STATUS_BADGE_ICON_SIZE,
      justifyContent: 'center',
      width: STATUS_BADGE_ICON_SIZE,
    },
  });

/** Status pill: a short label with a tone icon (check / alert). */
export const StatusBadge = (props: StatusBadgeProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const { label, layout = 'inline', style, testID } = props;
  const toneConfig = useMemo(
    () => (props.tone ? getToneConfig(props.tone, theme) : null),
    [props.tone, theme],
  );
  const backgroundColor = toneConfig?.backgroundColor ?? props.backgroundColor;
  const icon = toneConfig?.icon ?? props.icon;
  const iconPosition = props.iconPosition ?? toneConfig?.iconPosition ?? 'left';
  const textColor = toneConfig?.textColor ?? props.textColor;
  const textStyle = toneConfig?.textStyle ?? props.textStyle;
  const layoutStyle =
    layout === 'fullWidth'
      ? styles.badgeFullWidth
      : layout === 'iconOnly'
        ? styles.badgeIconOnly
        : styles.badgeInline;

  return (
    <View
      testID={testID}
      // The icon-only badge has no visible text: expose the label to screen readers.
      accessible={layout === 'iconOnly'}
      accessibilityLabel={layout === 'iconOnly' ? label : undefined}
      style={[styles.badgeBase, layoutStyle, { backgroundColor }, style]}
    >
      {layout === 'iconOnly' ? (
        <View style={styles.iconOnlySlot}>{icon}</View>
      ) : (
        <>
          {iconPosition === 'left' ? icon : null}
          <Text
            variant="caption/regular"
            style={[textStyle, { color: textColor }]}
          >
            {label}
          </Text>
          {iconPosition === 'right' ? icon : null}
        </>
      )}
    </View>
  );
};
