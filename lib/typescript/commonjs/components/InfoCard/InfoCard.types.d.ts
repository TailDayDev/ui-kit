import type { ReactNode } from 'react';
/** Row with a leading illustration, a bold title and an optional caption. */
export interface InfoCardProps {
    /**
     * Leading illustration, rendered as is. The app passes a 40pt image tinted
     * `text.secondary` (formerly built inside from an image URL).
     */
    icon: ReactNode;
    /** Bold title (`body/bold`). */
    title: string;
    /** Caption under the title (`caption/regular`). Hidden when empty. */
    description: string;
}
//# sourceMappingURL=InfoCard.types.d.ts.map