import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { PetOwnerAvatarProps } from '../PetOwnerAvatar/index.js';
/** One placement of the pet (an item of the nested `TodayPlacementList`). */
export interface PetPickerRowPlacement {
    /** Placement name, e.g. "Standard Kennel". */
    title: string;
    /** 16×16 placement image (server image: the app passes `DinamicImage`). */
    image?: ReactNode;
}
/**
 * Photo data of the nested `PetOwnerAvatar` (Figma instance `Photo`). The
 * size is fixed by the row (64, Figma).
 */
export type PetPickerRowAvatar = Pick<PetOwnerAvatarProps, 'petPhotoUrl' | 'petCacheKey' | 'ownerFirstName' | 'ownerLastName' | 'ownerPhotoUrl' | 'ownerCacheKey' | 'petPlaceholder' | 'renderPetImage' | 'renderOwnerImage'>;
/** Pet in a picker list (Figma `PetPickerRow`). */
export interface PetPickerRowProps {
    /** Pet name (`headline/bold`, one line). Figma TEXT `name`. */
    name: string;
    /** Line under the name, e.g. the breed (`caption/regular`, one line). Hidden when empty. Figma TEXT `meta`. */
    meta?: string | null;
    /**
     * Where the pet is: the first two are shown as the nested `TodayPlacementList`
     * (Figma instance `Service`, itemsCount = `placements.length`, max 2). Hidden when empty.
     */
    placements?: readonly PetPickerRowPlacement[];
    /** Pet photo with the owner badge (Figma instance `Photo` → `PetOwnerAvatar` size 64). */
    avatar?: PetPickerRowAvatar;
    /** Selected look: soft accent fill, accent border, active radio. Figma VARIANT `isSelected`. Defaults to `false`. */
    isSelected?: boolean;
    /** Called on tap. */
    onPress?: () => void;
    /** Blocks the press and dims the row. Not in Figma. */
    disabled?: boolean;
    /** Screen-reader label. Defaults to `name`. */
    accessibilityLabel?: string;
    /** Outer layout style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the row (`.avatar`, `.placements`, `.radio` are derived from it). */
    testID?: string;
}
//# sourceMappingURL=PetPickerRow.types.d.ts.map