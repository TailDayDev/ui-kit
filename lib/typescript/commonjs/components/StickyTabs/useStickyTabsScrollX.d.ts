import { Animated } from 'react-native';
interface UseStickyTabsScrollXParams {
    contentWidth: number;
    isEnabled?: boolean;
    /**
     * True when this hook is the only driver of `scrollX` and every consumer
     * maps it to a transform; the tab switch then runs on the native driver.
     */
    isNativeDriverSafe?: boolean;
    scrollX: Animated.Value;
    selectedIndex: number;
    tabCount: number;
}
export declare const useStickyTabsScrollX: ({ contentWidth, isEnabled, isNativeDriverSafe, scrollX, selectedIndex, tabCount, }: UseStickyTabsScrollXParams) => void;
export {};
//# sourceMappingURL=useStickyTabsScrollX.d.ts.map