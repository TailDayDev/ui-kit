import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
/** Figma `TodayTaskTypeBadge` › `actionType` options. */
export type TodayTaskActionType = 'CheckIn' | 'CheckOut' | 'Feeding' | 'Medication' | 'AdditionalService' | 'Manual' | 'Transfer';
/**
 * Task type label of a Today task card (Figma `TodayTaskTypeBadge`): an icon
 * and the type name in the type's colors; check-in / check-out may add one or
 * two care types after a dot.
 */
export interface TodayTaskTypeBadgeProps {
    /** Task type: picks the fill and text color. Figma `actionType`. Defaults to `'CheckIn'`. */
    actionType?: TodayTaskActionType;
    /** Type name, e.g. "Check-in". Figma `label`. */
    label: string;
    /**
     * 24×24 type artwork before the label (Figma `Иконка` image, e.g.
     * `TodayTaskCheckInIcon`, `dry_food_icon`). The kit does not bundle these
     * raster images: the app passes a ready element (`DinamicImage`).
     */
    icon?: ReactNode;
    /** Shows the first care type after a dot. Figma `hasCareType`. Defaults to `false`. */
    hasCareType?: boolean;
    /** First care type, one line, truncated. Figma `careType`. */
    careType?: string;
    /** Shows the second care type after another dot. Figma `hasSecondCareType`. Defaults to `false`. */
    hasSecondCareType?: boolean;
    /** Second care type, one line, truncated. Figma `secondCareType`. */
    secondCareType?: string;
    /** Outer style, e.g. `maxWidth` from the header. Applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the badge. */
    testID?: string;
}
//# sourceMappingURL=TodayTaskTypeBadge.types.d.ts.map