import type { StyleProp, ViewStyle } from 'react-native';
/** Loading placeholder of the Today feed (Figma `TodaySkeleton`): a section title bar and three task cards. */
export interface TodaySkeletonProps {
    /**
     * Screen-reader text, e.g. "Loading". When set, the whole skeleton is
     * announced once as a busy progress bar; the blocks themselves stay hidden.
     */
    accessibilityLabel?: string;
    /** Outer style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the container. */
    testID?: string;
}
//# sourceMappingURL=TodaySkeleton.types.d.ts.map