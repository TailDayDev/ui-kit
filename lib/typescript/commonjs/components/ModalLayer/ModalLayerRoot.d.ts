import type { ModalLayerRootProps } from './ModalLayer.types';
/**
 * Everything modal layers need, in one place for the app and Storybook:
 * the fiber root the context bridge reads, the content under the layers and
 * the host above it. Mount it once, outside any loading gate, so a modal
 * shown at any moment has a host.
 *
 * The gesture root covers the layers too: they sit outside the navigator,
 * whose stack brings its own root, so gesture-handler gestures and scroll
 * views inside modal content would otherwise get no native root.
 */
export declare const ModalLayerRoot: ({ children, overlay }: ModalLayerRootProps) => import("react").JSX.Element;
//# sourceMappingURL=ModalLayerRoot.d.ts.map