import {
  StyleSheet,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { Text } from '../../primitives/Text';
import { useTheme, useThemedStyles, type Theme } from '../../theme';
import type {
  TodayTaskActionType,
  TodayTaskTypeBadgeProps,
} from './TodayTaskTypeBadge.types';

// Figma TodayTaskTypeBadge › Иконка: 24×24 artwork slot.
const ICON_SIZE = 24;
// Figma TodayTaskTypeBadge › careDot1/careDot2: 4×4 dot.
const CARE_DOT_SIZE = 4;
// Figma TodayTaskTypeBadge: frame height 32 (HUG of 24 icon + 4/4 padding).
const BADGE_MIN_HEIGHT = 32;
// Figma TodayTaskTypeBadge: radii [8, 24, 24, 0]. Figma clamps the 24pt end
// radii per corner to half the 32pt height; RN/web instead scale ALL corners
// down when adjacent radii overflow a side (which shrank the 8pt top-left
// corner to ~5pt). Drawing the rendered 16pt directly keeps every corner exact.
const BADGE_END_RADIUS = BADGE_MIN_HEIGHT / 2;

interface BadgeColors {
  background: string;
  foreground: string;
}

const resolveBadgeColors = (
  theme: Theme,
  actionType: TodayTaskActionType,
): BadgeColors => {
  const { colors, palette } = theme;
  switch (actionType) {
    case 'CheckOut':
      return {
        background: colors.bg.successSoft,
        foreground: colors.text.success,
      };
    case 'Feeding':
      return {
        background: palette.feedingBadgeBackground,
        foreground: palette.feedingBadgeForeground,
      };
    case 'Medication':
      return {
        background: palette.medicationBadgeBackground,
        foreground: colors.text.error,
      };
    case 'AdditionalService':
      return {
        background: palette.additionalServiceBadgeBackground,
        foreground: palette.additionalServiceBadgeForeground,
      };
    case 'Manual':
      return {
        background: palette.manualBadgeBackground,
        foreground: palette.manualBadgeForeground,
      };
    case 'Transfer':
      return {
        background: palette.transferBadgeBackground,
        foreground: palette.transferBadgeForeground,
      };
    case 'CheckIn':
    default:
      return {
        background: colors.bg.accentSoft,
        foreground: colors.text.accent,
      };
  }
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    badge: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: BADGE_END_RADIUS,
      borderTopLeftRadius: theme.radius.sm,
      borderTopRightRadius: BADGE_END_RADIUS,
      flexDirection: 'row',
      flexShrink: 1,
      gap: theme.space[2],
      minHeight: BADGE_MIN_HEIGHT,
      overflow: 'hidden',
      paddingBottom: theme.space[1],
      paddingLeft: theme.space[3],
      paddingRight: theme.space[4],
      paddingTop: theme.space[1],
    },
    careDot: {
      borderRadius: theme.radius.full,
      height: CARE_DOT_SIZE,
      width: CARE_DOT_SIZE,
    },
    careType: {
      flexShrink: 0,
    },
    // As in the app: only the last care type truncates, earlier ones keep
    // their full width.
    lastCareType: {
      flexShrink: 1,
      minWidth: 0,
    },
    icon: {
      alignItems: 'center',
      height: ICON_SIZE,
      justifyContent: 'center',
      width: ICON_SIZE,
    },
    label: {
      flexShrink: 0,
    },
  });

/**
 * Task type label of a Today task card (Figma `TodayTaskTypeBadge`): type
 * artwork and name, plus up to two care types for check-in / check-out.
 */
export const TodayTaskTypeBadge = ({
  actionType = 'CheckIn',
  label,
  icon,
  hasCareType = false,
  careType,
  hasSecondCareType = false,
  secondCareType,
  style,
  testID,
}: TodayTaskTypeBadgeProps) => {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const { background, foreground } = resolveBadgeColors(theme, actionType);
  const careTypes = [
    hasCareType ? careType : undefined,
    hasSecondCareType ? secondCareType : undefined,
  ].filter((value): value is string => Boolean(value));

  return (
    <View
      testID={testID}
      accessible
      accessibilityLabel={[label, ...careTypes].join(' • ')}
      style={[styles.badge, { backgroundColor: background }, style]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text
        variant="headline/regular"
        numberOfLines={1}
        style={[styles.label, { color: foreground }]}
      >
        {label}
      </Text>
      {careTypes.map((value, index) => (
        <CareType
          key={`${index}-${value}`}
          value={value}
          color={foreground}
          dotStyle={styles.careDot}
          textStyle={
            index === careTypes.length - 1
              ? styles.lastCareType
              : styles.careType
          }
          testID={testID ? `${testID}.careType${index + 1}` : undefined}
        />
      ))}
    </View>
  );
};

interface CareTypeProps {
  value: string;
  color: string;
  dotStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  testID?: string;
}

/** Dot + one care type (Figma `careDotN` + `careTypeN`). */
const CareType = ({
  value,
  color,
  dotStyle,
  textStyle,
  testID,
}: CareTypeProps) => (
  <>
    <View style={[dotStyle, { backgroundColor: color }]} />
    <Text
      testID={testID}
      variant="headline/regular"
      numberOfLines={1}
      ellipsizeMode="tail"
      style={[textStyle, { color }]}
    >
      {value}
    </Text>
  </>
);
