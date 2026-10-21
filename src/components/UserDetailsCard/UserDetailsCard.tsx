import {
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
} from 'react-native';

import { Text } from '../../primitives';
import { useThemedStyles, type Theme } from '../../theme';
import { Card } from '../Card';
import { EmptyProfileImage } from '../EmptyProfileImage';
import type {
  UserDetailsCardDetail,
  UserDetailsCardProps,
} from './UserDetailsCard.types';

/** App detail value hit slop. */
const DETAIL_VALUE_HIT_SLOP = 4;
/** App detail row top padding (off-scale: not in Figma Spacing). */
const DETAIL_ROW_PADDING_TOP = 14;
/** App detail value column flex against the label. */
const DETAIL_VALUE_FLEX = 1.5;
/** Max lines of a detail value. */
const DETAIL_VALUE_LINES = 2;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      gap: theme.space[4],
    },
    detailMainRow: {
      flexDirection: 'row',
      gap: theme.space[4],
      justifyContent: 'space-between',
    },
    detailRow: {
      borderTopColor: theme.colors.border.default,
      borderTopWidth: theme.stroke[1],
      gap: theme.space[1],
      paddingTop: DETAIL_ROW_PADDING_TOP,
    },
    detailValuePressable: {
      flex: DETAIL_VALUE_FLEX,
    },
    ownerAvatarContainer: {
      borderRadius: theme.radius.sm,
      overflow: 'hidden',
    },
    ownerHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space[4],
    },
    ownerName: {
      flex: 1,
    },
    ownerProfileButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.subtle,
      borderRadius: theme.radius.sm,
      justifyContent: 'center',
      minHeight: theme.minTouchTarget,
      paddingHorizontal: theme.space[4],
      paddingVertical: theme.space[2.5],
    },
    pressedButton: {
      opacity: theme.opacity.pressed,
    },
  });

type Styles = ReturnType<typeof createStyles>;

const DetailRow = ({
  label,
  styles,
  subLabel,
  value,
  onPress,
}: UserDetailsCardDetail & { styles: Styles }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailMainRow}>
      <Text variant="body/regular">{label}</Text>
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        disabled={!onPress || !value}
        hitSlop={DETAIL_VALUE_HIT_SLOP}
        onPress={(event: GestureResponderEvent) => {
          event.stopPropagation();
          onPress?.();
        }}
        style={styles.detailValuePressable}
      >
        <Text
          variant="body/regular"
          color="accent"
          align="right"
          numberOfLines={DETAIL_VALUE_LINES}
        >
          {value || ''}
        </Text>
      </Pressable>
    </View>
    {subLabel ? (
      <Text variant="caption/regular" color="secondary">
        {subLabel}
      </Text>
    ) : null}
  </View>
);

/** Owner / contact summary card: title, avatar with name, detail rows and an action button. */
export const UserDetailsCard = ({
  actionText,
  details,
  name,
  photoUrl,
  testID,
  title,
  fallbackName,
  onActionPress,
  renderAvatarImage,
}: UserDetailsCardProps) => {
  const styles = useThemedStyles(createStyles);

  const [firstName, lastName] = name.trim().split(/\s+/);
  const visibleDetails = details.filter(item => Boolean(item.value));

  return (
    <Card style={styles.card}>
      <Text variant="headline/bold">{title}</Text>
      <View style={styles.ownerHeader}>
        <View style={styles.ownerAvatarContainer}>
          <EmptyProfileImage
            firstName={firstName}
            lastName={lastName}
            imageUrl={photoUrl ?? ''}
            size="l"
            renderImage={renderAvatarImage}
          />
        </View>
        <Text variant="title/medium" numberOfLines={1} style={styles.ownerName}>
          {name || fallbackName}
        </Text>
      </View>

      {visibleDetails.map(item => (
        <DetailRow
          key={`${item.label}-${item.value}`}
          label={item.label}
          onPress={item.onPress}
          styles={styles}
          subLabel={item.subLabel}
          value={item.value}
        />
      ))}

      <Pressable
        accessibilityRole="button"
        onPress={onActionPress}
        style={({ pressed }) => [
          styles.ownerProfileButton,
          pressed && styles.pressedButton,
        ]}
        testID={testID}
      >
        <Text variant="headline/medium">{actionText}</Text>
      </Pressable>
    </Card>
  );
};
