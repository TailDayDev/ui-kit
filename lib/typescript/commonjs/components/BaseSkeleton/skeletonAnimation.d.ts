import { Animated } from 'react-native';
/** Shared 0 → 1 shimmer progress. Every skeleton on screen reads the same value. */
export declare const skeletonAnimationProgress: Animated.Value;
/**
 * Registers one visible skeleton. The first consumer starts a single native
 * loop; the returned release stops it after the last consumer leaves.
 * Calling the release more than once is a no-op.
 */
export declare const retainSkeletonAnimation: () => (() => void);
//# sourceMappingURL=skeletonAnimation.d.ts.map