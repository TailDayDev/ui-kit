import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { ServiceHeaderTriggerProps } from '../ServiceHeaderTrigger';
/** The round search button on the right of the header row. */
export interface ServiceHeaderSearch {
    /** Opens search. */
    onPress: () => void;
    /** Screen-reader text (icon-only button). */
    accessibilityLabel: string;
    /** Test identifier of the button. */
    testID?: string;
}
/** Props shared by both `forceTitleOnly` variants. */
interface ServiceHeaderBaseProps {
    /** Shows the search button. Figma BOOLEAN `hasSearch`. Defaults to `true`; needs `search`. Not shown with `forceTitleOnly`. */
    hasSearch?: boolean;
    /** Search button callback and label. No button without it. */
    search?: ServiceHeaderSearch;
    /** Shows the bottom row. Figma BOOLEAN `hasBottomContent`. Defaults to `true`; needs `bottomContent`. */
    hasBottomContent?: boolean;
    /**
     * Row under the header line, usually a `ChipGroup` or a row of `Chip`s.
     * Figma INSTANCE_SWAP `bottomContent`. Spans the full width: the content
     * brings its own 16pt side padding (as `ChipGroup` does).
     */
    bottomContent?: ReactNode;
    /** Outer style, e.g. a top safe-area padding. Applied last. */
    style?: StyleProp<ViewStyle>;
    /** Test identifier of the header surface. */
    testID?: string;
}
/** Figma `forceTitleOnly=false`: hotel selector on the left. */
export interface ServiceHeaderSelectorProps extends ServiceHeaderBaseProps {
    /** Figma VARIANT `forceTitleOnly`. Defaults to `false`. */
    forceTitleOnly?: false;
    /** The hotel selector (Figma nested `ServiceHeaderTrigger`). */
    trigger: ServiceHeaderTriggerProps;
    title?: never;
}
/** Figma `forceTitleOnly=true`: a plain screen title, no selector and no search. */
export interface ServiceHeaderTitleOnlyProps extends ServiceHeaderBaseProps {
    /** Figma VARIANT `forceTitleOnly`. */
    forceTitleOnly: true;
    /** Screen title. Figma TEXT `title`. */
    title: string;
    trigger?: never;
}
/** Props of `ServiceHeader` (Figma `ServiceHeader`): header of the hotel sections. */
export type ServiceHeaderProps = ServiceHeaderSelectorProps | ServiceHeaderTitleOnlyProps;
export {};
//# sourceMappingURL=ServiceHeader.types.d.ts.map