import type { StyleProp, ViewStyle } from 'react-native';
import type { TodayTaskTimeProps } from '../TodayTaskTime';
import type { TodayTaskTypeBadgeProps } from '../TodayTaskTypeBadge';
/**
 * Header of a Today task card (Figma `TodayTaskHeader`): the task type badge
 * on the left and the task time on the right, bottom-aligned.
 */
export interface TodayTaskHeaderProps {
    /** Props of the left badge (Figma instance `Метка типа` › `TodayTaskTypeBadge`). */
    badge: TodayTaskTypeBadgeProps;
    /** Props of the right time (Figma instance `Время` › `TodayTaskTime`). Omit to show no time. */
    time?: TodayTaskTimeProps;
    /** Outer style. Applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the header row. */
    testID?: string;
}
//# sourceMappingURL=TodayTaskHeader.types.d.ts.map