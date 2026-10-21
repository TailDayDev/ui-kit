import type { ReactNode } from 'react';
/** One onboarding / intro step: image on top, stage, title and description below. */
export interface InfoStepProps {
    /** Small heading above the title (`body/bold`), e.g. "Step 1". */
    stage: string;
    /** Step title (`largeTitle/semibold`). */
    title: string;
    /** Step text (`caption/regular`, secondary). */
    description: string;
    /**
     * Draws the step image, centered in the space left above the texts.
     * Receives the square size (points) the image may take; render it with
     * `resizeMode="contain"`. Replaces the app `imageUrl` (the kit does not load images).
     */
    renderImage: (size: number) => ReactNode;
}
//# sourceMappingURL=InfoStep.types.d.ts.map