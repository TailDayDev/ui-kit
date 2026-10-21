import { useMemo } from 'react';

import { PlatformWheel } from './PlatformWheel';
import type {
  WheelPickerColumn,
  WheelPickerItem,
  WheelPickerTimeFormat,
  WheelPickerTimeProps,
  WheelPickerValue,
} from './WheelPicker.types';

type TimeWheelProps = Omit<WheelPickerTimeProps, 'mode'>;

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const HOURS_IN_HALF_DAY = 12;
const DEFAULT_MINUTE_INTERVAL = 5;
/** App width of the am/pm column. */
const FORMAT_COLUMN_WIDTH = 96;

const padStart2 = (n: number) => String(n).padStart(2, '0');

const buildHourOptions = (
  hourFormat: WheelPickerTimeProps['hourFormat'],
): WheelPickerItem[] => {
  if (hourFormat === '12h') {
    return Array.from({ length: HOURS_IN_HALF_DAY }, (_, i) => {
      const padded = padStart2(i + 1);
      return { label: padded, value: padded };
    });
  }

  return Array.from({ length: HOURS_IN_DAY }, (_, i) => {
    const padded = padStart2(i);
    return { label: padded, value: padded };
  });
};

const buildMinuteOptions = (minuteInterval: number): WheelPickerItem[] => {
  const safeInterval =
    Number.isFinite(minuteInterval) && minuteInterval > 0
      ? minuteInterval
      : DEFAULT_MINUTE_INTERVAL;
  const optionCount = Math.max(1, Math.floor(MINUTES_IN_HOUR / safeInterval));

  return Array.from({ length: optionCount }, (_, i) => {
    const padded = padStart2(i * safeInterval);
    return { label: padded, value: padded };
  });
};

const FORMAT_OPTIONS: WheelPickerItem[] = [
  { label: 'am', value: 'am' },
  { label: 'pm', value: 'pm' },
];

/** Hour + minutes (+ am/pm in 12h) columns. */
export const TimeWheel = ({
  value,
  onChange,
  hourFormat = '24h',
  minuteInterval = DEFAULT_MINUTE_INTERVAL,
  columnGap,
  formatColumnWidth = FORMAT_COLUMN_WIDTH,
  containerStyle,
  itemTextStyle,
  selectionIndicatorStyle,
  itemHeight,
  visibleItemCount,
  testID,
}: TimeWheelProps) => {
  const hourOptions = useMemo(() => buildHourOptions(hourFormat), [hourFormat]);
  const minuteOptions = useMemo(
    () => buildMinuteOptions(minuteInterval),
    [minuteInterval],
  );

  const columns: WheelPickerColumn[] = useMemo(() => {
    const baseColumns: WheelPickerColumn[] = [
      {
        key: 'hour',
        flex: 1,
        items: hourOptions,
        selectedValue: value.hour,
        onValueChange: (nextHour: WheelPickerValue) =>
          onChange({ ...value, hour: String(nextHour) }),
      },
      {
        key: 'minutes',
        flex: 1,
        items: minuteOptions,
        selectedValue: value.minutes,
        onValueChange: (nextMinutes: WheelPickerValue) =>
          onChange({ ...value, minutes: String(nextMinutes) }),
      },
    ];

    if (hourFormat !== '12h') {
      return baseColumns;
    }

    const formatColumn: WheelPickerColumn = {
      key: 'format',
      width: formatColumnWidth,
      items: FORMAT_OPTIONS,
      selectedValue: value.format ?? 'am',
      onValueChange: (nextFormat: WheelPickerValue) =>
        onChange({
          ...value,
          // The format column only holds FORMAT_OPTIONS values.
          format: nextFormat as WheelPickerTimeFormat,
        }),
    };

    return [...baseColumns, formatColumn];
  }, [
    formatColumnWidth,
    hourFormat,
    hourOptions,
    minuteOptions,
    onChange,
    value,
  ]);

  return (
    <PlatformWheel
      columns={columns}
      columnGap={columnGap}
      containerStyle={containerStyle}
      itemHeight={itemHeight}
      itemTextStyle={itemTextStyle}
      selectionIndicatorStyle={selectionIndicatorStyle}
      testID={testID}
      visibleItemCount={visibleItemCount}
    />
  );
};
