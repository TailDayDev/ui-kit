import type { ReactNode } from 'react';
/** Screen header with a centered title, a round back button and an optional right action. */
export interface CenteredScreenHeaderProps {
    /** Centered title (`headline/bold`, one line). Also the back button's screen-reader label. */
    title: string;
    /** Called by the back button. The app passes its navigation `goBack`. */
    goBack: () => void;
    /** Test identifier of the back button. */
    backButtonTestID?: string;
    /** Element at the right edge (e.g. an icon button). */
    rightAction?: ReactNode;
    /** One-line text under the title (12pt, secondary). */
    subtitle?: string;
    /** Test identifier of the header. */
    testID?: string;
}
//# sourceMappingURL=CenteredScreenHeader.types.d.ts.map