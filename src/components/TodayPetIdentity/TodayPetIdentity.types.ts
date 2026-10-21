import type { StyleProp, ViewStyle } from 'react-native';

import type { PetOwnerAvatarProps } from '../PetOwnerAvatar';
import type { TodayPlacementListProps } from '../TodayPlacementList';

/**
 * Pet block of a Today task card (Figma `TodayPetIdentity`): pet + owner
 * avatar, pet name, breed line and where the pet is.
 */
export interface TodayPetIdentityProps {
  /** Pet name (`headline/bold`, one line). Figma `name`. */
  name: string;
  /** Breed / details line (`caption/regular`, secondary, one line). Figma `meta`. Empty hides it. */
  meta?: string;
  /** Shows the placement row. Figma `hasPlacements`. Defaults to `true`. */
  hasPlacements?: boolean;
  /** Props of the avatar (Figma instance `Фото` › `PetOwnerAvatar`). */
  avatar: PetOwnerAvatarProps;
  /** Props of the placement row (Figma instance `Размещение` › `TodayPlacementList`). Shown when `hasPlacements`. */
  placements?: TodayPlacementListProps;
  /** Opens the pet profile. Makes the whole block a button. */
  onPress?: () => void;
  /** Screen-reader label of the button (e.g. "Open Rex's profile"). Defaults to `name`. */
  accessibilityLabel?: string;
  /** Outer style. Applied last. */
  style?: StyleProp<ViewStyle>;
  /** Test identifier of the block. */
  testID?: string;
}
