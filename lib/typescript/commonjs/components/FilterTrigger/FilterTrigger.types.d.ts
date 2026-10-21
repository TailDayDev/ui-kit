import type { StyleProp, ViewStyle } from 'react-native';
/** Round filter button with an active-filter count badge. */
export interface FilterTriggerProps {
    /** Test identifier. */
    testID?: string;
    /** Active filter count. The badge shows for > 0 and caps at "999+". Defaults to 0. */
    count?: number;
    /** Called on tap. */
    onPress?: () => void;
    /** Blocks the press and dims the button to 0.6. */
    disabled?: boolean;
    /** Outer style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Screen-reader label. Required: the button has no visible text. */
    accessibilityLabel: string;
}
//# sourceMappingURL=FilterTrigger.types.d.ts.map