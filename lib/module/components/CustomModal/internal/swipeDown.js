"use strict";

export const SWIPE_CLOSE_DISTANCE = 72;
export const SWIPE_CLOSE_VELOCITY = 0.75;
/** A drag counts as a swipe down after this many points. */
const SWIPE_START_DISTANCE = 8;
export const shouldStartSwipeDown = gestureState => gestureState.dy > SWIPE_START_DISTANCE && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
export const shouldCloseFromSwipeDown = gestureState => gestureState.dy >= SWIPE_CLOSE_DISTANCE || gestureState.vy >= SWIPE_CLOSE_VELOCITY;
//# sourceMappingURL=swipeDown.js.map