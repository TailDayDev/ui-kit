"use strict";

import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Text } from "../../primitives/Text/index.js";
import { useTheme } from "../../theme/index.js";
import { LoadingWrapper } from "../LoadingWrapper/index.js";
import { ChipGroupSkeleton } from "./ChipGroupSkeleton.js";
import { getChipGroupVariantConfig } from "./chipGroupVariantConfig.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ALL_CHIP_ID = '__all__';
// App FlatList tuning for long chip rows.
const CHIP_GROUP_INITIAL_RENDER_COUNT = 8;
const CHIP_GROUP_MAX_RENDER_BATCH = 8;
const CHIP_GROUP_BATCHING_PERIOD_MS = 80;
const CHIP_GROUP_WINDOW_SIZE = 5;
/** Retry delay after `scrollToIndex` fails on a not-yet-measured item. */
const SCROLL_RETRY_DELAY_MS = 50;
const getChipKey = item => String(item.id);
const getStyles = ({
  badgeBorderRadius,
  badgeHeight,
  badgeMinWidth,
  badgePaddingHorizontal,
  badgePaddingVertical,
  chipBorderRadius,
  chipContentGap,
  chipPaddingHorizontal,
  chipPaddingLeft,
  chipPaddingRight,
  chipPaddingVertical,
  itemHeight,
  theme,
  usesFixedChipHeight
}) => StyleSheet.create({
  root: {
    minHeight: itemHeight
  },
  listContent: {
    alignItems: 'center',
    minHeight: itemHeight
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: chipContentGap,
    ...(usesFixedChipHeight ? {
      height: itemHeight,
      paddingVertical: 0
    } : {
      paddingVertical: chipPaddingVertical
    }),
    paddingHorizontal: chipPaddingHorizontal,
    paddingLeft: chipPaddingLeft,
    paddingRight: chipPaddingRight,
    borderWidth: theme.stroke[1],
    borderRadius: chipBorderRadius,
    justifyContent: 'center'
  },
  chipUnselected: {
    backgroundColor: theme.colors.bg.surface,
    borderColor: theme.colors.border.default
  },
  chipSelected: {
    backgroundColor: theme.colors.bg.accentSoft,
    borderColor: theme.palette.primary
  },
  badge: {
    paddingHorizontal: badgePaddingHorizontal,
    paddingVertical: badgePaddingVertical,
    minWidth: badgeMinWidth,
    height: badgeHeight,
    borderRadius: badgeBorderRadius,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const ChipGroupComponent = ({
  items,
  value,
  onChange,
  variant = 'compact',
  showAll = true,
  allLabel = '',
  isLoading = false,
  gap,
  itemHeight,
  chipBorderRadius,
  chipPaddingHorizontal,
  chipPaddingLeft,
  chipPaddingRight,
  contentPaddingHorizontal,
  selectedTextStyle,
  unselectedTextStyle,
  badgeTextStyle,
  selectedBadgeTextColor,
  unselectedBadgeTextColor,
  badgeMinWidth,
  badgeHeight,
  chipContentGap,
  scrollToSelectedOnMount = true,
  testIDPrefix
}) => {
  const theme = useTheme();
  const variantConfig = useMemo(() => getChipGroupVariantConfig(variant), [variant]);
  const resolvedGap = gap ?? variantConfig.gap;
  const resolvedItemHeight = itemHeight ?? variantConfig.itemHeight;
  const resolvedContentPaddingHorizontal = contentPaddingHorizontal ?? variantConfig.contentPaddingHorizontal;
  const styles = useMemo(() => getStyles({
    ...variantConfig,
    badgeHeight,
    badgeMinWidth: badgeMinWidth ?? variantConfig.badgeMinWidth,
    chipBorderRadius: chipBorderRadius ?? variantConfig.chipBorderRadius,
    chipContentGap: chipContentGap ?? variantConfig.chipContentGap,
    chipPaddingHorizontal: chipPaddingHorizontal ?? variantConfig.chipPaddingHorizontal,
    chipPaddingLeft: chipPaddingLeft ?? variantConfig.chipPaddingLeft,
    chipPaddingRight: chipPaddingRight ?? variantConfig.chipPaddingRight,
    itemHeight: resolvedItemHeight,
    theme
  }), [badgeHeight, badgeMinWidth, chipBorderRadius, chipContentGap, chipPaddingHorizontal, chipPaddingLeft, chipPaddingRight, resolvedItemHeight, theme, variantConfig]);
  const listRef = useRef(null);
  const didScrollRef = useRef(false);
  const data = useMemo(() => {
    const allChip = {
      id: ALL_CHIP_ID,
      name: allLabel
    };
    return showAll ? [allChip, ...items] : [...items];
  }, [items, showAll, allLabel]);
  const selectedIndex = useMemo(() => {
    if (value === null) {
      return showAll ? 0 : -1;
    }
    return data.findIndex(it => String(it.id) === String(value));
  }, [data, value, showAll]);
  useEffect(() => {
    if (!scrollToSelectedOnMount || didScrollRef.current) {
      return;
    }
    if (selectedIndex > 0 && listRef.current) {
      didScrollRef.current = true;
      requestAnimationFrame(() => {
        listRef.current?.scrollToIndex({
          index: selectedIndex,
          animated: false
        });
      });
    }
  }, [scrollToSelectedOnMount, selectedIndex]);
  const edgeSpacerStyle = useMemo(() => ({
    width: resolvedContentPaddingHorizontal
  }), [resolvedContentPaddingHorizontal]);
  const separatorStyle = useMemo(() => ({
    width: resolvedGap
  }), [resolvedGap]);
  const renderEdgeSpacer = useCallback(() => /*#__PURE__*/_jsx(View, {
    style: edgeSpacerStyle
  }), [edgeSpacerStyle]);
  const renderSeparator = useCallback(() => /*#__PURE__*/_jsx(View, {
    style: separatorStyle
  }), [separatorStyle]);
  const isFilterVariant = variant === 'filter';
  const renderItem = useCallback(({
    item
  }) => {
    const isAll = item.id === ALL_CHIP_ID;
    const isSelected = isAll ? value === null : String(value) === String(item.id);
    const count = !isAll && 'count' in item ? item.count : undefined;
    const hasBadge = typeof count === 'number';
    let labelVariant;
    if (isFilterVariant) {
      labelVariant = isSelected ? 'body/medium' : 'body/regular';
    } else {
      labelVariant = isSelected ? 'caption/bold' : 'caption/medium';
    }
    let badgeBackgroundColor;
    let badgeTextColor;
    if (isFilterVariant) {
      badgeBackgroundColor = isSelected ? theme.colors.bg.accent : theme.colors.bg.subtle;
      badgeTextColor = isSelected ? theme.colors.text.inverse : theme.colors.text.primary;
    } else {
      badgeBackgroundColor = isSelected ? theme.colors.bg.accent : theme.colors.bg.accentSoft;
      badgeTextColor = isSelected ? selectedBadgeTextColor ?? theme.colors.text.inverse : unselectedBadgeTextColor ?? theme.colors.text.accent;
    }
    return /*#__PURE__*/_jsxs(Pressable, {
      onPress: () => onChange(isAll ? null : String(item.id)),
      style: [styles.chip, isSelected ? styles.chipSelected : styles.chipUnselected],
      accessibilityRole: "button",
      accessibilityState: {
        selected: isSelected
      },
      testID: testIDPrefix ? `${testIDPrefix}.${isAll ? 'all' : String(item.id)}` : undefined,
      children: [/*#__PURE__*/_jsx(Text, {
        variant: labelVariant,
        color: isSelected ? 'accent' : 'primary',
        numberOfLines: 1,
        ellipsizeMode: "tail",
        style: isSelected ? selectedTextStyle : unselectedTextStyle,
        children: item.name
      }), hasBadge ? /*#__PURE__*/_jsx(View, {
        style: [styles.badge, {
          backgroundColor: badgeBackgroundColor
        }],
        children: /*#__PURE__*/_jsx(Text, {
          variant: isFilterVariant ? 'body/regular' : 'caption/medium',
          style: [{
            color: badgeTextColor
          }, badgeTextStyle],
          children: count
        })
      }) : null]
    });
  }, [badgeTextStyle, isFilterVariant, onChange, selectedBadgeTextColor, selectedTextStyle, styles.badge, styles.chip, styles.chipSelected, styles.chipUnselected, theme.colors.bg.accent, theme.colors.bg.accentSoft, theme.colors.bg.subtle, theme.colors.text.accent, theme.colors.text.inverse, theme.colors.text.primary, testIDPrefix, unselectedBadgeTextColor, unselectedTextStyle, value]);
  return /*#__PURE__*/_jsx(LoadingWrapper, {
    loading: isLoading,
    skeleton: /*#__PURE__*/_jsx(ChipGroupSkeleton, {
      variant: variant
    }),
    fitContent: true,
    style: styles.root,
    children: /*#__PURE__*/_jsx(FlatList, {
      ref: listRef,
      data: data,
      keyExtractor: getChipKey,
      horizontal: true,
      renderItem: renderItem,
      ListHeaderComponent: renderEdgeSpacer,
      ListFooterComponent: renderEdgeSpacer,
      ItemSeparatorComponent: renderSeparator,
      contentContainerStyle: styles.listContent,
      showsHorizontalScrollIndicator: false,
      extraData: value,
      initialNumToRender: CHIP_GROUP_INITIAL_RENDER_COUNT,
      maxToRenderPerBatch: CHIP_GROUP_MAX_RENDER_BATCH,
      removeClippedSubviews: Platform.OS === 'android',
      updateCellsBatchingPeriod: CHIP_GROUP_BATCHING_PERIOD_MS,
      windowSize: CHIP_GROUP_WINDOW_SIZE,
      onScrollToIndexFailed: info => {
        setTimeout(() => {
          listRef.current?.scrollToIndex({
            index: info.index,
            animated: false
          });
        }, SCROLL_RETRY_DELAY_MS);
      }
    })
  });
};

/** Horizontal, scrollable single-select chip row with optional counts. Figma: `Chip`. */
export const ChipGroup = /*#__PURE__*/memo(ChipGroupComponent);
//# sourceMappingURL=ChipGroup.js.map