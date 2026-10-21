import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
/** Upload state of a photo: `'loaded'` shows it, `'error'` shows `errorText`, anything else a spinner. */
export interface LocalPhotoInfo {
    description?: string | null;
    fileUrl?: string | null;
    id?: number | string | null;
    isCover?: boolean | null;
    status?: string | null;
}
/** Values `PhotoUploadPreview` hands to `renderImage`. */
export interface PhotoUploadPreviewRenderParams {
    /** Photo URL to show (the previous one while a new remote photo is prefetched). */
    uri?: string;
    /** Square side in points. */
    size: number;
    /** Stable cache key; `undefined` without a `fileUrl`. */
    photoCacheKey?: string;
}
/** Square photo tile with upload overlay, cover badge and a settings button. */
export interface PhotoUploadPreviewProps {
    /** The photo and its upload status (missing status = `'loaded'`). */
    photo: Pick<LocalPhotoInfo, 'status' | 'fileUrl' | 'id' | 'description' | 'isCover'>;
    /** Tile side in points. */
    size: number;
    /** Text shown on the overlay when `status` is `'error'`. */
    errorText?: string;
    /** Extra style of the tile. */
    containerStyle?: StyleProp<ViewStyle>;
    /** Extra style of the loading / error overlay. */
    placeholderStyle?: StyleProp<ViewStyle>;
    /**
     * Cache key passed to `renderImage` / `prefetchImage` (app default:
     * `photo:<id>:<stable remote identity>`, computed by the wrapper).
     */
    photoCacheKey?: string;
    /** Tap on a loaded photo. Also enables the settings button. */
    onImagePress?: () => void;
    /** Tap on the settings (three dots) button. Falls back to `onImagePress`. */
    onSettingsPress?: () => void;
    /** Cover badge text (app: `cover_photo`). The badge shows for a loaded cover photo when set. */
    coverLabel?: string;
    /** Screen-reader label of the settings button. */
    settingsAccessibilityLabel?: string;
    /** Draws the photo instead of the built-in `Image` (app: `DinamicImage`). */
    renderImage?: (params: PhotoUploadPreviewRenderParams) => ReactNode;
    /**
     * Warms the cache for a new remote URL (app: `resolveCachedPhotoUri`). While
     * it runs, the previous photo stays on screen; without it the URL swaps at once.
     */
    prefetchImage?: (uri: string, cacheKey?: string) => Promise<unknown>;
    /** Test identifier of the tile. */
    testID?: string;
}
//# sourceMappingURL=PhotoUploadPreview.types.d.ts.map