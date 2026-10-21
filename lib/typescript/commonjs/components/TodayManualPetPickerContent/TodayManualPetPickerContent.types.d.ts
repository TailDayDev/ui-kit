import type { StyleProp, ViewStyle } from 'react-native';
import type { PetPickerRowProps } from '../PetPickerRow';
/** One pet of the list (a `PetPickerRow`). */
export interface TodayManualPetPickerPet extends Pick<PetPickerRowProps, 'name' | 'meta' | 'placements' | 'avatar'> {
    /** Stable pet id, reported by `onSelect`. */
    id: string;
    /** Test identifier of the pet row. */
    testID?: string;
}
/**
 * Body of the "choose pet" modal (Figma `TodayManualPetPickerContent`): the
 * "no pet" row and the pets as `PetPickerRow`s. Data in, `onSelect` out.
 */
export interface TodayManualPetPickerContentProps {
    /** Pets in display order. */
    pets: readonly TodayManualPetPickerPet[];
    /** Id of the selected pet; `null` selects the "no pet" row. */
    selectedId: string | null;
    /** Called with the tapped pet id, or `null` for the "no pet" row. */
    onSelect: (id: string | null) => void;
    /** Text of the "no pet" row, e.g. "Без питомца" (fixed text in Figma). */
    noneLabel: string;
    /** Screen-reader label of the list (radiogroup), e.g. the modal title "Выберите питомца". */
    accessibilityLabel?: string;
    /** Test identifier of the "no pet" row. */
    noneTestID?: string;
    /** Outer layout style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the container. */
    testID?: string;
}
//# sourceMappingURL=TodayManualPetPickerContent.types.d.ts.map