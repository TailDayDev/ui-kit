import type { ReactNode } from 'react';
import type { ImageURISource } from 'react-native';
/** Side length in points per size (app `PET_AVATAR_SIZES`). */
export declare const PET_AVATAR_SIZES: {
    readonly xs: 24;
    readonly s: 40;
    readonly m: 48;
    readonly l: 56;
    readonly xl: 96;
};
export type PetAvatarSize = keyof typeof PET_AVATAR_SIZES;
export type PetAvatarShape = 'square' | 'circle';
/** Values `PetAvatar` hands to `renderImage`. */
export interface PetAvatarRenderParams {
    /** Trimmed photo URL; `''` when the pet has no photo. */
    uri: string;
    /** Square side in points. */
    size: number;
    /** Corner radius of the frame in points. */
    borderRadius: number;
    /** iOS cache policy. */
    cache?: ImageURISource['cache'];
    /** Cache key; `undefined` when there is no photo. */
    photoCacheKey?: string;
    /** The no-photo content, already sized to fill the frame. Show it when there is no photo or it fails. */
    placeholder: ReactNode;
}
/** Pet photo in a square or circular frame with a no-photo fallback. */
export interface PetAvatarProps {
    /** Screen-reader text, e.g. the pet's name. Omit when the name is shown next to it. */
    accessibilityLabel?: string;
    /** iOS cache policy for the remote photo. */
    cache?: ImageURISource['cache'];
    /** Photo URL. Empty, blank or `null` shows `placeholder`. */
    photoUrl?: string | null;
    /** Stable cache key for the photo, passed to `renderImage`. */
    photoCacheKey?: string;
    /** `'circle'` or `'square'` (radius 8). Defaults to `'circle'`. */
    shape?: PetAvatarShape;
    /** Size step: xs 24, s 40, m 48, l 56, xl 96. Defaults to `'l'`. */
    size?: PetAvatarSize;
    /**
     * No-photo content drawn over the whole frame (app: `NoImagePlaceholder`
     * with the admin `NoImageIcon`). Defaults to an empty, transparent frame.
     */
    placeholder?: ReactNode;
    /**
     * Draws the photo instead of the built-in `Image` (app: `DinamicImage` for
     * disk caching and a loading skeleton). Called for the no-photo case too,
     * with `uri: ''`.
     */
    renderImage?: (params: PetAvatarRenderParams) => ReactNode;
    /** Test identifier of the frame; the placeholder gets `<testID>.placeholder`. */
    testID?: string;
}
//# sourceMappingURL=PetAvatar.types.d.ts.map