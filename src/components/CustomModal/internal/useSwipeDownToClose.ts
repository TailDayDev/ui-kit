import { useCallback, useMemo, useRef, type RefObject } from 'react';
import type {
  NativeSyntheticEvent,
  NativeTouchEvent,
  View,
} from 'react-native';

import { HEADER_SWIPE_REGION_HEIGHT } from '../CustomModal.constants';
import { shouldCloseFromSwipeDown } from './swipeDown';

type TouchEvent = NativeSyntheticEvent<NativeTouchEvent>;

interface ISwipeDownHandlers {
  onTouchStart?: (event: TouchEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
}

const NO_HANDLERS: ISwipeDownHandlers = {};

/**
 * Touch handlers for the sheet: a downward swipe that starts near its top
 * asks to close. Empty while disabled. `sheetRef` must be attached to the
 * sheet view: the touch is measured against the sheet top, since `locationY`
 * is relative to whichever child was touched.
 */
export const useSwipeDownToClose = (
  isEnabled: boolean,
  onSwipeDown: () => void,
  sheetRef: RefObject<View | null>,
): ISwipeDownHandlers => {
  const startYRef = useRef<number | null>(null);
  /** Bumped per touch: a measure that answers after the touch is stale. */
  const touchIdRef = useRef(0);

  const onTouchStart = useCallback(
    (event: TouchEvent) => {
      const { locationY, pageY } = event.nativeEvent;
      touchIdRef.current += 1;
      const touchId = touchIdRef.current;
      startYRef.current = null;

      const sheet = sheetRef.current;
      if (typeof sheet?.measureInWindow !== 'function') {
        // No native view to measure (tests): the touched element is the best
        // reference left.
        startYRef.current =
          locationY <= HEADER_SWIPE_REGION_HEIGHT ? pageY : null;
        return;
      }

      sheet.measureInWindow((_x, sheetTopY) => {
        if (touchId !== touchIdRef.current) {
          return;
        }
        startYRef.current =
          pageY - sheetTopY <= HEADER_SWIPE_REGION_HEIGHT ? pageY : null;
      });
    },
    [sheetRef],
  );

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      const startY = startYRef.current;
      startYRef.current = null;
      touchIdRef.current += 1;
      if (startY === null) {
        return;
      }

      const distance = event.nativeEvent.pageY - startY;
      if (shouldCloseFromSwipeDown({ dy: distance, vy: 0 })) {
        onSwipeDown();
      }
    },
    [onSwipeDown],
  );

  return useMemo(
    () => (isEnabled ? { onTouchStart, onTouchEnd } : NO_HANDLERS),
    [isEnabled, onTouchEnd, onTouchStart],
  );
};
