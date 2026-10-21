import type { TextStyle } from 'react-native';
/**
 * `compact`: 32pt chips, radius 8, caption text (Figma `Chip`).
 * `filter`: content-sized pills, radius 38, body text.
 */
export type ChipGroupVariant = 'compact' | 'filter';
/** One selectable chip. */
export interface ChipItem {
    /** Unique id; compared as a string with `value`. */
    id: string | number;
    /** Chip label. */
    name: string;
    /** Count shown in a badge next to the label. No badge when omitted. */
    count?: number;
}
/** Props shared by both `showAll` modes. */
export interface ChipGroupBaseProps {
    /** Chips to render after the optional "All" chip. */
    items: ChipItem[];
    /** Selected chip id as a string; `null` selects "All" (or nothing without it). */
    value: string | null;
    /** Called with the tapped chip id as a string, or `null` for "All". */
    onChange: (id: string | null) => void;
    /** Visual variant. Defaults to `'compact'`. */
    variant?: ChipGroupVariant;
    /** Gap between chips. Defaults to the variant value (4 / 8). */
    gap?: number;
    /** Shows `ChipGroupSkeleton` instead of the chips. */
    isLoading?: boolean;
    /** Chip height (compact) or list min height (filter). Defaults to the variant value (32 / 41). */
    itemHeight?: number;
    /** Chip corner radius. Defaults to the variant value (8 / 38). */
    chipBorderRadius?: number;
    /** Chip horizontal padding. Defaults to the variant value. */
    chipPaddingHorizontal?: number;
    /** Chip left padding. Defaults to the variant value. */
    chipPaddingLeft?: number;
    /** Chip right padding. Defaults to the variant value. */
    chipPaddingRight?: number;
    /** Space before the first and after the last chip. Defaults to 16 (compact) / 0 (filter). */
    contentPaddingHorizontal?: number;
    /** Extra label style of the selected chip. */
    selectedTextStyle?: TextStyle;
    /** Extra label style of unselected chips. */
    unselectedTextStyle?: TextStyle;
    /** Extra style of the count text. */
    badgeTextStyle?: TextStyle;
    /** Compact only: count color on the selected chip. Defaults to `colors.text.inverse`. */
    selectedBadgeTextColor?: string;
    /** Compact only: count color on unselected chips. Defaults to `colors.text.accent`. */
    unselectedBadgeTextColor?: string;
    /** Badge minimum width. Defaults to 20. */
    badgeMinWidth?: number;
    /** Badge fixed height. Content-sized when omitted. */
    badgeHeight?: number;
    /** Gap between label and badge. Defaults to the variant value (4 / 8). */
    chipContentGap?: number;
    /** Scrolls the selected chip into view once on mount. Defaults to `true`. */
    scrollToSelectedOnMount?: boolean;
    /** Chip test ids become `${testIDPrefix}.${id}` (`.all` for "All"). */
    testIDPrefix?: string;
}
/** With the leading "All" chip (default). */
export interface ChipGroupWithAllProps extends ChipGroupBaseProps {
    /** Renders a leading "All" chip that maps to `value: null`. Defaults to `true`. */
    showAll?: true;
    /** Label of the "All" chip. The app wrapper passes the translated text. */
    allLabel: string;
}
/** Without the "All" chip. */
export interface ChipGroupWithoutAllProps extends ChipGroupBaseProps {
    showAll: false;
    /** Not used without the "All" chip. */
    allLabel?: string;
}
/** Horizontal, scrollable single-select chip row. Figma: `Chip`. */
export type ChipGroupProps = ChipGroupWithAllProps | ChipGroupWithoutAllProps;
/** Placeholder row shown while the chips load. */
export interface ChipGroupSkeletonProps {
    /** Matches the chip height, radius and spacing of this variant. Defaults to `'compact'`. */
    variant?: ChipGroupVariant;
}
//# sourceMappingURL=ChipGroup.types.d.ts.map