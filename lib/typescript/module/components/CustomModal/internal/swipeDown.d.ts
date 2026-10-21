import type { PanResponderGestureState } from 'react-native';
export declare const SWIPE_CLOSE_DISTANCE = 72;
export declare const SWIPE_CLOSE_VELOCITY = 0.75;
export declare const shouldStartSwipeDown: (gestureState: Pick<PanResponderGestureState, "dx" | "dy">) => boolean;
export declare const shouldCloseFromSwipeDown: (gestureState: Pick<PanResponderGestureState, "dy" | "vy">) => boolean;
//# sourceMappingURL=swipeDown.d.ts.map