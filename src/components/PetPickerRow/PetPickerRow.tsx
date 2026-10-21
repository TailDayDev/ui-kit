import { StyleSheet, View } from 'react-native';

import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useThemedStyles, type Theme } from '../../theme';
import { PetOwnerAvatar } from '../PetOwnerAvatar';
import { Radio } from '../Radio';
import { TodayPlacementList } from '../TodayPlacementList';
import type { PetPickerRowProps } from './PetPickerRow.types';

// Figma PetPickerRow › Photo: PetOwnerAvatar 64.
const AVATAR_SIZE = 64;
// Figma PetPickerRow › Radio: size=20 (inner dot 10, as in StaffPickerRow).
const RADIO_SIZE = 20;
const RADIO_DOT_SIZE = 10;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.lg,
      borderWidth: theme.stroke[1],
      flexDirection: 'row',
      gap: theme.space[3],
      // Figma stroke is INSIDE; RN border shifts content, so it is taken out of the padding.
      paddingHorizontal: theme.space[4] - theme.stroke[1],
      paddingVertical: theme.space[3] - theme.stroke[1],
    },
    rowSelected: {
      backgroundColor: theme.colors.bg.accentSoft,
      borderColor: theme.colors.bg.accent,
    },
    texts: {
      alignSelf: 'stretch',
      flex: 1,
      gap: theme.space[0.5],
      justifyContent: 'center',
      minWidth: 0,
    },
  });

/**
 * Pet in a picker list (Figma `PetPickerRow`): photo with the owner badge,
 * name, meta, placements and a radio. The row is the radio for screen readers.
 */
export const PetPickerRow = ({
  name,
  meta,
  placements = [],
  avatar,
  isSelected = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  testID,
}: PetPickerRowProps) => {
  const styles = useThemedStyles(createStyles);
  const [firstPlacement, secondPlacement] = placements;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel ?? name}
      accessibilityState={{ checked: isSelected }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.row, isSelected ? styles.rowSelected : null, style]}
    >
      <PetOwnerAvatar
        {...avatar}
        size={AVATAR_SIZE}
        testID={testID ? `${testID}.avatar` : undefined}
      />
      <View style={styles.texts}>
        <Text variant="headline/bold" numberOfLines={1}>
          {name}
        </Text>
        {meta ? (
          <Text variant="caption/regular" color="secondary" numberOfLines={1}>
            {meta}
          </Text>
        ) : null}
        {firstPlacement ? (
          <TodayPlacementList
            itemsCount={secondPlacement ? 2 : 1}
            title={firstPlacement.title}
            image={firstPlacement.image}
            secondTitle={secondPlacement?.title}
            secondImage={secondPlacement?.image}
            testID={testID ? `${testID}.placements` : undefined}
          />
        ) : null}
      </View>
      <Radio
        isActive={isSelected}
        size={RADIO_SIZE}
        dotSize={RADIO_DOT_SIZE}
        testID={testID ? `${testID}.radio` : undefined}
      />
    </Pressable>
  );
};
