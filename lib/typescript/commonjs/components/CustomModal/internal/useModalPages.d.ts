import { Animated } from 'react-native';
import { type ModalLayerPhase } from '../../ModalLayer';
interface IModalPagesParams {
    phase: ModalLayerPhase;
    defaultScreenIndex: number;
    pageWidth: number;
}
/**
 * Pages of a multi-page modal: the active index, the row offset that slides
 * it into view and the title fade on every page change. Every new opening
 * starts on `defaultScreenIndex`; a reopen while leaving keeps the page.
 */
export declare const useModalPages: ({ phase, defaultScreenIndex, pageWidth, }: IModalPagesParams) => {
    screenIndex: number;
    slideAnim: Animated.Value;
    slideTo: (index: number) => void;
    titleOpacity: Animated.Value;
};
export {};
//# sourceMappingURL=useModalPages.d.ts.map