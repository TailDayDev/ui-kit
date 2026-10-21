import type { TypographyVariant } from '../../tokens';
import type { ReactElement, ReactNode } from 'react';
import type { ColorValue, ImageURISource } from 'react-native';
/** Side length in points per size (app `PROFILE_IMAGE_SIZES`). */
export declare const PROFILE_IMAGE_SIZES: {
    readonly xs: 24;
    readonly s: 40;
    readonly m: 48;
    readonly l: 56;
    readonly xl: 96;
};
export type ProfileImageSize = keyof typeof PROFILE_IMAGE_SIZES;
export type ProfileImageShape = 'square' | 'circle';
/** Values `EmptyProfileImage` hands to `renderImage`. */
export interface EmptyProfileImageRenderParams {
    /** Photo URL or bundled image module (never empty). */
    imageUrl: string | number;
    /** Square side in points. */
    size: number;
    /** Stable cache key for the photo. */
    photoCacheKey?: string;
    /** Changes force the photo to reload. */
    refreshKey?: string | number;
    /** iOS cache policy for remote photos. */
    cache?: ImageURISource['cache'];
    /** Call when the photo fails to load: the initials are shown instead. */
    onLoadError: () => void;
}
/** Profile photo with an initials fallback (Figma `EmptyProfileImage`). */
export interface EmptyProfileImageProps {
    /** First name; its first letter is the first initial. */
    firstName?: string;
    /** Last name; its first letter is the second initial. */
    lastName?: string;
    /** Size step: xs 24, s 40, m 48, l 56, xl 96. Defaults to `'l'`. */
    size?: ProfileImageSize;
    /** `'square'` (radius 8) or `'circle'`. Defaults to `'square'`. */
    shape?: ProfileImageShape;
    /** Fill behind the initials. Defaults to `colors.bg.successSoft`. */
    backgroundColor?: ColorValue;
    /** Initials color. Defaults to `colors.text.success`. */
    initialsColor?: ColorValue;
    /**
     * Text style of the initials as a Figma style name (e.g. `'body/regular'`).
     * Defaults to the app look: bold, sized by `size`.
     */
    initialsVariant?: TypographyVariant;
    /**
     * Photo: a URL, a bundled image module or a ready element. Empty/`null`
     * shows the initials.
     */
    imageUrl?: string | number | ReactElement | null;
    /** Stable cache key for the photo, passed to `renderImage`. */
    photoCacheKey?: string;
    /** Changing it reloads the photo and clears a previous load error. */
    imageRefreshKey?: string | number;
    /** iOS cache policy for a remote photo. */
    imageCache?: ImageURISource['cache'];
    /** Dims the image and shows a spinner on top (e.g. while uploading). */
    loading?: boolean;
    /**
     * Draws the photo instead of the built-in `Image` (app: `DinamicImage` for
     * disk caching). Not called for element `imageUrl`s.
     */
    renderImage?: (params: EmptyProfileImageRenderParams) => ReactNode;
    /** Screen-reader text, e.g. the person's name. Omit when the name is shown next to it. */
    accessibilityLabel?: string;
    /** Test identifier of the frame. */
    testID?: string;
}
//# sourceMappingURL=EmptyProfileImage.types.d.ts.map