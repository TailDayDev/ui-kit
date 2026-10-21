import type { ReactNode } from 'react';
import type { PetAvatarRenderParams, PetAvatarSize } from './PetAvatar.types';
/** One pet in the stack. */
export interface OverlappingPetAvatarItem {
    /** Stable id, used as the React key. */
    id?: number | string | null;
    /** Pet name, used as the key when there is no id. */
    name?: string | null;
    /** Photo URL; empty shows the placeholder. */
    photoUrl?: string | null;
}
/** Row of circular pet avatars that overlap, with an optional "+N" badge. */
export interface OverlappingPetAvatarsProps {
    /** White ring width around each avatar, in points. Defaults to 2. */
    borderWidth?: number;
    /** How many avatars to draw before the "+N" badge. Defaults to 3. */
    maxVisible?: number;
    /** How far each avatar slides under the previous one, in points. Defaults to 8. */
    overlap?: number;
    /** Pets to show, in order. */
    pets: OverlappingPetAvatarItem[];
    /** Shows a "+N" badge for the pets beyond `maxVisible`. */
    showRemainingBadge?: boolean;
    /** Avatar size step. Defaults to `'xs'` (24). */
    size?: PetAvatarSize;
    /** No-photo content for each avatar (see `PetAvatar.placeholder`). */
    placeholder?: ReactNode;
    /** Draws each photo (see `PetAvatar.renderImage`). */
    renderImage?: (params: PetAvatarRenderParams) => ReactNode;
    /** Test identifier of the row; avatars get `<testID>.avatar.<index>`. */
    testID?: string;
}
//# sourceMappingURL=OverlappingPetAvatars.types.d.ts.map