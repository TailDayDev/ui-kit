import { Animated, type LayoutChangeEvent } from 'react-native';
import { type ModalLayerPhase } from '../../ModalLayer';
interface IModalLayerLifecycleParams {
    visible: boolean;
    onClose: () => void;
    onDismissed?: () => void;
    screenHeight: number;
    transitionDurationMs?: number;
    transitionStyle?: 'fade' | 'slide';
}
/**
 * Lifecycle of a CustomModal drawn by the root ModalLayerHost.
 *
 * The modal is fully controlled: it is shown while `visible` is true and
 * hides only when `visible` turns false. X, the backdrop, a swipe, Android
 * Back and `ref.close()` only ask the owner to close through `onClose`; an
 * owner that keeps `visible` (a save in progress, a confirmation shown on
 * top) keeps the modal open, and a sheet moved by the swipe goes back.
 *
 * Phases change only on events: a `visible` edge, the first layout of the
 * sheet and the completion callback of its own animation. An animation that
 * was superseded is ignored by id, so no timer is needed to recover from a
 * missing callback.
 */
export declare const useModalLayerLifecycle: ({ visible, onClose, onDismissed, screenHeight, transitionDurationMs, transitionStyle, }: IModalLayerLifecycleParams) => {
    animateDetachedExit: (onLayerRemoved: () => void) => void;
    backdropOpacity: Animated.Value;
    dismissForTeardown: () => void;
    forceClose: () => void;
    getPhase: () => ModalLayerPhase;
    handleClose: () => void;
    handleModalLayout: (event: LayoutChangeEvent) => void;
    isClosing: boolean;
    isRendered: boolean;
    phase: ModalLayerPhase;
    reattach: () => void;
    translateY: Animated.Value;
};
export {};
//# sourceMappingURL=useModalLayerLifecycle.d.ts.map