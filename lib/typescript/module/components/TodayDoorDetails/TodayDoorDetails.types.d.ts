import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
/** Figma `TodayDoorDetails` › `actionType` options. */
export type TodayDoorDetailsActionType = 'CheckIn' | 'CheckOut';
/**
 * Where the pet stays and the booking dates in a check-in / check-out card
 * (Figma `TodayDoorDetails`).
 */
export interface TodayDoorDetailsProps {
    /** Check-in or check-out: picks which date is emphasised (or shown for daycare). Figma `actionType`. Defaults to `'CheckIn'`. */
    actionType?: TodayDoorDetailsActionType;
    /** Daycare booking: shows only the date of `actionType`. Figma `isDaycare`. Defaults to `false`. */
    isDaycare?: boolean;
    /** Placement name (`body/bold`, one line). Figma `title`. */
    title: string;
    /** Check-in date (`body/regular`). Figma `checkInDate`. */
    checkInDate?: string;
    /** Check-out date (`body/regular`). Figma `checkOutDate`. */
    checkOutDate?: string;
    /**
     * 40×40 placement image (Figma `Картинка места · с сервера`, or
     * `DayCareIcon` for daycare). The app passes a ready element.
     */
    icon?: ReactNode;
    /** Outer style. Applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the block. */
    testID?: string;
    /** Test identifier of the title text. */
    titleTestID?: string;
}
//# sourceMappingURL=TodayDoorDetails.types.d.ts.map