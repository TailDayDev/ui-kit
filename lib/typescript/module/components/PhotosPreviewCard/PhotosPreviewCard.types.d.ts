import type { ReactNode } from 'react';
/** A photo entry; entries without a `fileUrl` are skipped. */
export type PhotosPreviewCardPhoto = {
    fileUrl?: string | null;
    isCover?: boolean;
} | null | undefined;
/** Values `PhotosPreviewCard` hands to `renderImage`. */
export interface PhotosPreviewCardRenderParams {
    /** Photo URL (never empty). */
    uri: string;
    /** Square side in points: 144 for the main photo, 120 for the side ones. */
    size: number;
}
/** Card with a fanned stack of up to three photos, or an empty text. */
export interface PhotosPreviewCardProps {
    /** Card title. */
    title: string;
    /** Photos. The cover (or the first one) is in front; two more fan out behind it. */
    photos?: PhotosPreviewCardPhoto[];
    /** Makes the card tappable. */
    onPress?: () => void;
    /** Draws the card shadow. Defaults to `true`. */
    withShadow?: boolean;
    /** Text next to the title, e.g. "3 photos". */
    photoCountText: string;
    /** Text shown when there are no photos. */
    emptyText: string;
    /** With exactly two photos, places the second one beside the main one. */
    useCompactTwoPhotoLayout?: boolean;
    /** Draws a photo instead of the built-in `Image` (app: `DinamicImage`). */
    renderImage?: (params: PhotosPreviewCardRenderParams) => ReactNode;
    /** Screen-reader label of the tappable card. */
    accessibilityLabel?: string;
}
//# sourceMappingURL=PhotosPreviewCard.types.d.ts.map