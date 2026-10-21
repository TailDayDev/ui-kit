"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skeletonAnimationProgress = exports.retainSkeletonAnimation = void 0;
var _reactNative = require("react-native");
/** One shimmer sweep, ms (app `skeletonAnimation.ts`). */
const SHIMMER_DURATION_MS = 1500;
const progress = new _reactNative.Animated.Value(0);
let consumers = 0;
let loop = null;

/** Shared 0 → 1 shimmer progress. Every skeleton on screen reads the same value. */
const skeletonAnimationProgress = exports.skeletonAnimationProgress = progress;

/**
 * Registers one visible skeleton. The first consumer starts a single native
 * loop; the returned release stops it after the last consumer leaves.
 * Calling the release more than once is a no-op.
 */
const retainSkeletonAnimation = () => {
  consumers += 1;
  if (consumers === 1) {
    progress.setValue(0);
    loop = _reactNative.Animated.loop(_reactNative.Animated.timing(progress, {
      toValue: 1,
      duration: SHIMMER_DURATION_MS,
      easing: _reactNative.Easing.linear,
      useNativeDriver: true,
      isInteraction: false
    }));
    loop.start();
  }
  let isReleased = false;
  return () => {
    if (isReleased) return;
    isReleased = true;
    consumers -= 1;
    if (consumers === 0) {
      loop?.stop();
      loop = null;
    }
  };
};
exports.retainSkeletonAnimation = retainSkeletonAnimation;
//# sourceMappingURL=skeletonAnimation.js.map