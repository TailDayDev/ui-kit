"use strict";

import { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BaseSkeleton } from "../BaseSkeleton/index.js";
import { getChipGroupVariantConfig } from "./chipGroupVariantConfig.js";

/** App placeholder chip widths. */
import { jsx as _jsx } from "react/jsx-runtime";
const SKELETON_CHIP_WIDTHS = [40, 90, 50, 90];
const styles = StyleSheet.create({
  content: {
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  }
});
const ChipGroupSkeletonComponent = ({
  variant = 'compact'
}) => {
  const config = getChipGroupVariantConfig(variant);
  return /*#__PURE__*/_jsx(ScrollView, {
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: [styles.content, {
      minHeight: config.itemHeight,
      paddingHorizontal: config.contentPaddingHorizontal
    }],
    children: /*#__PURE__*/_jsx(View, {
      style: [styles.row, {
        columnGap: config.gap
      }],
      children: SKELETON_CHIP_WIDTHS.map((width, index) => /*#__PURE__*/_jsx(BaseSkeleton
      // Static placeholder list; widths repeat, so position is the key.
      , {
        height: config.itemHeight,
        width: width,
        borderRadius: config.chipBorderRadius
      }, index))
    })
  });
};

/** Placeholder row shown while the chips load. */
export const ChipGroupSkeleton = /*#__PURE__*/memo(ChipGroupSkeletonComponent);
//# sourceMappingURL=ChipGroupSkeleton.js.map