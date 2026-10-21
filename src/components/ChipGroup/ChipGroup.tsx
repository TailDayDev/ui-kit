import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ListRenderItem,
  type ViewStyle,
} from 'react-native';

import { Text } from '../../primitives/Text';
import { useTheme, type Theme } from '../../theme';
import type { TypographyVariant } from '../../tokens';
import { LoadingWrapper } from '../LoadingWrapper';
import type { ChipGroupProps, ChipItem } from './ChipGroup.types';
import { ChipGroupSkeleton } from './ChipGroupSkeleton';
import { getChipGroupVariantConfig } from './chipGroupVariantConfig';

const ALL_CHIP_ID = '__all__';

interface AllChip {
  id: typeof ALL_CHIP_ID;
  name: string;
}
type InternalChipItem = ChipItem | AllChip;

// App FlatList tuning for long chip rows.
const CHIP_GROUP_INITIAL_RENDER_COUNT = 8;
const CHIP_GROUP_MAX_RENDER_BATCH = 8;
const CHIP_GROUP_BATCHING_PERIOD_MS = 80;
const CHIP_GROUP_WINDOW_SIZE = 5;
/** Retry delay after `scrollToIndex` fails on a not-yet-measured item. */
const SCROLL_RETRY_DELAY_MS = 50;

const getChipKey = (item: InternalChipItem): string => String(item.id);

interface GetStylesParams {
  theme: Theme;
  itemHeight: number;
  chipBorderRadius: number;
  chipPaddingHorizontal: number;
  chipPaddingLeft: number;
  chipPaddingRight: number;
  chipPaddingVertical: number;
  chipContentGap: number;
  badgeMinWidth: number;
  badgeBorderRadius: number;
  badgePaddingHorizontal: number;
  badgePaddingVertical: number;
  badgeHeight?: number;
  usesFixedChipHeight: boolean;
}

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
  usesFixedChipHeight,
}: GetStylesParams) =>
  StyleSheet.create({
    root: {
      minHeight: itemHeight,
    },
    listContent: {
      alignItems: 'center',
      minHeight: itemHeight,
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: chipContentGap,
      ...(usesFixedChipHeight
        ? { height: itemHeight, paddingVertical: 0 }
        : { paddingVertical: chipPaddingVertical }),
      paddingHorizontal: chipPaddingHorizontal,
      paddingLeft: chipPaddingLeft,
      paddingRight: chipPaddingRight,
      borderWidth: theme.stroke[1],
      borderRadius: chipBorderRadius,
      justifyContent: 'center',
    },
    chipUnselected: {
      backgroundColor: theme.colors.bg.surface,
      borderColor: theme.colors.border.default,
    },
    chipSelected: {
      backgroundColor: theme.colors.bg.accentSoft,
      borderColor: theme.palette.primary,
    },
    badge: {
      paddingHorizontal: badgePaddingHorizontal,
      paddingVertical: badgePaddingVertical,
      minWidth: badgeMinWidth,
      height: badgeHeight,
      borderRadius: badgeBorderRadius,
      alignItems: 'center',
      justifyContent: 'center',
    },
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
  testIDPrefix,
}: ChipGroupProps) => {
  const theme = useTheme();
  const variantConfig = useMemo(
    () => getChipGroupVariantConfig(variant),
    [variant],
  );
  const resolvedGap = gap ?? variantConfig.gap;
  const resolvedItemHeight = itemHeight ?? variantConfig.itemHeight;
  const resolvedContentPaddingHorizontal =
    contentPaddingHorizontal ?? variantConfig.contentPaddingHorizontal;

  const styles = useMemo(
    () =>
      getStyles({
        ...variantConfig,
        badgeHeight,
        badgeMinWidth: badgeMinWidth ?? variantConfig.badgeMinWidth,
        chipBorderRadius: chipBorderRadius ?? variantConfig.chipBorderRadius,
        chipContentGap: chipContentGap ?? variantConfig.chipContentGap,
        chipPaddingHorizontal:
          chipPaddingHorizontal ?? variantConfig.chipPaddingHorizontal,
        chipPaddingLeft: chipPaddingLeft ?? variantConfig.chipPaddingLeft,
        chipPaddingRight: chipPaddingRight ?? variantConfig.chipPaddingRight,
        itemHeight: resolvedItemHeight,
        theme,
      }),
    [
      badgeHeight,
      badgeMinWidth,
      chipBorderRadius,
      chipContentGap,
      chipPaddingHorizontal,
      chipPaddingLeft,
      chipPaddingRight,
      resolvedItemHeight,
      theme,
      variantConfig,
    ],
  );
  const listRef = useRef<FlatList<InternalChipItem>>(null);
  const didScrollRef = useRef(false);

  const data = useMemo<InternalChipItem[]>(() => {
    const allChip: AllChip = { id: ALL_CHIP_ID, name: allLabel };
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
          animated: false,
        });
      });
    }
  }, [scrollToSelectedOnMount, selectedIndex]);

  const edgeSpacerStyle = useMemo<ViewStyle>(
    () => ({ width: resolvedContentPaddingHorizontal }),
    [resolvedContentPaddingHorizontal],
  );
  const separatorStyle = useMemo<ViewStyle>(
    () => ({ width: resolvedGap }),
    [resolvedGap],
  );

  const renderEdgeSpacer = useCallback(
    () => <View style={edgeSpacerStyle} />,
    [edgeSpacerStyle],
  );

  const renderSeparator = useCallback(
    () => <View style={separatorStyle} />,
    [separatorStyle],
  );

  const isFilterVariant = variant === 'filter';

  const renderItem = useCallback<ListRenderItem<InternalChipItem>>(
    ({ item }) => {
      const isAll = item.id === ALL_CHIP_ID;
      const isSelected = isAll
        ? value === null
        : String(value) === String(item.id);
      const count = !isAll && 'count' in item ? item.count : undefined;
      const hasBadge = typeof count === 'number';

      let labelVariant: TypographyVariant;
      if (isFilterVariant) {
        labelVariant = isSelected ? 'body/medium' : 'body/regular';
      } else {
        labelVariant = isSelected ? 'caption/bold' : 'caption/medium';
      }

      let badgeBackgroundColor: string;
      let badgeTextColor: string;
      if (isFilterVariant) {
        badgeBackgroundColor = isSelected
          ? theme.colors.bg.accent
          : theme.colors.bg.subtle;
        badgeTextColor = isSelected
          ? theme.colors.text.inverse
          : theme.colors.text.primary;
      } else {
        badgeBackgroundColor = isSelected
          ? theme.colors.bg.accent
          : theme.colors.bg.accentSoft;
        badgeTextColor = isSelected
          ? (selectedBadgeTextColor ?? theme.colors.text.inverse)
          : (unselectedBadgeTextColor ?? theme.colors.text.accent);
      }

      return (
        <Pressable
          onPress={() => onChange(isAll ? null : String(item.id))}
          style={[
            styles.chip,
            isSelected ? styles.chipSelected : styles.chipUnselected,
          ]}
          accessibilityRole="button"
          accessibilityState={{ selected: isSelected }}
          testID={
            testIDPrefix
              ? `${testIDPrefix}.${isAll ? 'all' : String(item.id)}`
              : undefined
          }
        >
          <Text
            variant={labelVariant}
            color={isSelected ? 'accent' : 'primary'}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={isSelected ? selectedTextStyle : unselectedTextStyle}
          >
            {item.name}
          </Text>
          {hasBadge ? (
            <View
              style={[styles.badge, { backgroundColor: badgeBackgroundColor }]}
            >
              <Text
                variant={isFilterVariant ? 'body/regular' : 'caption/medium'}
                style={[{ color: badgeTextColor }, badgeTextStyle]}
              >
                {count}
              </Text>
            </View>
          ) : null}
        </Pressable>
      );
    },
    [
      badgeTextStyle,
      isFilterVariant,
      onChange,
      selectedBadgeTextColor,
      selectedTextStyle,
      styles.badge,
      styles.chip,
      styles.chipSelected,
      styles.chipUnselected,
      theme.colors.bg.accent,
      theme.colors.bg.accentSoft,
      theme.colors.bg.subtle,
      theme.colors.text.accent,
      theme.colors.text.inverse,
      theme.colors.text.primary,
      testIDPrefix,
      unselectedBadgeTextColor,
      unselectedTextStyle,
      value,
    ],
  );

  return (
    <LoadingWrapper
      loading={isLoading}
      skeleton={<ChipGroupSkeleton variant={variant} />}
      fitContent
      style={styles.root}
    >
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={getChipKey}
        horizontal
        renderItem={renderItem}
        ListHeaderComponent={renderEdgeSpacer}
        ListFooterComponent={renderEdgeSpacer}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
        extraData={value}
        initialNumToRender={CHIP_GROUP_INITIAL_RENDER_COUNT}
        maxToRenderPerBatch={CHIP_GROUP_MAX_RENDER_BATCH}
        removeClippedSubviews={Platform.OS === 'android'}
        updateCellsBatchingPeriod={CHIP_GROUP_BATCHING_PERIOD_MS}
        windowSize={CHIP_GROUP_WINDOW_SIZE}
        onScrollToIndexFailed={info => {
          setTimeout(() => {
            listRef.current?.scrollToIndex({
              index: info.index,
              animated: false,
            });
          }, SCROLL_RETRY_DELAY_MS);
        }}
      />
    </LoadingWrapper>
  );
};

/** Horizontal, scrollable single-select chip row with optional counts. Figma: `Chip`. */
export const ChipGroup = memo(ChipGroupComponent);
