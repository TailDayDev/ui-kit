import { StyleSheet, View } from 'react-native';

import { useThemedStyles, type Theme } from '../../theme';
import { PetPickerRow } from '../PetPickerRow';
import { PickerNoneRow } from '../PickerNoneRow';
import type { TodayManualPetPickerContentProps } from './TodayManualPetPickerContent.types';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: theme.space[6],
      paddingHorizontal: theme.space[6],
      paddingTop: theme.space[2],
    },
    list: {
      gap: theme.space[2],
    },
  });

/**
 * Body of the "choose pet" modal (Figma `TodayManualPetPickerContent`).
 * The parent owns the (draft) selection; the modal and its footer stay outside.
 */
export const TodayManualPetPickerContent = ({
  pets,
  selectedId,
  onSelect,
  noneLabel,
  noneTestID,
  accessibilityLabel,
  style,
  testID,
}: TodayManualPetPickerContentProps) => {
  const styles = useThemedStyles(createStyles);

  return (
    <View testID={testID} style={[styles.container, style]}>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={styles.list}
      >
        <PickerNoneRow
          label={noneLabel}
          isSelected={selectedId === null}
          onPress={() => onSelect(null)}
          testID={noneTestID}
        />
        {pets.map(pet => (
          <PetPickerRow
            key={pet.id}
            name={pet.name}
            meta={pet.meta}
            placements={pet.placements}
            avatar={pet.avatar}
            isSelected={pet.id === selectedId}
            onPress={() => onSelect(pet.id)}
            testID={pet.testID}
          />
        ))}
      </View>
    </View>
  );
};
