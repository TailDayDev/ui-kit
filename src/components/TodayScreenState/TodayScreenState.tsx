import { StyleSheet, View } from 'react-native';

import { IconWifiOff } from '../../icons/figma';
import { Icon } from '../../primitives/Icon';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { Button } from '../Button';
import type {
  TodayScreenStateKind,
  TodayScreenStateProps,
} from './TodayScreenState.types';

// Figma TodayScreenState › Картинка: 120×120 (off-scale).
const ILLUSTRATION_SIZE = 120;
// Figma TodayScreenState kind=offline: band height 40.
const OFFLINE_BAR_HEIGHT = 40;
// Figma TodayScreenState kind=offline › wifi-off: 16×16.
const OFFLINE_ICON_SIZE = 16;

/** Figma variants that carry the action button. */
const KINDS_WITH_ACTION: readonly TodayScreenStateKind[] = [
  'no-auth',
  'no-hotel',
  'no-results',
];

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      alignSelf: 'stretch',
      gap: theme.space[12],
      justifyContent: 'center',
      paddingHorizontal: theme.space[10],
    },
    illustration: {
      alignItems: 'center',
      height: ILLUSTRATION_SIZE,
      justifyContent: 'center',
      width: ILLUSTRATION_SIZE,
    },
    message: {
      alignItems: 'center',
      alignSelf: 'stretch',
      gap: theme.space[4],
    },
    offlineBar: {
      alignItems: 'center',
      alignSelf: 'stretch',
      backgroundColor: theme.colors.bg.subtle,
      flexDirection: 'row',
      gap: theme.space[2],
      height: OFFLINE_BAR_HEIGHT,
      paddingHorizontal: theme.space[4],
    },
    text: {
      alignSelf: 'stretch',
    },
    texts: {
      alignItems: 'center',
      alignSelf: 'stretch',
      gap: theme.space[2],
    },
  });

/**
 * Today screen state (Figma `TodayScreenState`): picture, title, explanation
 * and an action button for `no-auth` / `no-hotel` / `empty` / `no-results`;
 * a full-width "no network" band for `offline`.
 */
export const TodayScreenState = ({
  kind = 'no-auth',
  label,
  title,
  description,
  illustration,
  actionLabel,
  onAction,
  actionTestID,
  style,
  testID,
}: TodayScreenStateProps) => {
  const styles = useThemedStyles(createStyles);

  if (kind === 'offline') {
    return (
      <View style={[styles.offlineBar, style]} testID={testID}>
        <Icon icon={IconWifiOff} size={OFFLINE_ICON_SIZE} />
        <Text color="secondary" variant="caption/regular">
          {label}
        </Text>
      </View>
    );
  }

  const isActionVisible =
    KINDS_WITH_ACTION.includes(kind) &&
    Boolean(actionLabel) &&
    Boolean(onAction);

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.message}>
        {illustration ? (
          <View style={styles.illustration}>{illustration}</View>
        ) : null}
        <View style={styles.texts}>
          {title ? (
            <Text
              accessibilityRole="header"
              align="center"
              style={styles.text}
              variant="title/medium"
            >
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text
              align="center"
              color="secondary"
              style={styles.text}
              variant="body/regular"
            >
              {description}
            </Text>
          ) : null}
        </View>
      </View>
      {isActionVisible && actionLabel && onAction ? (
        <Button onPress={onAction} testID={actionTestID} title={actionLabel} />
      ) : null}
    </View>
  );
};
