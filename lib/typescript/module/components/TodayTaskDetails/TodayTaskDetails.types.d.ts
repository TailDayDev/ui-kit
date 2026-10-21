import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
/**
 * What to do for a task (Figma `TodayTaskDetails`): food, medicine, service or
 * the text of a manual task, under a divider.
 */
export interface TodayTaskDetailsProps {
    /** Task name (`body/bold`). Figma `title`. */
    title: string;
    /** Shows the 24pt icon before the title. Figma `hasIcon`. Defaults to `true`. */
    hasIcon?: boolean;
    /**
     * 24×24 artwork before the title (Figma `Иконка · img:dry_food_icon`). The
     * kit does not bundle these raster images: the app passes a ready element.
     */
    icon?: ReactNode;
    /** Shows the amount at the right. Figma `hasTrailing`. Defaults to `true`. */
    hasTrailing?: boolean;
    /** Amount at the right, e.g. "200 g" (`body/regular`). Figma `trailing`. */
    trailing?: string;
    /** Shows the note under the title. Figma `hasNote`. Defaults to `true`. */
    hasNote?: boolean;
    /** Note (`caption/regular`, secondary). Figma `note`. */
    note?: string;
    /** Outer style. Applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the block. */
    testID?: string;
    /** Test identifier of the title text. */
    titleTestID?: string;
}
//# sourceMappingURL=TodayTaskDetails.types.d.ts.map