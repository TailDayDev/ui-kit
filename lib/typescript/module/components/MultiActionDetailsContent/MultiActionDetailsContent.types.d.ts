import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { TodayTaskCardProps } from '../TodayTaskCard/index.js';
import type { TodayTaskHeaderProps } from '../TodayTaskHeader/index.js';
/** One pet card of the details modal: a `TodayTaskCard` without its own header. */
export interface MultiActionDetailsContentItem extends Omit<TodayTaskCardProps, 'hasHeader' | 'header'> {
    /** Stable React key (action id + pet id). */
    id: string;
}
/**
 * Body of the «Details» modal of a multi-pet task (Figma
 * `MultiActionDetailsContent`): one shared task header and a card per pet.
 */
export interface MultiActionDetailsContentProps {
    /** Props of the shared header (Figma instance `Шапка` › `TodayTaskHeader`). */
    header: TodayTaskHeaderProps;
    /**
     * Pet cards (Figma instances `Карточка · …` › `TodayTaskCard` with
     * `hasHeader=false`), drawn top to bottom.
     */
    items: MultiActionDetailsContentItem[];
    /**
     * A modal opened from inside this body (e.g. the «⋮» sheet). Rendered inside
     * the body, not as a sibling of the parent modal: iOS shows only one level.
     */
    nestedOverlay?: ReactNode;
    /** Outer style. The body fills its parent. Applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the body. */
    testID?: string;
    /** Test identifier of the scrolling card list. */
    listTestID?: string;
}
//# sourceMappingURL=MultiActionDetailsContent.types.d.ts.map