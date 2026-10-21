import type { ReactNode } from 'react';
import type { EmptyProfileImageRenderParams } from '../EmptyProfileImage';
import type { PetAvatarRenderParams } from '../PetAvatar';
/** Pet photo (56, rounded square) with the owner's photo or initials in a small round badge (Figma `PetOwnerAvatar`). */
export interface PetOwnerAvatarProps {
    /** Pet photo URL. Empty or `null` shows `petPlaceholder`. */
    petPhotoUrl?: string | null;
    /** Cache key of the pet photo, passed to `renderPetImage`. */
    petCacheKey?: string;
    /** Owner first name, for the badge initials. */
    ownerFirstName?: string | null;
    /** Owner last name, for the badge initials. */
    ownerLastName?: string | null;
    /** Owner photo URL. Empty or `null` shows the initials. */
    ownerPhotoUrl?: string | null;
    /** Cache key of the owner photo, passed to `renderOwnerImage`. */
    ownerCacheKey?: string;
    /** No-photo content of the pet tile (see `PetAvatar.placeholder`). */
    petPlaceholder?: ReactNode;
    /** Draws the pet photo (see `PetAvatar.renderImage`; app: `DinamicImage`). */
    renderPetImage?: (params: PetAvatarRenderParams) => ReactNode;
    /** Draws the owner photo (see `EmptyProfileImage.renderImage`; app: `DinamicImage`). */
    renderOwnerImage?: (params: EmptyProfileImageRenderParams) => ReactNode;
    /**
     * Pet photo size. `56` (default) is the app look; `64` is Figma `PetOwnerAvatar`:
     * 64pt photo with radius 12 and `body/regular` owner initials.
     */
    size?: 56 | 64;
    /** Screen-reader text for the whole avatar, e.g. "Rex, owner Anna Cooper". */
    accessibilityLabel?: string;
    /** Test identifier of the container. */
    testID?: string;
}
//# sourceMappingURL=PetOwnerAvatar.types.d.ts.map