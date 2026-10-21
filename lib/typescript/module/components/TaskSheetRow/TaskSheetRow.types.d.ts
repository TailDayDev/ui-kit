import type { StyleProp, ViewStyle } from 'react-native';
import type { IconComponent } from '../../primitives/Icon/index.js';
/** Action row of the task sheet (Figma `TaskSheetRow`): label left, 20pt icon right. */
export interface TaskSheetRowProps {
    /** Row text. Figma TEXT `label`. */
    label: string;
    /** Icon on the right. Figma INSTANCE_SWAP `icon`. Defaults to `IconCalendarDays`. */
    icon?: IconComponent;
    /** Destructive action: the icon turns red (the label stays dark). Figma VARIANT `isDestructive`. Defaults to `false`. */
    isDestructive?: boolean;
    /** Called on tap. */
    onPress?: () => void;
    /** Blocks the press and dims the row (`theme.opacity.disabled`, app 0.45). Not in Figma. */
    disabled?: boolean;
    /** Screen-reader label. Defaults to `label`. */
    accessibilityLabel?: string;
    /** Outer layout style, applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the row. */
    testID?: string;
}
//# sourceMappingURL=TaskSheetRow.types.d.ts.map