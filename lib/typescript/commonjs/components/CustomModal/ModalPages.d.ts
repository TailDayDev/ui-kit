import { type ReactNode, type Ref } from 'react';
import { Animated, ScrollView } from 'react-native';
import { type CustomModalStyles } from './CustomModal.styles';
interface IModalPagesProps {
    pages: ReactNode[];
    pageWidth: number;
    /** Horizontal offset of the page row (page index × width). */
    slideAnim: Animated.Value;
    activeIndex: number;
    styles: CustomModalStyles;
    pageHost: 'scroll-view' | 'view';
    isAutoHeight: boolean;
    contentMaxHeight: number;
    isScrollEnabled: boolean;
    /** Given to the active page's scroll view. */
    scrollRef?: Ref<ScrollView>;
    isKeyboardDismissInteractive: boolean;
    scrollContentPaddingBottom: number;
    scrollContentInsetBottom: number;
}
/** The pages of a modal: every direct child of `children` is one. */
export declare const toModalPages: (children: ReactNode) => ReactNode[];
/** The modal's pages side by side; the active one is slid into view. */
export declare const ModalPages: ({ pages, pageWidth, slideAnim, activeIndex, styles, pageHost, isAutoHeight, contentMaxHeight, isScrollEnabled, scrollRef, isKeyboardDismissInteractive, scrollContentPaddingBottom, scrollContentInsetBottom, }: IModalPagesProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=ModalPages.d.ts.map