"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChipGroupVariantConfig = void 0;
var _constants = require("./constants.js");
/** Resolved metrics of one ChipGroup variant. */

const FILTER_CONFIG = {
  badgeBorderRadius: _constants.CHIP_GROUP_FILTER_BADGE_BORDER_RADIUS,
  badgeMinWidth: _constants.CHIP_GROUP_FILTER_BADGE_MIN_WIDTH,
  badgePaddingHorizontal: _constants.CHIP_GROUP_FILTER_BADGE_PADDING_HORIZONTAL,
  badgePaddingVertical: _constants.CHIP_GROUP_FILTER_BADGE_PADDING_VERTICAL,
  chipBorderRadius: _constants.CHIP_GROUP_FILTER_BORDER_RADIUS,
  chipContentGap: _constants.CHIP_GROUP_FILTER_CONTENT_GAP,
  chipPaddingHorizontal: _constants.CHIP_GROUP_FILTER_PADDING_LEFT,
  chipPaddingLeft: _constants.CHIP_GROUP_FILTER_PADDING_LEFT,
  chipPaddingRight: _constants.CHIP_GROUP_FILTER_PADDING_RIGHT,
  chipPaddingVertical: _constants.CHIP_GROUP_FILTER_PADDING_VERTICAL,
  contentPaddingHorizontal: 0,
  gap: _constants.CHIP_GROUP_FILTER_GAP,
  itemHeight: _constants.CHIP_GROUP_FILTER_MIN_HEIGHT,
  usesFixedChipHeight: false
};
const COMPACT_CONFIG = {
  badgeBorderRadius: _constants.CHIP_GROUP_COMPACT_BADGE_BORDER_RADIUS,
  badgeMinWidth: _constants.CHIP_GROUP_COMPACT_BADGE_MIN_WIDTH,
  badgePaddingHorizontal: _constants.CHIP_GROUP_COMPACT_BADGE_PADDING_HORIZONTAL,
  badgePaddingVertical: 0,
  chipBorderRadius: _constants.CHIP_GROUP_COMPACT_BORDER_RADIUS,
  chipContentGap: _constants.CHIP_GROUP_COMPACT_CONTENT_GAP,
  chipPaddingHorizontal: _constants.CHIP_GROUP_COMPACT_PADDING_HORIZONTAL,
  chipPaddingLeft: _constants.CHIP_GROUP_COMPACT_PADDING_HORIZONTAL,
  chipPaddingRight: _constants.CHIP_GROUP_COMPACT_PADDING_HORIZONTAL,
  chipPaddingVertical: 0,
  contentPaddingHorizontal: _constants.CHIP_GROUP_HORIZONTAL_PADDING,
  gap: _constants.CHIP_GROUP_GAP,
  itemHeight: _constants.CHIP_GROUP_ITEM_HEIGHT,
  usesFixedChipHeight: true
};

/** Metrics for a ChipGroup variant. */
const getChipGroupVariantConfig = variant => variant === 'filter' ? FILTER_CONFIG : COMPACT_CONFIG;
exports.getChipGroupVariantConfig = getChipGroupVariantConfig;
//# sourceMappingURL=chipGroupVariantConfig.js.map