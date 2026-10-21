import { useState, type ReactElement } from 'react';
import {
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  View,
  type KeyboardEvent,
} from 'react-native';
import { act, render } from '@testing-library/react-native';

import {
  ModalLayerMotionContext,
  ModalLayerTestRoot,
  resetModalLayersForTests,
} from '../ModalLayer';
import { findHostViews, getHostView } from './__fixtures__/modalTestUtils';
import { CustomModal } from './CustomModal';
import { CustomModalProvider } from './CustomModalProvider';
import {
  readOpenKeyboardMetrics,
  resetKeyboardTrackingForTests,
} from './internal/keyboardTracking';

/** The app's keyboard «Done» bar, which iOS does not report. */
const KEYBOARD_ACCESSORY_HEIGHT = 44;
const KEYBOARD_HEIGHT = 344;
const KEYBOARD_VISIBLE_HEIGHT = 300;
/** Visible overlap plus the 12 pt gap above the keyboard. */
const LIFTED_PADDING = KEYBOARD_VISIBLE_HEIGHT + 12;

const mockKeyboardListeners = new Map<
  string,
  Set<(event: KeyboardEvent) => void>
>();

const emitKeyboardEvent = (eventName: string, height: number, screenY = 0) => {
  const coordinates = { height, screenX: 0, screenY, width: 430 };
  // Only the fields the modal reads; the rest of KeyboardEvent is iOS noise.
  const event = {
    duration: 250,
    easing: 'keyboard',
    endCoordinates: coordinates,
    isEventFromThisApp: true,
    startCoordinates: coordinates,
  } as KeyboardEvent;

  mockKeyboardListeners.get(eventName)?.forEach(listener => listener(event));
};

const showKeyboard = () =>
  act(() =>
    emitKeyboardEvent(
      'keyboardWillShow',
      KEYBOARD_HEIGHT,
      Dimensions.get('window').height - KEYBOARD_VISIBLE_HEIGHT,
    ),
  );

const mockOpenKeyboard = () =>
  jest.spyOn(Keyboard, 'metrics').mockReturnValue({
    height: KEYBOARD_HEIGHT,
    screenX: 0,
    screenY: Dimensions.get('window').height - KEYBOARD_VISIBLE_HEIGHT,
    width: 430,
  });

const renderModals = (element: ReactElement) =>
  render(element, { wrapper: ModalLayerTestRoot });

const getFooterPaddingBottom = (testID: string) => {
  const footer = getHostView(testID);
  return StyleSheet.flatten(footer.parent?.props.style)?.paddingBottom;
};

/** The page scroll view (host props of RN's ScrollView). */
const getPageScroll = () => {
  const [scroll] = findHostViews('custom-modal-page-scroll');
  if (!scroll) {
    throw new Error('No page scroll view');
  }
  return scroll;
};

const getScrollContentPaddingBottom = () =>
  StyleSheet.flatten(getPageScroll().props.contentContainerStyle)
    ?.paddingBottom;

const getScrollContentInsetBottom = () =>
  getPageScroll().props.contentInset.bottom;

describe('CustomModal keyboard handling in a modal stack', () => {
  const originalPlatform = Platform.OS;

  beforeEach(() => {
    resetKeyboardTrackingForTests();
    mockKeyboardListeners.clear();
    Object.defineProperty(Platform, 'OS', {
      configurable: true,
      value: 'ios',
    });
    jest
      .spyOn(Keyboard, 'addListener')
      .mockImplementation((event, listener) => {
        const listeners =
          mockKeyboardListeners.get(event) ??
          new Set<(keyboardEvent: KeyboardEvent) => void>();
        listeners.add(listener);
        mockKeyboardListeners.set(event, listeners);

        // The modal only calls remove(); the rest of the subscription is native.
        return {
          remove: () => {
            listeners.delete(listener);
          },
        } as unknown as ReturnType<typeof Keyboard.addListener>;
      });
    jest
      .spyOn(Keyboard, 'scheduleLayoutAnimation')
      .mockImplementation(() => undefined);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
    Object.defineProperty(Platform, 'OS', {
      configurable: true,
      value: originalPlatform,
    });
    await act(() => {
      resetModalLayersForTests();
    });
  });

  it('uses the visible keyboard overlap and keeps a 12 px gap', async () => {
    const { unmount } = await renderModals(
      <>
        <CustomModal
          autoHeight
          footer={<View testID="parent-footer" />}
          footerBottomPadding={24}
          liftFooterOnKeyboard
          onClose={jest.fn()}
          visible
        >
          <View />
        </CustomModal>
        <CustomModal
          autoHeight
          footer={<View testID="child-footer" />}
          footerBottomPadding={9}
          liftFooterOnKeyboard
          onClose={jest.fn()}
          visible
        >
          <View />
        </CustomModal>
      </>,
    );

    // The top modal and the app-wide keyboard tracker; never the modal below.
    expect(mockKeyboardListeners.get('keyboardWillShow')?.size).toBe(2);
    expect(getFooterPaddingBottom('parent-footer')).toBe(24);
    expect(getFooterPaddingBottom('child-footer')).toBe(9);

    await showKeyboard();

    expect(getFooterPaddingBottom('parent-footer')).toBe(24);
    expect(getFooterPaddingBottom('child-footer')).toBe(LIFTED_PADDING);
    await unmount();
  });

  it('adds the keyboard accessory height from the provider', async () => {
    const { unmount } = await renderModals(
      <CustomModalProvider keyboardAccessoryHeight={KEYBOARD_ACCESSORY_HEIGHT}>
        <CustomModal
          autoHeight
          avoidKeyboard
          footer={<View testID="accessory-footer" />}
          onClose={jest.fn()}
          visible
          withoutContainerFooter
        >
          <View />
        </CustomModal>
      </CustomModalProvider>,
    );

    await showKeyboard();

    expect(getFooterPaddingBottom('accessory-footer')).toBe(
      LIFTED_PADDING + KEYBOARD_ACCESSORY_HEIGHT,
    );
    await unmount();
  });

  it('keeps the footer fixed while making the scroll content keyboard-aware', async () => {
    const { unmount } = await renderModals(
      <CustomModal
        adjustScrollContentForKeyboard
        footer={<View testID="fixed-footer" />}
        footerBottomPadding={9}
        onClose={jest.fn()}
        visible
      >
        <View />
      </CustomModal>,
    );

    await showKeyboard();

    expect(getFooterPaddingBottom('fixed-footer')).toBe(9);
    expect(getScrollContentPaddingBottom()).toBeUndefined();
    // Keyboard overlap + the default 24 pt gap.
    expect(getScrollContentInsetBottom()).toBe(KEYBOARD_VISIBLE_HEIGHT + 24);
    await unmount();
  });

  it('uses the configured gap above the keyboard for scroll content', async () => {
    const { unmount } = await renderModals(
      <CustomModal
        adjustScrollContentForKeyboard
        keyboardInsetBottomOffset={8}
        onClose={jest.fn()}
        visible
      >
        <View />
      </CustomModal>,
    );

    await showKeyboard();

    expect(getScrollContentInsetBottom()).toBe(KEYBOARD_VISIBLE_HEIGHT + 8);
    await unmount();
  });

  it('lifts an auto-height footer by keyboard overlap plus the keyboard gap', async () => {
    const { unmount } = await renderModals(
      <CustomModal
        autoHeight
        avoidKeyboard
        footer={<View testID="title-footer" />}
        onClose={jest.fn()}
        visible
        withoutContainerFooter
      >
        <View />
      </CustomModal>,
    );

    await showKeyboard();

    expect(getFooterPaddingBottom('title-footer')).toBe(LIFTED_PADDING);
    await unmount();
  });

  it('does not double keyboard space when the footer is already lifted', async () => {
    const { unmount } = await renderModals(
      <CustomModal
        autoHeight
        adjustScrollContentForKeyboard
        footer={<View testID="lifted-footer" />}
        footerBottomPadding={9}
        liftFooterOnKeyboard
        onClose={jest.fn()}
        visible
      >
        <View />
      </CustomModal>,
    );

    await showKeyboard();

    expect(getFooterPaddingBottom('lifted-footer')).toBe(LIFTED_PADDING);
    expect(getScrollContentInsetBottom()).toBe(24);
    await unmount();
  });

  it('keeps a full-height footer under the keyboard', async () => {
    const { unmount } = await renderModals(
      <CustomModal
        avoidKeyboard
        footer={<View testID="full-height-footer" />}
        footerBottomPadding={9}
        liftFooterOnKeyboard
        onClose={jest.fn()}
        visible
      >
        <View />
      </CustomModal>,
    );

    await showKeyboard();

    expect(getFooterPaddingBottom('full-height-footer')).toBe(9);
    await unmount();
  });

  it('picks up a keyboard that is already open when the modal becomes top', async () => {
    mockOpenKeyboard();

    const { unmount } = await renderModals(
      <CustomModal
        autoHeight
        avoidKeyboard
        footer={<View testID="late-footer" />}
        onClose={jest.fn()}
        visible
        withoutContainerFooter
      >
        <View />
      </CustomModal>,
    );

    expect(getFooterPaddingBottom('late-footer')).toBe(LIFTED_PADDING);
    await unmount();
  });

  it('ignores a keyboard that is already leaving when the modal becomes top', async () => {
    mockOpenKeyboard();
    readOpenKeyboardMetrics();
    // A sheet above closed and took the keyboard down; metrics are still stale.
    await act(() => emitKeyboardEvent('keyboardWillHide', 0));

    const { unmount } = await renderModals(
      <CustomModal
        autoHeight
        avoidKeyboard
        footer={<View testID="parent-footer-after-child" />}
        onClose={jest.fn()}
        visible
        withoutContainerFooter
      >
        <View />
      </CustomModal>,
    );

    expect(getFooterPaddingBottom('parent-footer-after-child')).not.toBe(
      LIFTED_PADDING,
    );
    await unmount();
  });

  it('drops a stale keyboard height on the did-hide event', async () => {
    // Became top after keyboardWillHide, before metrics were cleared.
    mockOpenKeyboard();

    const { unmount } = await renderModals(
      <CustomModal
        autoHeight
        avoidKeyboard
        footer={<View testID="stale-footer" />}
        onClose={jest.fn()}
        visible
        withoutContainerFooter
      >
        <View />
      </CustomModal>,
    );
    expect(getFooterPaddingBottom('stale-footer')).toBe(LIFTED_PADDING);

    await act(() => emitKeyboardEvent('keyboardDidHide', 0));

    expect(getFooterPaddingBottom('stale-footer')).not.toBe(LIFTED_PADDING);
    await unmount();
  });

  it('keeps the keyboard layout while the sheet is leaving', async () => {
    jest.useFakeTimers();
    let setIsVisible: (isVisible: boolean) => void = () => undefined;
    const Owner = () => {
      const [isVisible, updateIsVisible] = useState(true);
      setIsVisible = updateIsVisible;

      return (
        <CustomModal
          autoHeight
          avoidKeyboard
          footer={<View testID="leaving-footer" />}
          onClose={() => updateIsVisible(false)}
          visible={isVisible}
          withoutContainerFooter
        >
          <View />
        </CustomModal>
      );
    };

    const { unmount } = await renderModals(
      <ModalLayerMotionContext.Provider value={{ isReducedMotion: false }}>
        <Owner />
      </ModalLayerMotionContext.Provider>,
    );
    const surface = getHostView('custom-modal-swipe-surface');
    await act(() => {
      surface.props.onLayout({ nativeEvent: { layout: { height: 400 } } });
      jest.runAllTimers();
    });

    await showKeyboard();
    expect(getFooterPaddingBottom('leaving-footer')).toBe(LIFTED_PADDING);

    // Closing hands the top to nothing and the keyboard starts hiding: the
    // leaving sheet must not re-layout under its own animation.
    await act(() => setIsVisible(false));
    await act(() => emitKeyboardEvent('keyboardWillHide', 0));
    expect(getFooterPaddingBottom('leaving-footer')).toBe(LIFTED_PADDING);

    await act(() => {
      jest.runAllTimers();
    });
    await unmount();
    jest.useRealTimers();
  });
});
