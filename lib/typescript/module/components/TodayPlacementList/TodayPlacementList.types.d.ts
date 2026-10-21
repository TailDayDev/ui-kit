import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
/** Figma `TodayPlacementList` › `itemsCount` options. */
export type TodayPlacementListItemsCount = 1 | 2;
/**
 * Where the pet is: a 16pt placement image and name, one or two of them in a
 * row (Figma `TodayPlacementList`).
 */
export interface TodayPlacementListProps {
    /** How many placements are shown. Figma `itemsCount`. Defaults to `1`. */
    itemsCount?: TodayPlacementListItemsCount;
    /** Name of the (first) placement, one line, truncated. Figma `title`. */
    title: string;
    /**
     * 16×16 image of the (first) placement (Figma `Картинка места · с сервера`).
     * Server image: the app passes a ready element (`DinamicImage`).
     */
    image?: ReactNode;
    /** Name of the second placement, shown when `itemsCount` is 2 (Figma nested instance `title`). */
    secondTitle?: string;
    /** 16×16 image of the second placement, shown when `itemsCount` is 2. */
    secondImage?: ReactNode;
    /** Outer style. Applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the row. */
    testID?: string;
}
//# sourceMappingURL=TodayPlacementList.types.d.ts.map