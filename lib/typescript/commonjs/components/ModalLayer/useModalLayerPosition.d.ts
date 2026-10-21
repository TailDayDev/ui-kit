import { type IModalLayerPosition } from './modalLayerStore';
/**
 * Position of a layer in the stack; re-renders only when it changes. A modal
 * whose layer is not mounted (`isMounted` false) does not subscribe, so the
 * many closed modals on a screen are not woken by every stack change.
 */
export declare const useModalLayerPosition: (id: string, isMounted?: boolean) => IModalLayerPosition;
//# sourceMappingURL=useModalLayerPosition.d.ts.map