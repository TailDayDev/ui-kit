import type { ReactNode } from 'react';
/** Floating card with an error icon, texts, a close button and optional actions. */
export interface ErrorCardProps {
    /** Called when the close (×) button is pressed. */
    onCancel: () => void;
    /** Test identifier of the close button. */
    closeButtonTestID?: string;
    /** Test identifier of the card container. */
    testID?: string;
    /** Test identifier of the error text. */
    errorTextTestID?: string;
    /** Bold title (`body/bold`). Hidden when empty. */
    title?: string;
    /** Secondary text (`smallCaption/regular`). Hidden when empty. */
    description: string;
    /** Error details in red upper case (`smallCaption/regular`). Hidden when empty. */
    errorText: string;
    /** Extra content under the header, e.g. action buttons. */
    children?: ReactNode;
    /** Gap between the card and each screen edge. The card is `screen width − 2 × inset` wide. Defaults to 40. */
    horizontalInset?: number;
    /** Size of the error icon. Defaults to 36. */
    iconSize?: number;
    /** Screen-reader label of the close button. The app passed none; set it from translations. */
    closeAccessibilityLabel?: string;
}
//# sourceMappingURL=ErrorCard.types.d.ts.map