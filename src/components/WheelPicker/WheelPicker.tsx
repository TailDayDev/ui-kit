import { DateWheel } from './DateWheel';
import { PlatformWheel } from './PlatformWheel';
import { TimeWheel } from './TimeWheel';
import { WeightWheel } from './WeightWheel';
import type { WheelPickerColumn, WheelPickerProps } from './WheelPicker.types';

const DEFAULT_SELECT_COLUMN_KEY = 'select';

/**
 * Scroll wheel picker: native wheel on iOS, JS wheel on Android. `mode`
 * picks the columns: free `columns`, one `select` column, `time`, `date`
 * or `weight`.
 */
export const WheelPicker = (props: WheelPickerProps) => {
  if (props.mode === 'columns') {
    return (
      <PlatformWheel
        columns={props.columns}
        columnGap={props.columnGap}
        containerStyle={props.containerStyle}
        itemHeight={props.itemHeight}
        itemTextStyle={props.itemTextStyle}
        selectionIndicatorStyle={props.selectionIndicatorStyle}
        testID={props.testID}
        visibleItemCount={props.visibleItemCount}
      />
    );
  }

  if (props.mode === 'select') {
    const selectColumns: WheelPickerColumn[] = [
      {
        key: props.columnKey ?? DEFAULT_SELECT_COLUMN_KEY,
        flex: 1,
        items: props.items,
        selectedValue: props.selectedValue,
        onValueChange: props.onValueChange,
      },
    ];

    return (
      <PlatformWheel
        columns={selectColumns}
        containerStyle={props.containerStyle}
        itemHeight={props.itemHeight}
        itemTextStyle={props.itemTextStyle}
        selectionIndicatorStyle={props.selectionIndicatorStyle}
        testID={props.testID}
        visibleItemCount={props.visibleItemCount}
      />
    );
  }

  // Each mode component reads only its own props; `mode` is ignored there.
  if (props.mode === 'time') {
    return <TimeWheel {...props} />;
  }

  if (props.mode === 'date') {
    return <DateWheel {...props} />;
  }

  return <WeightWheel {...props} />;
};
