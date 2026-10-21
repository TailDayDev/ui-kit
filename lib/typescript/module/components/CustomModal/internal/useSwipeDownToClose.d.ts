import { type RefObject } from 'react';
import type { NativeSyntheticEvent, NativeTouchEvent, View } from 'react-native';
type TouchEvent = NativeSyntheticEvent<NativeTouchEvent>;
interface ISwipeDownHandlers {
    onTouchStart?: (event: TouchEvent) => void;
    onTouchEnd?: (event: TouchEvent) => void;
}
/**
 * Touch handlers for the sheet: a downward swipe that starts near its top
 * asks to close. Empty while disabled. `sheetRef` must be attached to the
 * sheet view: the touch is measured against the sheet top, since `locationY`
 * is relative to whichever child was touched.
 */
export declare const useSwipeDownToClose: (isEnabled: boolean, onSwipeDown: () => void, sheetRef: RefObject<View | null>) => ISwipeDownHandlers;
export {};
//# sourceMappingURL=useSwipeDownToClose.d.ts.map