"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelPicker = void 0;
var _DateWheel = require("./DateWheel.js");
var _PlatformWheel = require("./PlatformWheel.js");
var _TimeWheel = require("./TimeWheel.js");
var _WeightWheel = require("./WeightWheel.js");
var _jsxRuntime = require("react/jsx-runtime");
const DEFAULT_SELECT_COLUMN_KEY = 'select';

/**
 * Scroll wheel picker: native wheel on iOS, JS wheel on Android. `mode`
 * picks the columns: free `columns`, one `select` column, `time`, `date`
 * or `weight`.
 */
const WheelPicker = props => {
  if (props.mode === 'columns') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PlatformWheel.PlatformWheel, {
      columns: props.columns,
      columnGap: props.columnGap,
      containerStyle: props.containerStyle,
      itemHeight: props.itemHeight,
      itemTextStyle: props.itemTextStyle,
      selectionIndicatorStyle: props.selectionIndicatorStyle,
      testID: props.testID,
      visibleItemCount: props.visibleItemCount
    });
  }
  if (props.mode === 'select') {
    const selectColumns = [{
      key: props.columnKey ?? DEFAULT_SELECT_COLUMN_KEY,
      flex: 1,
      items: props.items,
      selectedValue: props.selectedValue,
      onValueChange: props.onValueChange
    }];
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PlatformWheel.PlatformWheel, {
      columns: selectColumns,
      containerStyle: props.containerStyle,
      itemHeight: props.itemHeight,
      itemTextStyle: props.itemTextStyle,
      selectionIndicatorStyle: props.selectionIndicatorStyle,
      testID: props.testID,
      visibleItemCount: props.visibleItemCount
    });
  }

  // Each mode component reads only its own props; `mode` is ignored there.
  if (props.mode === 'time') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TimeWheel.TimeWheel, {
      ...props
    });
  }
  if (props.mode === 'date') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateWheel.DateWheel, {
      ...props
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WeightWheel.WeightWheel, {
    ...props
  });
};
exports.WheelPicker = WheelPicker;
//# sourceMappingURL=WheelPicker.js.map