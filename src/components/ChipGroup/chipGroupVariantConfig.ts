import {
  CHIP_GROUP_COMPACT_BADGE_BORDER_RADIUS,
  CHIP_GROUP_COMPACT_BADGE_MIN_WIDTH,
  CHIP_GROUP_COMPACT_BADGE_PADDING_HORIZONTAL,
  CHIP_GROUP_COMPACT_BORDER_RADIUS,
  CHIP_GROUP_COMPACT_CONTENT_GAP,
  CHIP_GROUP_COMPACT_PADDING_HORIZONTAL,
  CHIP_GROUP_FILTER_BADGE_BORDER_RADIUS,
  CHIP_GROUP_FILTER_BADGE_MIN_WIDTH,
  CHIP_GROUP_FILTER_BADGE_PADDING_HORIZONTAL,
  CHIP_GROUP_FILTER_BADGE_PADDING_VERTICAL,
  CHIP_GROUP_FILTER_BORDER_RADIUS,
  CHIP_GROUP_FILTER_CONTENT_GAP,
  CHIP_GROUP_FILTER_GAP,
  CHIP_GROUP_FILTER_MIN_HEIGHT,
  CHIP_GROUP_FILTER_PADDING_LEFT,
  CHIP_GROUP_FILTER_PADDING_RIGHT,
  CHIP_GROUP_FILTER_PADDING_VERTICAL,
  CHIP_GROUP_GAP,
  CHIP_GROUP_HORIZONTAL_PADDING,
  CHIP_GROUP_ITEM_HEIGHT,
} from './constants';
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

const FILTER_CONFIG: ChipGroupVariantConfig = {
  badgeBorderRadius: CHIP_GROUP_FILTER_BADGE_BORDER_RADIUS,
  badgeMinWidth: CHIP_GROUP_FILTER_BADGE_MIN_WIDTH,
  badgePaddingHorizontal: CHIP_GROUP_FILTER_BADGE_PADDING_HORIZONTAL,
  badgePaddingVertical: CHIP_GROUP_FILTER_BADGE_PADDING_VERTICAL,
  chipBorderRadius: CHIP_GROUP_FILTER_BORDER_RADIUS,
  chipContentGap: CHIP_GROUP_FILTER_CONTENT_GAP,
  chipPaddingHorizontal: CHIP_GROUP_FILTER_PADDING_LEFT,
  chipPaddingLeft: CHIP_GROUP_FILTER_PADDING_LEFT,
  chipPaddingRight: CHIP_GROUP_FILTER_PADDING_RIGHT,
  chipPaddingVertical: CHIP_GROUP_FILTER_PADDING_VERTICAL,
  contentPaddingHorizontal: 0,
  gap: CHIP_GROUP_FILTER_GAP,
  itemHeight: CHIP_GROUP_FILTER_MIN_HEIGHT,
  usesFixedChipHeight: false,
};

const COMPACT_CONFIG: ChipGroupVariantConfig = {
  badgeBorderRadius: CHIP_GROUP_COMPACT_BADGE_BORDER_RADIUS,
  badgeMinWidth: CHIP_GROUP_COMPACT_BADGE_MIN_WIDTH,
  badgePaddingHorizontal: CHIP_GROUP_COMPACT_BADGE_PADDING_HORIZONTAL,
  badgePaddingVertical: 0,
  chipBorderRadius: CHIP_GROUP_COMPACT_BORDER_RADIUS,
  chipContentGap: CHIP_GROUP_COMPACT_CONTENT_GAP,
  chipPaddingHorizontal: CHIP_GROUP_COMPACT_PADDING_HORIZONTAL,
  chipPaddingLeft: CHIP_GROUP_COMPACT_PADDING_HORIZONTAL,
  chipPaddingRight: CHIP_GROUP_COMPACT_PADDING_HORIZONTAL,
  chipPaddingVertical: 0,
  contentPaddingHorizontal: CHIP_GROUP_HORIZONTAL_PADDING,
  gap: CHIP_GROUP_GAP,
  itemHeight: CHIP_GROUP_ITEM_HEIGHT,
  usesFixedChipHeight: true,
};

/** Metrics for a ChipGroup variant. */
export const getChipGroupVariantConfig = (
  variant: ChipGroupVariant,
): ChipGroupVariantConfig =>
  variant === 'filter' ? FILTER_CONFIG : COMPACT_CONFIG;
