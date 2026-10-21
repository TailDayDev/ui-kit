import { Animated, Easing } from 'react-native';

/** One shimmer sweep, ms (app `skeletonAnimation.ts`). */
const SHIMMER_DURATION_MS = 1500;

const progress = new Animated.Value(0);
let consumers = 0;
let loop: Animated.CompositeAnimation | null = null;

/** Shared 0 → 1 shimmer progress. Every skeleton on screen reads the same value. */
export const skeletonAnimationProgress = progress;

/**
 * Registers one visible skeleton. The first consumer starts a single native
 * loop; the returned release stops it after the last consumer leaves.
 * Calling the release more than once is a no-op.
 */
export const retainSkeletonAnimation = (): (() => void) => {
  consumers += 1;
  if (consumers === 1) {
    progress.setValue(0);
    loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: SHIMMER_DURATION_MS,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false,
      }),
    );
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
