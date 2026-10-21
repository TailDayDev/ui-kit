import type { ChipGroupVariant } from './ChipGroup.types';
/** Resolved metrics of one ChipGroup variant. */
export interface ChipGroupVariantConfig {
    badgeBorderRadius: number;
    badgeMinWidth: number;
    badgePaddingHorizontal: number;
    badgePaddingVertical: number;
    chipBorderRadius: number;
    chipContentGap: number;
    chipPaddingHorizontal: number;
    chipPaddingLeft: number;
    chipPaddingRight: number;
    chipPaddingVertical: number;
    contentPaddingHorizontal: number;
    gap: number;
    itemHeight: number;
    usesFixedChipHeight: boolean;
}
/** Metrics for a ChipGroup variant. */
export declare const getChipGroupVariantConfig: (variant: ChipGroupVariant) => ChipGroupVariantConfig;
//# sourceMappingURL=chipGroupVariantConfig.d.ts.map