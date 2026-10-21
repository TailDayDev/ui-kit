"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateModalLayer = exports.unmountModalLayer = exports.subscribeModalLayers = exports.subscribeModalLayerFrame = exports.setModalLayerFrame = exports.setModalLayerBackHandler = exports.resolveTopModalLayerId = exports.resolveModalLayerPosition = exports.resetModalLayersForTests = exports.raiseModalLayerToTop = exports.mountModalLayer = exports.isAnyModalLayerActive = exports.getModalLayers = exports.getModalLayerFrame = exports.dispatchModalLayerBack = exports.createModalLayerOrder = void 0;
var _modalLayerPhase = require("./modalLayerPhase.js");
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
const createModalLayerOrder = () => {
  lastOrder += 1;
  return lastOrder;
};

/**
 * Adds the layer at its place: a new one on top, one that comes back (its
 * screen was frozen) under the layers opened since. A mounted layer stays.
 */
exports.createModalLayerOrder = createModalLayerOrder;
const mountModalLayer = (id, phase, order) => {
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
exports.mountModalLayer = mountModalLayer;
const raiseModalLayerToTop = id => {
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
exports.raiseModalLayerToTop = raiseModalLayerToTop;
const updateModalLayer = (id, patch) => {
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
exports.updateModalLayer = updateModalLayer;
const unmountModalLayer = id => {
  if (!layers.some(layer => layer.id === id)) {
    return;
  }
  commit(layers.filter(layer => layer.id !== id));
};
exports.unmountModalLayer = unmountModalLayer;
const getModalLayers = () => layers;
exports.getModalLayers = getModalLayers;
const subscribeModalLayers = listener => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Id of the topmost layer that is entering or open, if any. */
exports.subscribeModalLayers = subscribeModalLayers;
const resolveTopModalLayerId = stack => {
  for (let index = stack.length - 1; index >= 0; index -= 1) {
    const layer = stack[index];
    if (layer && (0, _modalLayerPhase.isModalLayerPhaseActive)(layer.phase)) {
      return layer.id;
    }
  }
  return null;
};

/** True while any layer is entering or open: the screen below is covered. */
exports.resolveTopModalLayerId = resolveTopModalLayerId;
const isAnyModalLayerActive = stack => resolveTopModalLayerId(stack) !== null;
exports.isAnyModalLayerActive = isAnyModalLayerActive;
const resolveModalLayerPosition = (stack, id) => {
  const stackIndex = stack.findIndex(layer => layer.id === id);
  if (stackIndex === -1) {
    return EMPTY_POSITION;
  }
  const index = stack.slice(0, stackIndex).filter(layer => (0, _modalLayerPhase.isModalLayerPhaseActive)(layer.phase)).length;
  return {
    index,
    isTop: resolveTopModalLayerId(stack) === id
  };
};

/** What Android Back does for a layer while it is the top one. */
exports.resolveModalLayerPosition = resolveModalLayerPosition;
const setModalLayerBackHandler = (id, handler) => {
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
exports.setModalLayerBackHandler = setModalLayerBackHandler;
const dispatchModalLayerBack = () => {
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
exports.dispatchModalLayerBack = dispatchModalLayerBack;
const resetModalLayersForTests = () => {
  layers = [];
  backHandlers.clear();
  hostFrame = null;
};

/** The area layers are drawn in, measured by ModalLayerRoot. */
exports.resetModalLayersForTests = resetModalLayersForTests;
const setModalLayerFrame = frame => {
  if (hostFrame?.width === frame.width && hostFrame?.height === frame.height) {
    return;
  }
  hostFrame = frame;
  frameListeners.forEach(listener => listener());
};
exports.setModalLayerFrame = setModalLayerFrame;
const getModalLayerFrame = () => hostFrame;
exports.getModalLayerFrame = getModalLayerFrame;
const subscribeModalLayerFrame = listener => {
  frameListeners.add(listener);
  return () => {
    frameListeners.delete(listener);
  };
};
exports.subscribeModalLayerFrame = subscribeModalLayerFrame;
//# sourceMappingURL=modalLayerStore.js.map