import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
/** Shimmering placeholder block shown while content loads. */
export interface BaseSkeletonProps {
    /** Block width: points or a percentage. Defaults to `'100%'`. */
    width?: DimensionValue;
    /** Block height: points or a percentage. Defaults to 22. */
    height?: DimensionValue;
    /** Corner radius in points. Defaults to 8 (`radius.sm`). */
    borderRadius?: number;
    /** Fill color of the block. Defaults to `colors.bg.subtle`. */
    backgroundColor?: string;
    /** Extra container style (margins, flex, alignment). */
    style?: StyleProp<ViewStyle>;
    /**
     * Screen-reader text, e.g. "Loading". When set, the block is announced as a
     * busy progress bar; without it the block is hidden from accessibility so a
     * screen full of skeletons is not read out one by one.
     */
    accessibilityLabel?: string;
    /** Test identifier of the container. */
    testID?: string;
}
//# sourceMappingURL=BaseSkeleton.types.d.ts.map