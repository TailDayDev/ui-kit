import type { ReactNode } from 'react';

import {
  isModalLayerPhaseActive,
  type ModalLayerPhase,
} from './modalLayerPhase';

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

const EMPTY_POSITION: IModalLayerPosition = { index: -1, isTop: false };

let layers: readonly IModalLayer[] = [];
let lastOrder = 0;
const listeners = new Set<Listener>();
const backHandlers = new Map<string, () => void>();

let hostFrame: IModalLayerFrame | null = null;
const frameListeners = new Set<Listener>();

const commit = (nextLayers: readonly IModalLayer[]) => {
  layers = nextLayers;
  listeners.forEach(listener => listener());
};

/** A new layer's place in the stack: above everything opened before it. */
export const createModalLayerOrder = (): number => {
  lastOrder += 1;
  return lastOrder;
};

/**
 * Adds the layer at its place: a new one on top, one that comes back (its
 * screen was frozen) under the layers opened since. A mounted layer stays.
 */
export const mountModalLayer = (
  id: string,
  phase: ModalLayerPhase,
  order: number,
): void => {
  if (layers.some(layer => layer.id === id)) {
    return;
  }

  const insertAt = layers.findIndex(layer => layer.order > order);
  const layer: IModalLayer = { id, order, phase, element: null };
  commit(
    insertAt === -1
      ? [...layers, layer]
      : [...layers.slice(0, insertAt), layer, ...layers.slice(insertAt)],
  );
};

/**
 * A layer that is opened again while it leaves: moves it above everything
 * opened meanwhile. Returns its new order, or null when it is not mounted.
 */
export const raiseModalLayerToTop = (id: string): number | null => {
  const layer = layers.find(candidate => candidate.id === id);
  if (!layer) {
    return null;
  }

  const order = createModalLayerOrder();
  commit([
    ...layers.filter(candidate => candidate.id !== id),
    { ...layer, order },
  ]);
  return order;
};

export const updateModalLayer = (
  id: string,
  patch: Partial<Omit<IModalLayer, 'id'>>,
): void => {
  const index = layers.findIndex(layer => layer.id === id);
  const layer = layers[index];
  if (!layer) {
    return;
  }

  // Keys of the patch object itself; `Object.keys` widens them to string.
  const isUnchanged = (Object.keys(patch) as (keyof typeof patch)[]).every(
    key => Object.is(layer[key], patch[key]),
  );
  // Nothing to tell the host or the position hooks.
  if (isUnchanged) {
    return;
  }

  const nextLayers = [...layers];
  nextLayers[index] = { ...layer, ...patch };
  commit(nextLayers);
};

export const unmountModalLayer = (id: string): void => {
  if (!layers.some(layer => layer.id === id)) {
    return;
  }

  commit(layers.filter(layer => layer.id !== id));
};

export const getModalLayers = (): readonly IModalLayer[] => layers;

export const subscribeModalLayers = (listener: Listener): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

/** Id of the topmost layer that is entering or open, if any. */
export const resolveTopModalLayerId = (
  stack: readonly IModalLayer[],
): string | null => {
  for (let index = stack.length - 1; index >= 0; index -= 1) {
    const layer = stack[index];
    if (layer && isModalLayerPhaseActive(layer.phase)) {
      return layer.id;
    }
  }

  return null;
};

/** True while any layer is entering or open: the screen below is covered. */
export const isAnyModalLayerActive = (stack: readonly IModalLayer[]): boolean =>
  resolveTopModalLayerId(stack) !== null;

export const resolveModalLayerPosition = (
  stack: readonly IModalLayer[],
  id: string,
): IModalLayerPosition => {
  const stackIndex = stack.findIndex(layer => layer.id === id);
  if (stackIndex === -1) {
    return EMPTY_POSITION;
  }

  const index = stack
    .slice(0, stackIndex)
    .filter(layer => isModalLayerPhaseActive(layer.phase)).length;

  return { index, isTop: resolveTopModalLayerId(stack) === id };
};

/** What Android Back does for a layer while it is the top one. */
export const setModalLayerBackHandler = (
  id: string,
  handler: (() => void) | null,
): void => {
  if (handler) {
    backHandlers.set(id, handler);
    return;
  }
  backHandlers.delete(id);
};

/**
 * Gives Android Back to the top layer. Returns true while any layer is open,
 * even one that ignores Back (locked while saving): an open modal blocks the
 * screen and navigation below it, like a native modal window.
 */
export const dispatchModalLayerBack = (): boolean => {
  const topLayerId = resolveTopModalLayerId(layers);
  if (topLayerId === null) {
    return false;
  }

  backHandlers.get(topLayerId)?.();
  return true;
};

/**
 * Drops every layer between tests. Silent on purpose: a tree a test left
 * mounted must not re-render outside `act` after the test has finished.
 */
export const resetModalLayersForTests = (): void => {
  layers = [];
  backHandlers.clear();
  hostFrame = null;
};

/** The area layers are drawn in, measured by ModalLayerRoot. */
export const setModalLayerFrame = (frame: IModalLayerFrame): void => {
  if (hostFrame?.width === frame.width && hostFrame?.height === frame.height) {
    return;
  }
  hostFrame = frame;
  frameListeners.forEach(listener => listener());
};

export const getModalLayerFrame = (): IModalLayerFrame | null => hostFrame;

export const subscribeModalLayerFrame = (listener: Listener): (() => void) => {
  frameListeners.add(listener);

  return () => {
    frameListeners.delete(listener);
  };
};
