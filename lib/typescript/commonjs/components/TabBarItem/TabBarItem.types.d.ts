import type { StyleProp, ViewStyle } from 'react-native';
import type { IconComponent } from '../../primitives/Icon';
/** Props of `TabBarItem` (Figma `TabBarItem`): one icon-only bottom tab. */
export interface TabBarItemProps {
    /** Section glyph. Figma INSTANCE_SWAP `icon`. Defaults to `IconTabToday`. */
    icon?: IconComponent;
    /** Focused (current) tab: accent icon. Figma VARIANT `isFocused`. Defaults to `true`. */
    isFocused?: boolean;
    /** Shows the 6pt dot at the icon corner. Figma BOOLEAN `hasBadge`. Defaults to `false`. */
    hasBadge?: boolean;
    /** Screen-reader name of the tab (the tab has no visible label). */
    accessibilityLabel: string;
    /** Called on tap (release); also covers VoiceOver / Switch Control activation. */
    onPress?: () => void;
    /** Called as the finger touches down, e.g. to switch tabs a tap earlier. */
    onPressIn?: () => void;
    /** Called on long press. */
    onLongPress?: () => void;
    /** Outer style, e.g. `flex: 1` inside a bar. Applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier. The badge gets `${testID}.badge`. */
    testID?: string;
}
//# sourceMappingURL=TabBarItem.types.d.ts.map