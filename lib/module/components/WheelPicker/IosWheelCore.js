"use strict";

import { StyleSheet, View } from 'react-native';
import { useTheme } from "../../theme/index.js";
import { NativePicker } from "../NativePicker/index.js";
import { DEFAULT_ITEM_HEIGHT, DEFAULT_VISIBLE_ITEM_COUNT } from "./AndroidWheelCore.js";
import { getNormalizedVisibleItemCount } from "./wheelHelpers.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TRANSPARENT_SELECTION_COLOR = 'transparent';

/** Native iOS wheel: one NativePicker per column. */
export const IosWheelCore = ({
  columns,
  columnGap,
  containerStyle,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  itemTextStyle,
  selectionIndicatorStyle,
  testID,
  visibleItemCount = DEFAULT_VISIBLE_ITEM_COUNT
}) => {
  const theme = useTheme();
  const wheelHeight = getNormalizedVisibleItemCount(visibleItemCount) * itemHeight;
  return /*#__PURE__*/_jsx(View, {
    style: [styles.row, columnGap === undefined ? null : {
      gap: columnGap
    }, selectionIndicatorStyle ? {
      height: wheelHeight
    } : null, containerStyle],
    testID: testID,
    children: columns.map(column => /*#__PURE__*/_jsxs(View, {
      style: [styles.column, {
        flex: column.flex,
        width: column.width
      }],
      testID: column.testID,
      children: [selectionIndicatorStyle ? /*#__PURE__*/_jsx(View, {
        pointerEvents: "none",
        style: [styles.selectionIndicator, selectionIndicatorStyle, {
          height: itemHeight,
          top: (wheelHeight - itemHeight) / 2
        }]
      }) : null, /*#__PURE__*/_jsx(NativePicker, {
        containerStyle: [styles.nativePickerContainer, selectionIndicatorStyle ? styles.nativePickerContainerWithIndicator : null],
        selectedValue: column.selectedValue,
        onValueChange: column.onValueChange,
        style: [styles.picker, selectionIndicatorStyle ? styles.pickerWithIndicator : null],
        itemStyle: itemTextStyle,
        selectionColor: selectionIndicatorStyle ? TRANSPARENT_SELECTION_COLOR : undefined,
        items: column.items.map(item => ({
          label: item.label,
          value: item.value,
          color: theme.colors.text.primary
        }))
      })]
    }, column.key))
  });
};
const styles = StyleSheet.create({
  column: {
    minWidth: 0,
    overflow: 'hidden',
    position: 'relative'
  },
  picker: {
    width: '100%',
    zIndex: 1
  },
  nativePickerContainer: {
    width: '100%'
  },
  nativePickerContainerWithIndicator: {
    height: '100%'
  },
  pickerWithIndicator: {
    height: '100%'
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    width: '100%'
  },
  selectionIndicator: {
    position: 'absolute',
    zIndex: 0
  }
});
//# sourceMappingURL=IosWheelCore.js.map