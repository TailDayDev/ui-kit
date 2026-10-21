import {
  Suspense,
  createContext,
  createRef,
  useContext,
  useState,
  type RefObject,
} from 'react';
import {
  AccessibilityInfo,
  BackHandler,
  Keyboard,
  Text,
  View,
} from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';

import {
  addHardwareBackPressListener,
  getModalLayers,
  ModalLayerBackground,
  ModalLayerMotionContext,
  ModalLayerTestRoot,
  resetModalLayersForTests,
} from '../ModalLayer';
import { findHostViews } from './__fixtures__/modalTestUtils';
import { CustomModal } from './CustomModal';
import type { CustomModalHandle } from './CustomModal.types';

const SHEET_HEIGHT = 400;
const ScreenContext = createContext('missing');
const NEVER_RESOLVING = new Promise<never>(() => undefined);
const ANIMATED_MOTION = { isReducedMotion: false };

interface IModalSpec {
  id: string;
  /** The owner keeps `visible` on a close request (e.g. saving). */
  isCloseRefused?: boolean;
  /** The `{isOpen && <CustomModal visible />}` pattern. */
  isMountedOnlyWhenOpen?: boolean;
  withBackdrop?: boolean;
  closeOnSwipeDown?: boolean;
}

interface IModalCallbacks {
  onClose: jest.Mock;
  onDismissed: jest.Mock;
}

type BackListener = Parameters<typeof BackHandler.addEventListener>[1];
type MeasureInWindow = (
  callback: (x: number, y: number, width: number, height: number) => void,
) => void;

const throwingContentIds = new Set<string>();

const ScreenValue = () => <Text>{useContext(ScreenContext)}</Text>;

const ModalContent = ({ id }: { id: string }) => {
  if (throwingContentIds.has(id)) {
    throw new Error(`${id} content failed`);
  }

  return (
    <View testID={`${id}.content`}>
      <ScreenValue />
    </View>
  );
};

/** Suspends its boundary like react-freeze does for an unfocused screen. */
const FreezeGate = ({ isFrozen }: { isFrozen: boolean }) => {
  if (isFrozen) {
    throw NEVER_RESOLVING;
  }

  return null;
};

const renderStack = async (specs: IModalSpec[]) => {
  const setters = new Map<string, (isVisible: boolean) => void>();
  /** The `visible` each owner rendered last. */
  const renderedVisible = new Map<string, boolean>();
  const refs = new Map<string, RefObject<CustomModalHandle | null>>(
    specs.map(spec => [spec.id, createRef<CustomModalHandle>()]),
  );
  const callbacks = new Map<string, IModalCallbacks>(
    specs.map(spec => [
      spec.id,
      { onClose: jest.fn(), onDismissed: jest.fn() },
    ]),
  );
  let setIsFrozen: (isFrozen: boolean) => void = () => undefined;
  let setUnmountedIds: (ids: string[]) => void = () => undefined;

  const getCallbacks = (id: string): IModalCallbacks => {
    const modalCallbacks = callbacks.get(id);
    if (!modalCallbacks) {
      throw new Error(`No modal "${id}"`);
    }
    return modalCallbacks;
  };

  const Modal = ({ spec }: { spec: IModalSpec }) => {
    const [isVisible, setIsVisible] = useState(false);
    setters.set(spec.id, setIsVisible);
    renderedVisible.set(spec.id, isVisible);
    const { onClose, onDismissed } = getCallbacks(spec.id);

    const modal = (
      <CustomModal
        closeAccessibilityLabel="Close"
        closeButtonTestID={`${spec.id}.close`}
        closeOnSwipeDown={spec.closeOnSwipeDown}
        onClose={() => {
          onClose();
          if (!spec.isCloseRefused) {
            setIsVisible(false);
          }
        }}
        onDismissed={onDismissed}
        ref={refs.get(spec.id)}
        title={spec.id}
        visible={isVisible}
        withBackdrop={spec.withBackdrop}
      >
        <ModalContent id={spec.id} />
      </CustomModal>
    );

    if (spec.isMountedOnlyWhenOpen) {
      return isVisible ? modal : null;
    }

    return modal;
  };

  const Harness = () => {
    const [isFrozen, updateIsFrozen] = useState(false);
    const [unmountedIds, updateUnmountedIds] = useState<string[]>([]);
    setIsFrozen = updateIsFrozen;
    setUnmountedIds = updateUnmountedIds;

    // The test root opens modals at once; this suite tests the real
    // transitions, so it turns animations back on.
    return (
      <ModalLayerMotionContext.Provider value={ANIMATED_MOTION}>
        <ModalLayerBackground>
          <ScreenContext.Provider value="screen-value">
            <Suspense fallback={null}>
              <FreezeGate isFrozen={isFrozen} />
              {specs
                .filter(spec => !unmountedIds.includes(spec.id))
                .map(spec => (
                  <Modal key={spec.id} spec={spec} />
                ))}
            </Suspense>
          </ScreenContext.Provider>
        </ModalLayerBackground>
      </ModalLayerMotionContext.Provider>
    );
  };

  const result = await render(<Harness />, { wrapper: ModalLayerTestRoot });

  const phases = () => getModalLayers().map(layer => layer.phase);
  const layerViews = () => findHostViews('modal-layer');
  const surfaces = () => findHostViews('custom-modal-swipe-surface');
  const getSurface = (layerIndex = 0) => {
    const surface = surfaces()[layerIndex];
    if (!surface) {
      throw new Error(`No sheet at layer ${layerIndex}`);
    }
    return surface;
  };

  return {
    getCallbacks,
    getSurface,
    layerViews,
    phases,
    refs,
    renderedVisible,
    /** The sheet reports its size, as it does on its first native layout. */
    layout: async (layerIndex: number) => {
      const surface = getSurface(layerIndex);
      await act(() => {
        surface.props.onLayout({
          nativeEvent: { layout: { height: SHEET_HEIGHT } },
        });
      });
    },
    finishAnimations: async () => {
      await act(() => {
        jest.runAllTimers();
      });
    },
    setVisible: async (id: string, isVisible: boolean) => {
      await act(() => {
        setters.get(id)?.(isVisible);
      });
    },
    pressClose: async (id: string) => {
      await fireEvent.press(screen.getByTestId(`${id}.close`));
    },
    setFrozen: async (isFrozen: boolean) => {
      await act(() => {
        setIsFrozen(isFrozen);
      });
    },
    unmountOwners: async (ids: string[]) => {
      await act(() => {
        setUnmountedIds(ids);
      });
    },
    unmount: result.unmount,
  };
};

type Stack = Awaited<ReturnType<typeof renderStack>>;

const openAll = async (stack: Stack, ids: string[]) => {
  for (const id of ids) {
    await stack.setVisible(id, true);
    await stack.layout(getModalLayers().length - 1);
  }
  await stack.finishAnimations();
};

/**
 * The sheet's native view reports where it is on the screen. Its ref is the
 * mocked RN View, whose own measureInWindow never answers.
 */
const placeSheet = (sheetTopY: number) =>
  jest
    .spyOn(
      View.prototype as unknown as { measureInWindow: MeasureInWindow },
      'measureInWindow',
    )
    .mockImplementation(callback => callback(0, sheetTopY, 0, 0));

const mockBackHandler = (isRemovable: boolean) => {
  const listeners: BackListener[] = [];
  const spy = jest
    .spyOn(BackHandler, 'addEventListener')
    .mockImplementation((_event, listener) => {
      listeners.push(listener);
      return {
        remove: () => {
          if (isRemovable) {
            listeners.splice(listeners.indexOf(listener), 1);
          }
        },
      };
    });

  return { listeners, restore: () => spy.mockRestore() };
};

describe('CustomModal in the modal layer host', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    throwingContentIds.clear();
    await act(() => {
      resetModalLayersForTests();
    });
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('open and close', () => {
    it('draws the modal in the host, never in a native window', async () => {
      const stack = await renderStack([{ id: 'time' }]);

      await stack.setVisible('time', true);

      expect(
        screen.container.queryAll(node => node.type === 'RCTModalHostView'),
      ).toHaveLength(0);
      expect(stack.layerViews()).toHaveLength(1);
      expect(stack.phases()).toEqual(['entering']);

      await stack.layout(0);
      await stack.finishAnimations();

      expect(stack.phases()).toEqual(['open']);
      await stack.unmount();
    });

    it('keeps the contexts of the place the modal is declared', async () => {
      const stack = await renderStack([{ id: 'time' }]);

      await stack.setVisible('time', true);

      expect(
        screen.getByText('screen-value', { includeHiddenElements: true }),
      ).toBeTruthy();
      expect(findHostViews('time.content')).toHaveLength(1);
      await stack.unmount();
    });

    it('releases touches as soon as it starts closing and unmounts after', async () => {
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);

      await stack.pressClose('time');

      expect(stack.phases()).toEqual(['exiting']);
      expect(stack.layerViews()[0]?.props.pointerEvents).toBe('none');

      await stack.finishAnimations();

      const { onClose, onDismissed } = stack.getCallbacks('time');
      expect(stack.layerViews()).toHaveLength(0);
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onDismissed).toHaveBeenCalledTimes(1);
      await stack.unmount();
    });

    it('closes through the labelled header close button', async () => {
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);

      await fireEvent.press(screen.getByRole('button', { name: 'Close' }));

      expect(stack.getCallbacks('time').onClose).toHaveBeenCalledTimes(1);
      expect(stack.phases()).toEqual(['exiting']);
      await stack.unmount();
    });

    it('stays open when the owner keeps it visible on a close request', async () => {
      const stack = await renderStack([{ id: 'time', isCloseRefused: true }]);
      await openAll(stack, ['time']);

      await stack.pressClose('time');

      // The request reached the owner, who refused: nothing else changes.
      expect(stack.getCallbacks('time').onClose).toHaveBeenCalledTimes(1);
      expect(stack.phases()).toEqual(['open']);
      expect(stack.layerViews()[0]?.props.pointerEvents).toBe('box-none');
      await stack.unmount();
    });

    it('calls onDismissed only after the owner closed it', async () => {
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);
      let isVisibleOnDismiss: boolean | undefined;
      const { onClose, onDismissed } = stack.getCallbacks('time');
      onDismissed.mockImplementation(() => {
        // The owner has already rendered its onClose update.
        isVisibleOnDismiss = stack.renderedVisible.get('time');
      });

      await act(() => {
        stack.refs.get('time')?.current?.close();
      });
      await stack.finishAnimations();

      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onDismissed).toHaveBeenCalledTimes(1);
      expect(onClose.mock.invocationCallOrder[0]).toBeLessThan(
        onDismissed.mock.invocationCallOrder[0] ?? 0,
      );
      expect(isVisibleOnDismiss).toBe(false);
      expect(stack.layerViews()).toHaveLength(0);
      await stack.unmount();
    });

    it('tears down at once without close callbacks, as on logout', async () => {
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);

      await act(() => {
        stack.refs.get('time')?.current?.dismissForTeardown();
      });

      // Logout: the owners are going away, nothing is reported to them.
      const { onClose, onDismissed } = stack.getCallbacks('time');
      expect(stack.layerViews()).toHaveLength(0);
      expect(onClose).not.toHaveBeenCalled();
      expect(onDismissed).not.toHaveBeenCalled();
      await stack.unmount();
    });
  });

  describe('reopening', () => {
    it('reverses a closing modal that is reopened instead of re-creating it', async () => {
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);

      await stack.setVisible('time', false);
      expect(stack.phases()).toEqual(['exiting']);

      await stack.setVisible('time', true);
      expect(stack.phases()).toEqual(['entering']);
      expect(stack.layerViews()[0]?.props.pointerEvents).toBe('box-none');

      await stack.finishAnimations();

      expect(stack.phases()).toEqual(['open']);
      expect(stack.getCallbacks('time').onDismissed).not.toHaveBeenCalled();
      await stack.unmount();
    });

    it('reopens a modal closed by its own X while it is still leaving', async () => {
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);

      await stack.pressClose('time');

      // The parent already knows: its state flipped when the close began.
      expect(stack.getCallbacks('time').onClose).toHaveBeenCalledTimes(1);
      expect(stack.phases()).toEqual(['exiting']);

      await stack.setVisible('time', true);
      expect(stack.phases()).toEqual(['entering']);

      await stack.finishAnimations();
      expect(stack.phases()).toEqual(['open']);
      expect(stack.getCallbacks('time').onDismissed).not.toHaveBeenCalled();
      await stack.unmount();
    });

    it('opens the next modal at once while the previous one is closing', async () => {
      const stack = await renderStack([
        { id: 'check-out' },
        { id: 'check-in' },
      ]);
      await openAll(stack, ['check-out']);

      await stack.pressClose('check-out');
      await stack.setVisible('check-in', true);

      expect(stack.phases()).toEqual(['exiting', 'entering']);

      await stack.layout(1);
      await stack.finishAnimations();

      expect(stack.phases()).toEqual(['open']);
      await stack.unmount();
    });

    it('puts a modal opened again after it fully closed on top', async () => {
      const stack = await renderStack([{ id: 'a' }, { id: 'b' }]);
      await openAll(stack, ['a', 'b']);
      const [layerA, layerB] = getModalLayers().map(layer => layer.id);

      await stack.setVisible('a', false);
      await stack.finishAnimations();
      await stack.setVisible('a', true);

      expect(getModalLayers().map(layer => layer.id)).toEqual([layerB, layerA]);
      await stack.unmount();
    });
  });

  describe('stacking', () => {
    it('lets only the top layer take touches in a stack of three', async () => {
      const stack = await renderStack([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);
      await openAll(stack, ['a', 'b', 'c']);

      const backdropPointerEvents = () =>
        findHostViews('custom-modal-backdrop').map(
          backdrop => backdrop.props.pointerEvents,
        );

      expect(backdropPointerEvents()).toEqual(['none', 'none', 'auto']);

      await stack.pressClose('c');

      // The middle modal is interactive before the top one finished leaving.
      expect(backdropPointerEvents()).toEqual(['none', 'auto', 'none']);

      await stack.finishAnimations();
      expect(stack.phases()).toEqual(['open', 'open']);
      await stack.unmount();
    });

    it('shows only the top layer and nothing below it to screen readers', async () => {
      const stack = await renderStack([{ id: 'a' }, { id: 'b' }]);
      const background = () => findHostViews('modal-layer-background')[0];

      expect(background()?.props.importantForAccessibility).toBe('auto');

      await openAll(stack, ['a', 'b']);

      expect(background()?.props.accessibilityElementsHidden).toBe(true);
      expect(background()?.props.importantForAccessibility).toBe(
        'no-hide-descendants',
      );
      expect(
        stack.layerViews().map(layer => layer.props.accessibilityViewIsModal),
      ).toEqual([false, true]);
      expect(
        stack
          .layerViews()
          .map(layer => layer.props.accessibilityElementsHidden),
      ).toEqual([true, false]);

      await stack.setVisible('a', false);
      await stack.setVisible('b', false);
      await stack.finishAnimations();

      expect(background()?.props.accessibilityElementsHidden).toBe(false);
      await stack.unmount();
    });
  });

  describe('owner leaves while the modal is on screen', () => {
    it('animates out a modal that is unmounted to close it', async () => {
      const stack = await renderStack([
        { id: 'time', isMountedOnlyWhenOpen: true },
      ]);
      await openAll(stack, ['time']);

      await stack.pressClose('time');

      expect(stack.phases()).toEqual(['exiting']);
      expect(stack.layerViews()[0]?.props.pointerEvents).toBe('none');
      expect(findHostViews('time.content')).toHaveLength(1);

      await stack.finishAnimations();

      expect(stack.layerViews()).toHaveLength(0);
      expect(stack.getCallbacks('time').onClose).toHaveBeenCalledTimes(1);
      await stack.unmount();
    });

    it('opens a modal that is mounted already visible', async () => {
      const stack = await renderStack([
        { id: 'time', isMountedOnlyWhenOpen: true },
      ]);

      await stack.setVisible('time', true);
      await stack.layout(0);
      await stack.finishAnimations();

      expect(stack.phases()).toEqual(['open']);
      await stack.unmount();
    });

    it('animates out and removes the layer when the owner unmounts', async () => {
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);

      await stack.unmountOwners(['time']);

      expect(stack.phases()).toEqual(['exiting']);
      expect(stack.layerViews()[0]?.props.pointerEvents).toBe('none');

      await stack.finishAnimations();

      expect(stack.layerViews()).toHaveLength(0);
      await stack.unmount();
    });

    it('hides with a frozen screen and comes back open when it is shown', async () => {
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);

      await stack.setFrozen(true);

      expect(stack.phases()).toEqual(['exiting']);
      expect(stack.layerViews()[0]?.props.pointerEvents).toBe('none');

      await stack.finishAnimations();
      expect(stack.layerViews()).toHaveLength(0);

      await stack.setFrozen(false);
      await stack.finishAnimations();

      expect(stack.phases()).toEqual(['open']);
      expect(stack.layerViews()[0]?.props.pointerEvents).toBe('box-none');
      expect(stack.getCallbacks('time').onDismissed).not.toHaveBeenCalled();
      await stack.unmount();
    });

    it('keeps the layer when the screen is shown again mid-animation', async () => {
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);

      await stack.setFrozen(true);
      await stack.setFrozen(false);
      await stack.finishAnimations();

      expect(stack.phases()).toEqual(['open']);
      expect(stack.layerViews()).toHaveLength(1);
      await stack.unmount();
    });

    it('finishes a close that was running when the screen froze', async () => {
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);
      await stack.pressClose('time');

      await stack.setFrozen(true);
      await stack.finishAnimations();

      // Post-close work (often navigation) does not wait for the screen.
      const { onDismissed } = stack.getCallbacks('time');
      expect(stack.layerViews()).toHaveLength(0);
      expect(onDismissed).toHaveBeenCalledTimes(1);

      await stack.setFrozen(false);
      await stack.finishAnimations();

      expect(stack.layerViews()).toHaveLength(0);
      expect(onDismissed).toHaveBeenCalledTimes(1);
      await stack.unmount();
    });

    it('lets Android back through once its screen is frozen', async () => {
      const backHandler = mockBackHandler(false);
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);

      await stack.setFrozen(true);
      await stack.finishAnimations();

      // The subscription outlives the freeze; the press must reach navigation.
      expect(backHandler.listeners.at(-1)?.()).toBe(false);
      expect(stack.getCallbacks('time').onClose).not.toHaveBeenCalled();
      await stack.unmount();
      backHandler.restore();
    });
  });

  describe('modals without a backdrop', () => {
    it('still block the screen below by default', async () => {
      const stack = await renderStack([{ id: 'gallery', withBackdrop: false }]);
      await openAll(stack, ['gallery']);

      const [blocker] = findHostViews('custom-modal-touch-blocker');
      expect(blocker?.props.pointerEvents).toBe('auto');
      await stack.unmount();
    });
  });

  describe('content that crashes', () => {
    it('closes the modal instead of taking the app down', async () => {
      const warn = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => undefined);
      const error = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      throwingContentIds.add('time');
      const stack = await renderStack([{ id: 'time' }]);

      await stack.setVisible('time', true);

      expect(warn).toHaveBeenCalledWith(
        '[ModalLayer] modal content crashed',
        expect.any(Error),
        expect.anything(),
      );
      expect(stack.getCallbacks('time').onClose).toHaveBeenCalledTimes(1);
      expect(stack.phases()).toEqual(['exiting']);

      await stack.finishAnimations();

      expect(stack.layerViews()).toHaveLength(0);
      // Owners holding state for the modal (presence, sequence) are released.
      expect(stack.getCallbacks('time').onDismissed).toHaveBeenCalledTimes(1);
      await stack.unmount();
      warn.mockRestore();
      error.mockRestore();
    });
  });

  describe('keyboard', () => {
    it('dismisses the keyboard when the modal opens and when it hides', async () => {
      const dismiss = jest.spyOn(Keyboard, 'dismiss');
      const stack = await renderStack([{ id: 'time' }]);
      dismiss.mockClear();

      await stack.setVisible('time', true);
      expect(dismiss).toHaveBeenCalledTimes(1);

      await stack.setVisible('time', false);
      expect(dismiss).toHaveBeenCalledTimes(2);
      await stack.unmount();
      dismiss.mockRestore();
    });
  });

  describe('close requests', () => {
    it('asks once per owner render and closes once the owner agrees', async () => {
      const stack = await renderStack([{ id: 'time', isCloseRefused: true }]);
      await openAll(stack, ['time']);

      // A double tap in one frame is one request.
      await act(() => {
        stack.refs.get('time')?.current?.close();
        stack.refs.get('time')?.current?.close();
      });
      expect(stack.getCallbacks('time').onClose).toHaveBeenCalledTimes(1);

      // After the owner refused, a later tap asks again.
      await act(() => {
        stack.refs.get('time')?.current?.close();
      });
      expect(stack.getCallbacks('time').onClose).toHaveBeenCalledTimes(2);
      expect(stack.phases()).toEqual(['open']);

      await stack.setVisible('time', false);
      expect(stack.phases()).toEqual(['exiting']);
      await stack.finishAnimations();
      expect(stack.layerViews()).toHaveLength(0);
      expect(stack.getCallbacks('time').onDismissed).toHaveBeenCalledTimes(1);
      await stack.unmount();
    });

    it('ignores a swipe that starts below the header of the sheet', async () => {
      const stack = await renderStack([{ id: 'time', closeOnSwipeDown: true }]);
      await openAll(stack, ['time']);
      placeSheet(100);
      const surface = stack.getSurface();

      await act(() => {
        // locationY is small (a child was touched) but the touch is deep
        // inside the sheet.
        surface.props.onTouchStart({
          nativeEvent: { locationY: 20, pageY: 600 },
        });
        surface.props.onTouchEnd({ nativeEvent: { pageY: 900 } });
      });

      expect(stack.getCallbacks('time').onClose).not.toHaveBeenCalled();
      await stack.unmount();
    });

    it('brings a refused swipe back instead of leaving the sheet moved', async () => {
      const stack = await renderStack([
        { id: 'time', closeOnSwipeDown: true, isCloseRefused: true },
      ]);
      await openAll(stack, ['time']);
      placeSheet(80);
      const surface = stack.getSurface();

      await act(() => {
        surface.props.onTouchStart({
          nativeEvent: { locationY: 20, pageY: 100 },
        });
        surface.props.onTouchEnd({ nativeEvent: { pageY: 400 } });
      });

      expect(stack.getCallbacks('time').onClose).toHaveBeenCalledTimes(1);
      expect(stack.phases()).toEqual(['open']);
      await stack.unmount();
    });

    it('closes after a downward swipe on the header when enabled', async () => {
      const stack = await renderStack([{ id: 'time', closeOnSwipeDown: true }]);
      await openAll(stack, ['time']);
      placeSheet(80);
      const surface = stack.getSurface();

      await act(() => {
        surface.props.onTouchStart({
          nativeEvent: { locationY: 20, pageY: 100 },
        });
        surface.props.onTouchEnd({ nativeEvent: { pageY: 400 } });
      });

      expect(stack.phases()).toEqual(['exiting']);
      expect(stack.getCallbacks('time').onClose).toHaveBeenCalledTimes(1);
      await stack.unmount();
    });

    it('closes only the top modal on Android back', async () => {
      const backHandler = mockBackHandler(true);
      const stack = await renderStack([{ id: 'a' }, { id: 'b' }]);
      await openAll(stack, ['a', 'b']);

      expect(backHandler.listeners).toHaveLength(1);
      await act(() => {
        backHandler.listeners[0]?.();
      });

      expect(stack.getCallbacks('b').onClose).toHaveBeenCalledTimes(1);
      expect(stack.getCallbacks('a').onClose).not.toHaveBeenCalled();
      await stack.unmount();
      backHandler.restore();
    });

    it('moves screen-reader focus to the layer that becomes top', async () => {
      const sendEvent = jest
        .spyOn(AccessibilityInfo, 'sendAccessibilityEvent')
        .mockImplementation(() => undefined);
      const stack = await renderStack([{ id: 'a' }, { id: 'b' }]);

      await openAll(stack, ['a']);
      expect(sendEvent).toHaveBeenLastCalledWith(expect.anything(), 'focus');
      const callsAfterFirst = sendEvent.mock.calls.length;

      await openAll(stack, ['b']);
      expect(sendEvent.mock.calls.length).toBeGreaterThan(callsAfterFirst);
      await stack.unmount();
      sendEvent.mockRestore();
    });

    it('keeps Android back for the open modal when a screen subscribes later', async () => {
      const backHandler = mockBackHandler(false);
      const stack = await renderStack([{ id: 'time' }]);
      await openAll(stack, ['time']);
      const screenBack = jest.fn(() => true);
      // BackHandler runs the latest subscription first.
      addHardwareBackPressListener(screenBack);

      let isHandled: boolean | null | undefined;
      await act(() => {
        isHandled = backHandler.listeners.at(-1)?.();
      });

      expect(isHandled).toBe(true);
      expect(screenBack).not.toHaveBeenCalled();
      expect(stack.getCallbacks('time').onClose).toHaveBeenCalledTimes(1);
      await stack.unmount();
      backHandler.restore();
    });
  });
});
