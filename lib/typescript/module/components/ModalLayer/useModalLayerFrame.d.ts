import { type IModalLayerFrame } from './modalLayerStore.js';
/**
 * Size of the area modal layers are drawn in. A native modal window covered
 * the whole screen; the host covers the app's root view, which on Android
 * can exclude the status and navigation bars. Falls back to the window
 * before the root has been measured (and in tests).
 */
export declare const useModalLayerFrame: () => IModalLayerFrame;
//# sourceMappingURL=useModalLayerFrame.d.ts.map