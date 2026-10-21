"use strict";

import { useCallback, useMemo, useRef } from 'react';
import { HEADER_SWIPE_REGION_HEIGHT } from "../CustomModal.constants.js";
import { shouldCloseFromSwipeDown } from "./swipeDown.js";
const NO_HANDLERS = {};

/**
 * Touch handlers for the sheet: a downward swipe that starts near its top
 * asks to close. Empty while disabled. `sheetRef` must be attached to the
 * sheet view: the touch is measured against the sheet top, since `locationY`
 * is relative to whichever child was touched.
 */
export const useSwipeDownToClose = (isEnabled, onSwipeDown, sheetRef) => {
  const startYRef = useRef(null);
  /** Bumped per touch: a measure that answers after the touch is stale. */
  const touchIdRef = useRef(0);
  const onTouchStart = useCallback(event => {
    const {
      locationY,
      pageY
    } = event.nativeEvent;
    touchIdRef.current += 1;
    const touchId = touchIdRef.current;
    startYRef.current = null;
    const sheet = sheetRef.current;
    if (typeof sheet?.measureInWindow !== 'function') {
      // No native view to measure (tests): the touched element is the best
      // reference left.
      startYRef.current = locationY <= HEADER_SWIPE_REGION_HEIGHT ? pageY : null;
      return;
    }
    sheet.measureInWindow((_x, sheetTopY) => {
      if (touchId !== touchIdRef.current) {
        return;
      }
      startYRef.current = pageY - sheetTopY <= HEADER_SWIPE_REGION_HEIGHT ? pageY : null;
    });
  }, [sheetRef]);
  const onTouchEnd = useCallback(event => {
    const startY = startYRef.current;
    startYRef.current = null;
    touchIdRef.current += 1;
    if (startY === null) {
      return;
    }
    const distance = event.nativeEvent.pageY - startY;
    if (shouldCloseFromSwipeDown({
      dy: distance,
      vy: 0
    })) {
      onSwipeDown();
    }
  }, [onSwipeDown]);
  return useMemo(() => isEnabled ? {
    onTouchStart,
    onTouchEnd
  } : NO_HANDLERS, [isEnabled, onTouchEnd, onTouchStart]);
};
//# sourceMappingURL=useSwipeDownToClose.js.map