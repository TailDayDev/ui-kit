import type { StyleProp, ViewStyle } from 'react-native';
import type { IconComponent } from '../../primitives/Icon';
/** One tab of `CustomTabBar`. */
export interface CustomTabBarTab {
    /** Unique key, reported back by the callbacks and matched with `activeKey`. */
    key: string;
    /** Tab glyph (Figma: `IconTabToday`, `IconTabCalendar`, `IconTabService`, `IconTabMenu`). */
    icon: IconComponent;
    /** Screen-reader name of the tab (the bar has no visible labels). */
    accessibilityLabel: string;
    /** Shows the dot badge at the icon corner. Figma `TabBarItem` `hasBadge`. */
    hasBadge?: boolean;
    /** Test identifier of the tab. */
    testID?: string;
}
/** Props of `CustomTabBar` (Figma `CustomTabBar`): the floating bottom tab bar. */
export interface CustomTabBarProps {
    /** Tabs in display order. */
    tabs: readonly CustomTabBarTab[];
    /**
     * Key of the focused tab; the indicator slides under it. Figma VARIANT
     * `activeTab` (`today` | `calendar` | `service` | `menu`). A key not in
     * `tabs` keeps the indicator on the last focused tab.
     */
    activeKey: string;
    /** Called on tap (release) of a tab; also covers VoiceOver activation. */
    onTabPress: (key: string) => void;
    /** Called as the finger touches a tab, e.g. to switch a tap earlier. */
    onTabPressIn?: (key: string) => void;
    /** Called on long press of a tab. */
    onTabLongPress?: (key: string) => void;
    /** Outer style of the backdrop area (e.g. absolute positioning). Applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the bar. */
    testID?: string;
}
//# sourceMappingURL=CustomTabBar.types.d.ts.map