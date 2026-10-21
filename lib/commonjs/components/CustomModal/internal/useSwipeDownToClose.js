"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSwipeDownToClose = void 0;
var _react = require("react");
var _CustomModalConstants = require("../CustomModal.constants.js");
var _swipeDown = require("./swipeDown.js");
const NO_HANDLERS = {};

/**
 * Touch handlers for the sheet: a downward swipe that starts near its top
 * asks to close. Empty while disabled. `sheetRef` must be attached to the
 * sheet view: the touch is measured against the sheet top, since `locationY`
 * is relative to whichever child was touched.
 */
const useSwipeDownToClose = (isEnabled, onSwipeDown, sheetRef) => {
  const startYRef = (0, _react.useRef)(null);
  /** Bumped per touch: a measure that answers after the touch is stale. */
  const touchIdRef = (0, _react.useRef)(0);
  const onTouchStart = (0, _react.useCallback)(event => {
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
      startYRef.current = locationY <= _CustomModalConstants.HEADER_SWIPE_REGION_HEIGHT ? pageY : null;
      return;
    }
    sheet.measureInWindow((_x, sheetTopY) => {
      if (touchId !== touchIdRef.current) {
        return;
      }
      startYRef.current = pageY - sheetTopY <= _CustomModalConstants.HEADER_SWIPE_REGION_HEIGHT ? pageY : null;
    });
  }, [sheetRef]);
  const onTouchEnd = (0, _react.useCallback)(event => {
    const startY = startYRef.current;
    startYRef.current = null;
    touchIdRef.current += 1;
    if (startY === null) {
      return;
    }
    const distance = event.nativeEvent.pageY - startY;
    if ((0, _swipeDown.shouldCloseFromSwipeDown)({
      dy: distance,
      vy: 0
    })) {
      onSwipeDown();
    }
  }, [onSwipeDown]);
  return (0, _react.useMemo)(() => isEnabled ? {
    onTouchStart,
    onTouchEnd
  } : NO_HANDLERS, [isEnabled, onTouchEnd, onTouchStart]);
};
exports.useSwipeDownToClose = useSwipeDownToClose;
//# sourceMappingURL=useSwipeDownToClose.js.map