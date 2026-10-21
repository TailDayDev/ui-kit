import type { ReactNode } from 'react';
import { type ModalLayerPhase } from './modalLayerPhase.js';
export interface IModalLayer {
    id: string;
    /** When the layer first opened: the stack is sorted by it. */
    order: number;
    phase: ModalLayerPhase;
    element: ReactNode;
    /** Called when the layer's content throws; the owner should close it. */
    onContentError?: () => void;
}
export interface IModalLayerPosition {
    /**
     * Layers entering or open below this one (bottom = 0), so a sheet does not
     * shift when a layer below finishes leaving. -1 when not mounted.
     */
    index: number;
    /** The topmost layer that is not leaving: the only one taking touches. */
    isTop: boolean;
}
export interface IModalLayerFrame {
    width: number;
    height: number;
}
type Listener = () => void;
/** A new layer's place in the stack: above everything opened before it. */
export declare const createModalLayerOrder: () => number;
/**
 * Adds the layer at its place: a new one on top, one that comes back (its
 * screen was frozen) under the layers opened since. A mounted layer stays.
 */
export declare const mountModalLayer: (id: string, phase: ModalLayerPhase, order: number) => void;
/**
 * A layer that is opened again while it leaves: moves it above everything
 * opened meanwhile. Returns its new order, or null when it is not mounted.
 */
export declare const raiseModalLayerToTop: (id: string) => number | null;
export declare const updateModalLayer: (id: string, patch: Partial<Omit<IModalLayer, "id">>) => void;
export declare const unmountModalLayer: (id: string) => void;
export declare const getModalLayers: () => readonly IModalLayer[];
export declare const subscribeModalLayers: (listener: Listener) => (() => void);
/** Id of the topmost layer that is entering or open, if any. */
export declare const resolveTopModalLayerId: (stack: readonly IModalLayer[]) => string | null;
/** True while any layer is entering or open: the screen below is covered. */
export declare const isAnyModalLayerActive: (stack: readonly IModalLayer[]) => boolean;
export declare const resolveModalLayerPosition: (stack: readonly IModalLayer[], id: string) => IModalLayerPosition;
/** What Android Back does for a layer while it is the top one. */
export declare const setModalLayerBackHandler: (id: string, handler: (() => void) | null) => void;
/**
 * Gives Android Back to the top layer. Returns true while any layer is open,
 * even one that ignores Back (locked while saving): an open modal blocks the
 * screen and navigation below it, like a native modal window.
 */
export declare const dispatchModalLayerBack: () => boolean;
/**
 * Drops every layer between tests. Silent on purpose: a tree a test left
 * mounted must not re-render outside `act` after the test has finished.
 */
export declare const resetModalLayersForTests: () => void;
/** The area layers are drawn in, measured by ModalLayerRoot. */
export declare const setModalLayerFrame: (frame: IModalLayerFrame) => void;
export declare const getModalLayerFrame: () => IModalLayerFrame | null;
export declare const subscribeModalLayerFrame: (listener: Listener) => (() => void);
export {};
//# sourceMappingURL=modalLayerStore.d.ts.map