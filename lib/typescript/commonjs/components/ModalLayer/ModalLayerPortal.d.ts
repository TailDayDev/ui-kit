import type { ModalLayerPortalProps } from './ModalLayer.types';
/**
 * Renders `children` as a layer of the root ModalLayerHost while keeping every
 * context of the declaration site (screen contexts, navigation, theme…).
 * Contexts that describe the declaration site's own layout — being inside a
 * list, a scroll view or a <Text> — are reset, exactly as RN's <Modal> does.
 *
 * Render it only while the modal is on screen: the bridge subscribes to every
 * context above it, which closed modals must not pay for.
 */
export declare const ModalLayerPortal: ({ id, phase, children, getPhase, onAttach, onDetach, onContentError, }: ModalLayerPortalProps) => null;
//# sourceMappingURL=ModalLayerPortal.d.ts.map