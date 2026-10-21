import type { ModalLayerTestRootProps } from './ModalLayer.types.js';
/**
 * The modal layer root for tests: what ModalLayerRoot gives the app, minus
 * the background wrapper, so a test tree without open modals renders exactly
 * as before. Modals open and close at once (there is no native layout or
 * animation frame in tests); a suite that tests the transitions provides
 * `isReducedMotion: false` itself. Use it as the `wrapper` of a render (or
 * wrap every test tree with it in jest setup).
 */
export declare const ModalLayerTestRoot: ({ children }: ModalLayerTestRootProps) => import("react").JSX.Element;
//# sourceMappingURL=ModalLayerTestRoot.d.ts.map