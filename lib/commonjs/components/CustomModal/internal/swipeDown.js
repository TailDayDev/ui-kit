"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldStartSwipeDown = exports.shouldCloseFromSwipeDown = exports.SWIPE_CLOSE_VELOCITY = exports.SWIPE_CLOSE_DISTANCE = void 0;
const SWIPE_CLOSE_DISTANCE = exports.SWIPE_CLOSE_DISTANCE = 72;
const SWIPE_CLOSE_VELOCITY = exports.SWIPE_CLOSE_VELOCITY = 0.75;
/** A drag counts as a swipe down after this many points. */
const SWIPE_START_DISTANCE = 8;
const shouldStartSwipeDown = gestureState => gestureState.dy > SWIPE_START_DISTANCE && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
exports.shouldStartSwipeDown = shouldStartSwipeDown;
const shouldCloseFromSwipeDown = gestureState => gestureState.dy >= SWIPE_CLOSE_DISTANCE || gestureState.vy >= SWIPE_CLOSE_VELOCITY;
exports.shouldCloseFromSwipeDown = shouldCloseFromSwipeDown;
//# sourceMappingURL=swipeDown.js.map