"use strict";

import { isModalLayerPhaseActive } from "./modalLayerPhase.js";
const EMPTY_POSITION = {
  index: -1,
  isTop: false
};
let layers = [];
let lastOrder = 0;
const listeners = new Set();
const backHandlers = new Map();
let hostFrame = null;
const frameListeners = new Set();
const commit = nextLayers => {
  layers = nextLayers;
  listeners.forEach(listener => listener());
};

/** A new layer's place in the stack: above everything opened before it. */
export const createModalLayerOrder = () => {
  lastOrder += 1;
  return lastOrder;
};

/**
 * Adds the layer at its place: a new one on top, one that comes back (its
 * screen was frozen) under the layers opened since. A mounted layer stays.
 */
export const mountModalLayer = (id, phase, order) => {
  if (layers.some(layer => layer.id === id)) {
    return;
  }
  const insertAt = layers.findIndex(layer => layer.order > order);
  const layer = {
    id,
    order,
    phase,
    element: null
  };
  commit(insertAt === -1 ? [...layers, layer] : [...layers.slice(0, insertAt), layer, ...layers.slice(insertAt)]);
};

/**
 * A layer that is opened again while it leaves: moves it above everything
 * opened meanwhile. Returns its new order, or null when it is not mounted.
 */
export const raiseModalLayerToTop = id => {
  const layer = layers.find(candidate => candidate.id === id);
  if (!layer) {
    return null;
  }
  const order = createModalLayerOrder();
  commit([...layers.filter(candidate => candidate.id !== id), {
    ...layer,
    order
  }]);
  return order;
};
export const updateModalLayer = (id, patch) => {
  const index = layers.findIndex(layer => layer.id === id);
  const layer = layers[index];
  if (!layer) {
    return;
  }

  // Keys of the patch object itself; `Object.keys` widens them to string.
  const isUnchanged = Object.keys(patch).every(key => Object.is(layer[key], patch[key]));
  // Nothing to tell the host or the position hooks.
  if (isUnchanged) {
    return;
  }
  const nextLayers = [...layers];
  nextLayers[index] = {
    ...layer,
    ...patch
  };
  commit(nextLayers);
};
export const unmountModalLayer = id => {
  if (!layers.some(layer => layer.id === id)) {
    return;
  }
  commit(layers.filter(layer => layer.id !== id));
};
export const getModalLayers = () => layers;
export const subscribeModalLayers = listener => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Id of the topmost layer that is entering or open, if any. */
export const resolveTopModalLayerId = stack => {
  for (let index = stack.length - 1; index >= 0; index -= 1) {
    const layer = stack[index];
    if (layer && isModalLayerPhaseActive(layer.phase)) {
      return layer.id;
    }
  }
  return null;
};

/** True while any layer is entering or open: the screen below is covered. */
export const isAnyModalLayerActive = stack => resolveTopModalLayerId(stack) !== null;
export const resolveModalLayerPosition = (stack, id) => {
  const stackIndex = stack.findIndex(layer => layer.id === id);
  if (stackIndex === -1) {
    return EMPTY_POSITION;
  }
  const index = stack.slice(0, stackIndex).filter(layer => isModalLayerPhaseActive(layer.phase)).length;
  return {
    index,
    isTop: resolveTopModalLayerId(stack) === id
  };
};

/** What Android Back does for a layer while it is the top one. */
export const setModalLayerBackHandler = (id, handler) => {
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
export const dispatchModalLayerBack = () => {
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
export const resetModalLayersForTests = () => {
  layers = [];
  backHandlers.clear();
  hostFrame = null;
};

/** The area layers are drawn in, measured by ModalLayerRoot. */
export const setModalLayerFrame = frame => {
  if (hostFrame?.width === frame.width && hostFrame?.height === frame.height) {
    return;
  }
  hostFrame = frame;
  frameListeners.forEach(listener => listener());
};
export const getModalLayerFrame = () => hostFrame;
export const subscribeModalLayerFrame = listener => {
  frameListeners.add(listener);
  return () => {
    frameListeners.delete(listener);
  };
};
//# sourceMappingURL=modalLayerStore.js.map