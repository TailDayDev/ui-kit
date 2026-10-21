import type { ReactNode } from 'react';
import { Animated } from 'react-native';
import type { CustomModalStyles } from './CustomModal.styles.js';
interface IModalHeaderProps {
    styles: CustomModalStyles;
    title?: ReactNode;
    /** Fades the title in on every page change. */
    titleOpacity: Animated.Value;
    /** Shows the back button when set. */
    onBack?: () => void;
    onClose: () => void;
    isDisabled: boolean;
    closeTestID: string;
    closeAccessibilityLabel: string;
}
/** The default header: back (pages), title, close. */
export declare const ModalHeader: ({ styles, title, titleOpacity, onBack, onClose, isDisabled, closeTestID, closeAccessibilityLabel, }: IModalHeaderProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=ModalHeader.d.ts.map