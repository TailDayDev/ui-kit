import { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BaseSkeleton } from '../BaseSkeleton';
import type { ChipGroupSkeletonProps } from './ChipGroup.types';
import { getChipGroupVariantConfig } from './chipGroupVariantConfig';

/** App placeholder chip widths. */
const SKELETON_CHIP_WIDTHS = [40, 90, 50, 90] as const;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

const ChipGroupSkeletonComponent = ({
  variant = 'compact',
}: ChipGroupSkeletonProps) => {
  const config = getChipGroupVariantConfig(variant);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        {
          minHeight: config.itemHeight,
          paddingHorizontal: config.contentPaddingHorizontal,
        },
      ]}
    >
      <View style={[styles.row, { columnGap: config.gap }]}>
        {SKELETON_CHIP_WIDTHS.map((width, index) => (
          <BaseSkeleton
            // Static placeholder list; widths repeat, so position is the key.
            key={index}
            height={config.itemHeight}
            width={width}
            borderRadius={config.chipBorderRadius}
          />
        ))}
      </View>
    </ScrollView>
  );
};

/** Placeholder row shown while the chips load. */
export const ChipGroupSkeleton = memo(ChipGroupSkeletonComponent);
