import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
/** Body of a confirmation sheet (Figma `ConfirmationModalContent`): picture, question, explanation. */
export interface ConfirmationModalContentProps {
    /** Question (`title/bold`, centered). Figma TEXT `title`. */
    title: string;
    /** Explanation under the title (`caption/regular`, secondary, centered). Figma TEXT `description`. */
    description?: string;
    /** Shows `description`. Figma BOOLEAN `hasDescription`. Defaults to `true`. */
    hasDescription?: boolean;
    /**
     * Ready picture element (Figma `Картинка`, 100×100, radius 8), e.g. an
     * `<Image>` of the trash icon. The kit never loads images. Omitted → no
     * picture frame.
     */
    illustration?: ReactNode;
    /** Outer style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the container. */
    testID?: string;
}
//# sourceMappingURL=ConfirmationModalContent.types.d.ts.map