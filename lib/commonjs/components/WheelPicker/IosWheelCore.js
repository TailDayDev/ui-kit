"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IosWheelCore = void 0;
var _reactNative = require("react-native");
var _index = require("../../theme/index.js");
var _index2 = require("../NativePicker/index.js");
var _AndroidWheelCore = require("./AndroidWheelCore.js");
var _wheelHelpers = require("./wheelHelpers.js");
var _jsxRuntime = require("react/jsx-runtime");
const TRANSPARENT_SELECTION_COLOR = 'transparent';

/** Native iOS wheel: one NativePicker per column. */
const IosWheelCore = ({
  columns,
  columnGap,
  containerStyle,
  itemHeight = _AndroidWheelCore.DEFAULT_ITEM_HEIGHT,
  itemTextStyle,
  selectionIndicatorStyle,
  testID,
  visibleItemCount = _AndroidWheelCore.DEFAULT_VISIBLE_ITEM_COUNT
}) => {
  const theme = (0, _index.useTheme)();
  const wheelHeight = (0, _wheelHelpers.getNormalizedVisibleItemCount)(visibleItemCount) * itemHeight;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [styles.row, columnGap === undefined ? null : {
      gap: columnGap
    }, selectionIndicatorStyle ? {
      height: wheelHeight
    } : null, containerStyle],
    testID: testID,
    children: columns.map(column => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [styles.column, {
        flex: column.flex,
        width: column.width
      }],
      testID: column.testID,
      children: [selectionIndicatorStyle ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        pointerEvents: "none",
        style: [styles.selectionIndicator, selectionIndicatorStyle, {
          height: itemHeight,
          top: (wheelHeight - itemHeight) / 2
        }]
      }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.NativePicker, {
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
exports.IosWheelCore = IosWheelCore;
const styles = _reactNative.StyleSheet.create({
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