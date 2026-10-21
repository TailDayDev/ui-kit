import {
  createModalLayerOrder,
  dispatchModalLayerBack,
  getModalLayerFrame,
  getModalLayers,
  mountModalLayer as mountWithOrder,
  raiseModalLayerToTop,
  resetModalLayersForTests,
  resolveModalLayerPosition,
  resolveTopModalLayerId,
  setModalLayerBackHandler,
  setModalLayerFrame,
  subscribeModalLayerFrame,
  subscribeModalLayers,
  unmountModalLayer,
  updateModalLayer,
} from './modalLayerStore';

const orders = new Map<string, number>();
/** Mounts with the order the id got on its first mount, like a portal. */
const mountModalLayer = (
  id: string,
  phase: Parameters<typeof mountWithOrder>[1],
) => {
  const order = orders.get(id) ?? createModalLayerOrder();
  orders.set(id, order);
  mountWithOrder(id, phase, order);
};

describe('modalLayerStore', () => {
  afterEach(() => {
    resetModalLayersForTests();
    orders.clear();
  });

  it('stacks layers in mount order and keeps the place of a mounted one', () => {
    mountModalLayer('a', 'entering');
    mountModalLayer('b', 'entering');
    mountModalLayer('a', 'entering');

    expect(getModalLayers().map(layer => layer.id)).toEqual(['a', 'b']);
  });

  it('notifies subscribers with a new snapshot on every change', () => {
    const listener = jest.fn();
    const unsubscribe = subscribeModalLayers(listener);

    mountModalLayer('a', 'entering');
    const mounted = getModalLayers();
    updateModalLayer('a', { phase: 'open', element: null });

    expect(listener).toHaveBeenCalledTimes(2);
    expect(getModalLayers()).not.toBe(mounted);

    unsubscribe();
    unmountModalLayer('a');
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('gives touches to the topmost layer that is not leaving', () => {
    mountModalLayer('a', 'open');
    mountModalLayer('b', 'open');
    mountModalLayer('c', 'open');

    expect(resolveTopModalLayerId(getModalLayers())).toBe('c');

    updateModalLayer('c', { phase: 'exiting', element: null });
    expect(resolveTopModalLayerId(getModalLayers())).toBe('b');
    expect(resolveModalLayerPosition(getModalLayers(), 'b')).toEqual({
      index: 1,
      isTop: true,
    });
    expect(resolveModalLayerPosition(getModalLayers(), 'c')).toEqual({
      index: 2,
      isTop: false,
    });
  });

  it('lets a lower layer take touches at once when the middle one leaves', () => {
    mountModalLayer('a', 'open');
    mountModalLayer('b', 'exiting');
    mountModalLayer('c', 'exiting');

    expect(resolveTopModalLayerId(getModalLayers())).toBe('a');
  });

  it('has no top layer when every layer is leaving', () => {
    mountModalLayer('a', 'exiting');

    expect(resolveTopModalLayerId(getModalLayers())).toBeNull();
    expect(resolveModalLayerPosition(getModalLayers(), 'missing')).toEqual({
      index: -1,
      isTop: false,
    });
  });

  it('puts a layer that comes back under the layers opened since', () => {
    mountModalLayer('screen-modal', 'open');
    unmountModalLayer('screen-modal');
    mountModalLayer('alert', 'open');

    mountModalLayer('screen-modal', 'open');

    expect(getModalLayers().map(layer => layer.id)).toEqual([
      'screen-modal',
      'alert',
    ]);
    expect(resolveTopModalLayerId(getModalLayers())).toBe('alert');
  });

  it('raises a layer opened again while leaving above newer layers', () => {
    mountModalLayer('first', 'exiting');
    mountModalLayer('second', 'open');

    const order = raiseModalLayerToTop('first');

    expect(getModalLayers().map(layer => layer.id)).toEqual([
      'second',
      'first',
    ]);
    expect(getModalLayers()[1]?.order).toBe(order);
    expect(raiseModalLayerToTop('missing')).toBeNull();
  });

  it('does not count leaving layers below in the position index', () => {
    mountModalLayer('check-out', 'exiting');
    mountModalLayer('check-in', 'entering');

    // The sheet keeps its offset when the layer below finishes leaving.
    expect(resolveModalLayerPosition(getModalLayers(), 'check-in')).toEqual({
      index: 0,
      isTop: true,
    });
  });

  it('gives Android back to the top layer and keeps it from the screen', () => {
    const lowerBack = jest.fn();
    const topBack = jest.fn();
    mountModalLayer('lower', 'open');
    mountModalLayer('top', 'open');
    setModalLayerBackHandler('lower', lowerBack);
    setModalLayerBackHandler('top', topBack);

    expect(dispatchModalLayerBack()).toBe(true);
    expect(topBack).toHaveBeenCalledTimes(1);
    expect(lowerBack).not.toHaveBeenCalled();
  });

  it('swallows back for a top layer without a handler (locked)', () => {
    mountModalLayer('saving', 'open');

    expect(dispatchModalLayerBack()).toBe(true);
  });

  it('lets back through when no layer is open', () => {
    mountModalLayer('leaving', 'exiting');

    expect(dispatchModalLayerBack()).toBe(false);
  });

  it('does not notify for an update that changes nothing', () => {
    const element = null;
    mountModalLayer('a', 'open');
    updateModalLayer('a', { phase: 'open', element });
    const listener = jest.fn();
    const unsubscribe = subscribeModalLayers(listener);

    updateModalLayer('a', { phase: 'open', element });
    expect(listener).not.toHaveBeenCalled();

    updateModalLayer('a', { phase: 'exiting' });
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });

  it('keeps the host frame and notifies only when it changes', () => {
    const listener = jest.fn();
    const unsubscribe = subscribeModalLayerFrame(listener);

    setModalLayerFrame({ width: 400, height: 800 });
    setModalLayerFrame({ width: 400, height: 800 });
    expect(getModalLayerFrame()).toEqual({ width: 400, height: 800 });
    expect(listener).toHaveBeenCalledTimes(1);

    resetModalLayersForTests();
    expect(getModalLayerFrame()).toBeNull();
    unsubscribe();
  });
});
