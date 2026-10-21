"use strict";

import { DateWheel } from "./DateWheel.js";
import { PlatformWheel } from "./PlatformWheel.js";
import { TimeWheel } from "./TimeWheel.js";
import { WeightWheel } from "./WeightWheel.js";
import { jsx as _jsx } from "react/jsx-runtime";
const DEFAULT_SELECT_COLUMN_KEY = 'select';

/**
 * Scroll wheel picker: native wheel on iOS, JS wheel on Android. `mode`
 * picks the columns: free `columns`, one `select` column, `time`, `date`
 * or `weight`.
 */
export const WheelPicker = props => {
  if (props.mode === 'columns') {
    return /*#__PURE__*/_jsx(PlatformWheel, {
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
    return /*#__PURE__*/_jsx(PlatformWheel, {
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
    return /*#__PURE__*/_jsx(TimeWheel, {
      ...props
    });
  }
  if (props.mode === 'date') {
    return /*#__PURE__*/_jsx(DateWheel, {
      ...props
    });
  }
  return /*#__PURE__*/_jsx(WeightWheel, {
    ...props
  });
};
//# sourceMappingURL=WheelPicker.js.map