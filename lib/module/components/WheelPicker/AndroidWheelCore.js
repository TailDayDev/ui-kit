"use strict";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useThemedStyles } from "../../theme/index.js";
import { getNormalizedVisibleItemCount } from "./wheelHelpers.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/** App wheel row height (off-scale: not in Figma Spacing). */
export const DEFAULT_ITEM_HEIGHT = 44;
export const DEFAULT_VISIBLE_ITEM_COUNT = 5;
/** App: height of the faded bands over the top and bottom rows (off-scale). */
const EDGE_OVERLAY_HEIGHT = 42;
const ADJACENT_ITEM_SCALE = 0.92;
const FADED_ITEM_SCALE = 0.88;
const SELECTED_ITEM_SCALE = 1;
const SCROLL_SETTLE_DELAY_MS = 260;
const SNAP_OFFSET_TOLERANCE = 0.5;
const getClampedIndex = (index, itemsLength) => Math.max(0, Math.min(index, Math.max(0, itemsLength - 1)));
const getSelectedIndex = (items, selectedValue) => {
  const selectedIndex = items.findIndex(item => item.value === selectedValue);
  return selectedIndex >= 0 ? selectedIndex : 0;
};
const getFocusedIndexFromOffset = (offsetY, itemHeight, itemsLength) => getClampedIndex(Math.round(offsetY / itemHeight), itemsLength);
const WheelColumnView = ({
  column,
  itemHeight,
  itemTextStyle,
  selectionIndicatorStyle,
  styles,
  wheelHeight
}) => {
  const initialIndex = getSelectedIndex(column.items, column.selectedValue);
  const initialContentOffsetRef = useRef({
    x: 0,
    y: initialIndex * itemHeight
  });
  const scrollRef = useRef(null);
  const settleTimeoutRef = useRef(null);
  const committedIndexRef = useRef(initialIndex);
  const focusedIndexRef = useRef(initialIndex);
  const isInitialRenderRef = useRef(true);
  const isMomentumScrollingRef = useRef(false);
  const isScrollSettlingRef = useRef(false);
  const isUserDraggingRef = useRef(false);
  const latestOffsetYRef = useRef(initialContentOffsetRef.current.y);
  const [focusedIndex, setFocusedIndex] = useState(initialIndex);
  const selectedIndex = useMemo(() => getSelectedIndex(column.items, column.selectedValue), [column.items, column.selectedValue]);
  const verticalPadding = Math.max(0, (wheelHeight - itemHeight) / 2);
  const clearSettleTimeout = useCallback(() => {
    if (settleTimeoutRef.current) {
      clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = null;
    }
  }, []);
  const updateFocusedIndex = useCallback(index => {
    const nextFocusedIndex = getClampedIndex(index, column.items.length);
    if (focusedIndexRef.current !== nextFocusedIndex) {
      focusedIndexRef.current = nextFocusedIndex;
      setFocusedIndex(nextFocusedIndex);
    }
  }, [column.items.length]);
  const scrollToIndex = useCallback((index, isAnimated) => {
    const nextIndex = getClampedIndex(index, column.items.length);
    const nextOffsetY = nextIndex * itemHeight;
    latestOffsetYRef.current = nextOffsetY;
    updateFocusedIndex(nextIndex);
    scrollRef.current?.scrollTo({
      animated: isAnimated,
      y: nextOffsetY
    });
  }, [column.items.length, itemHeight, updateFocusedIndex]);
  useEffect(() => {
    committedIndexRef.current = selectedIndex;
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      latestOffsetYRef.current = selectedIndex * itemHeight;
      updateFocusedIndex(selectedIndex);
      return;
    }
    if (!isUserDraggingRef.current && !isMomentumScrollingRef.current && !isScrollSettlingRef.current) {
      scrollToIndex(selectedIndex, false);
    }
  }, [itemHeight, scrollToIndex, selectedIndex, updateFocusedIndex]);
  useEffect(() => clearSettleTimeout, [clearSettleTimeout]);
  const commitItemAtOffset = useCallback((offsetY, isAnimated) => {
    if (column.items.length === 0) {
      isScrollSettlingRef.current = false;
      return;
    }
    const nextIndex = getClampedIndex(Math.round(offsetY / itemHeight), column.items.length);
    const nextItem = column.items[nextIndex];
    if (!nextItem) {
      isScrollSettlingRef.current = false;
      return;
    }
    const snappedOffsetY = nextIndex * itemHeight;
    const isAlreadySnapped = Math.abs(offsetY - snappedOffsetY) <= SNAP_OFFSET_TOLERANCE;
    if (!isAlreadySnapped) {
      scrollToIndex(nextIndex, isAnimated);
    } else {
      updateFocusedIndex(nextIndex);
    }
    if (committedIndexRef.current !== nextIndex) {
      committedIndexRef.current = nextIndex;
      column.onValueChange(nextItem.value, nextIndex);
    }
    isScrollSettlingRef.current = false;
  }, [column, itemHeight, scrollToIndex, updateFocusedIndex]);
  const scheduleScrollSettle = useCallback(() => {
    clearSettleTimeout();
    settleTimeoutRef.current = setTimeout(() => {
      settleTimeoutRef.current = null;
      if (isUserDraggingRef.current) {
        return;
      }
      isMomentumScrollingRef.current = false;
      isUserDraggingRef.current = false;
      commitItemAtOffset(latestOffsetYRef.current, false);
    }, SCROLL_SETTLE_DELAY_MS);
  }, [clearSettleTimeout, commitItemAtOffset]);
  const handleScroll = useCallback(event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    latestOffsetYRef.current = offsetY;
    isScrollSettlingRef.current = true;
    updateFocusedIndex(getFocusedIndexFromOffset(offsetY, itemHeight, column.items.length));
    if (!isUserDraggingRef.current) {
      scheduleScrollSettle();
    }
  }, [column.items.length, itemHeight, scheduleScrollSettle, updateFocusedIndex]);
  const handleScrollBeginDrag = useCallback(() => {
    clearSettleTimeout();
    isUserDraggingRef.current = true;
    isMomentumScrollingRef.current = false;
    isScrollSettlingRef.current = true;
  }, [clearSettleTimeout]);
  const handleScrollEndDrag = useCallback(event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    latestOffsetYRef.current = offsetY;
    updateFocusedIndex(getFocusedIndexFromOffset(offsetY, itemHeight, column.items.length));
    isUserDraggingRef.current = false;
    scheduleScrollSettle();
  }, [column.items.length, itemHeight, scheduleScrollSettle, updateFocusedIndex]);
  const handleMomentumScrollBegin = useCallback(() => {
    clearSettleTimeout();
    isMomentumScrollingRef.current = true;
    isScrollSettlingRef.current = true;
  }, [clearSettleTimeout]);
  const handleMomentumScrollEnd = useCallback(event => {
    clearSettleTimeout();
    const offsetY = event.nativeEvent.contentOffset.y;
    latestOffsetYRef.current = offsetY;
    updateFocusedIndex(getFocusedIndexFromOffset(offsetY, itemHeight, column.items.length));
    isMomentumScrollingRef.current = false;
    scheduleScrollSettle();
  }, [clearSettleTimeout, column.items.length, itemHeight, scheduleScrollSettle, updateFocusedIndex]);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.column, {
      flex: column.flex,
      height: wheelHeight,
      width: column.width
    }],
    testID: column.testID,
    children: [selectionIndicatorStyle ? /*#__PURE__*/_jsx(View, {
      pointerEvents: "none",
      style: [styles.columnSelectionIndicator, selectionIndicatorStyle, {
        height: itemHeight,
        top: (wheelHeight - itemHeight) / 2
      }]
    }) : null, /*#__PURE__*/_jsx(ScrollView, {
      ref: scrollRef,
      bounces: false,
      contentOffset: initialContentOffsetRef.current,
      contentContainerStyle: {
        paddingBottom: verticalPadding,
        paddingTop: verticalPadding
      },
      decelerationRate: "fast",
      nestedScrollEnabled: true,
      onMomentumScrollBegin: handleMomentumScrollBegin,
      onMomentumScrollEnd: handleMomentumScrollEnd,
      onScroll: handleScroll,
      onScrollBeginDrag: handleScrollBeginDrag,
      onScrollEndDrag: handleScrollEndDrag,
      overScrollMode: "never",
      scrollEventThrottle: 16,
      showsVerticalScrollIndicator: false,
      snapToInterval: itemHeight,
      children: column.items.map((item, index) => {
        const distanceFromFocus = Math.abs(index - focusedIndex);
        const focusTextStyle = distanceFromFocus === 0 ? styles.selectedItemText : distanceFromFocus === 1 ? styles.adjacentItemText : styles.fadedItemText;
        const isSelected = distanceFromFocus === 0;
        return /*#__PURE__*/_jsx(Pressable, {
          accessibilityRole: "button",
          accessibilityLabel: item.label,
          accessibilityState: {
            selected: isSelected
          },
          onPress: () => {
            clearSettleTimeout();
            isMomentumScrollingRef.current = false;
            isScrollSettlingRef.current = false;
            isUserDraggingRef.current = false;
            latestOffsetYRef.current = index * itemHeight;
            updateFocusedIndex(index);
            scrollToIndex(index, true);
            if (committedIndexRef.current !== index) {
              committedIndexRef.current = index;
              column.onValueChange(item.value, index);
            }
          },
          style: [styles.item, {
            height: itemHeight
          }],
          children: /*#__PURE__*/_jsx(Text, {
            adjustsFontSizeToFit: true,
            numberOfLines: 1,
            style: [styles.itemText, itemTextStyle, focusTextStyle],
            children: item.label
          })
        }, `${column.key}-${String(item.value)}`);
      })
    })]
  });
};

/**
 * JS scroll wheel: Android, and iOS when a `selectionIndicatorStyle` is set.
 * Rows scale and fade with the distance from the centered row.
 */
export const AndroidWheelCore = ({
  columns,
  columnGap,
  containerStyle,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  itemTextStyle,
  selectionIndicatorStyle,
  testID,
  visibleItemCount = DEFAULT_VISIBLE_ITEM_COUNT
}) => {
  const styles = useThemedStyles(createStyles);
  const normalizedVisibleItemCount = getNormalizedVisibleItemCount(visibleItemCount);
  const wheelHeight = normalizedVisibleItemCount * itemHeight;
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, {
      height: wheelHeight
    }, containerStyle],
    testID: testID,
    children: [/*#__PURE__*/_jsx(View, {
      pointerEvents: "none",
      style: styles.topOverlay
    }), /*#__PURE__*/_jsx(View, {
      pointerEvents: "none",
      style: styles.bottomOverlay
    }), /*#__PURE__*/_jsx(View, {
      style: [styles.columns, columnGap === undefined ? null : {
        gap: columnGap
      }],
      children: columns.map(column => /*#__PURE__*/_jsx(WheelColumnView, {
        column: column,
        itemHeight: itemHeight,
        itemTextStyle: itemTextStyle,
        selectionIndicatorStyle: selectionIndicatorStyle,
        styles: styles,
        wheelHeight: wheelHeight
      }, column.key))
    })]
  });
};
const createStyles = theme => {
  const headlineBold = theme.typography.headline.bold;
  return StyleSheet.create({
    bottomOverlay: {
      backgroundColor: theme.palette.white70,
      bottom: 0,
      height: EDGE_OVERLAY_HEIGHT,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 2
    },
    column: {
      overflow: 'hidden'
    },
    columnSelectionIndicator: {
      backgroundColor: theme.colors.bg.subtle,
      borderColor: theme.colors.border.default,
      borderRadius: theme.radius.sm,
      borderWidth: theme.stroke[1],
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 0
    },
    columns: {
      flexDirection: 'row',
      // App default column gap of the custom wheel.
      gap: theme.space[2],
      height: '100%',
      width: '100%',
      zIndex: 1
    },
    container: {
      backgroundColor: theme.colors.bg.surface,
      overflow: 'hidden',
      width: '100%'
    },
    item: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.space[0.5]
    },
    itemText: {
      fontFamily: headlineBold.fontFamily,
      fontSize: headlineBold.fontSize,
      fontWeight: headlineBold.fontWeight,
      lineHeight: headlineBold.lineHeight,
      color: theme.colors.text.primary,
      textAlign: 'center'
    },
    adjacentItemText: {
      color: theme.colors.text.secondary,
      transform: [{
        scale: ADJACENT_ITEM_SCALE
      }]
    },
    fadedItemText: {
      color: theme.palette.lightGray,
      transform: [{
        scale: FADED_ITEM_SCALE
      }]
    },
    topOverlay: {
      backgroundColor: theme.palette.white70,
      height: EDGE_OVERLAY_HEIGHT,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 2
    },
    selectedItemText: {
      color: theme.colors.text.primary,
      transform: [{
        scale: SELECTED_ITEM_SCALE
      }]
    }
  });
};
//# sourceMappingURL=AndroidWheelCore.js.map