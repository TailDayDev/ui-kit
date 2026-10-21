import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { CustomCalendar } from './CustomCalendar';
import type {
  CustomCalendarLocale,
  CustomCalendarProps,
} from './CustomCalendar.types';

const EN_LOCALE: CustomCalendarLocale = {
  key: 'en',
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

const RangePicker = (props: Partial<CustomCalendarProps>) => {
  const [start, setStart] = useState('2026-08-10');
  const [end, setEnd] = useState<string | undefined>('2026-08-14');
  return (
    <CustomCalendar
      locale={EN_LOCALE}
      startDate={start}
      endDate={end}
      onStartDateSelect={day => {
        setStart(day.dateString);
        setEnd(undefined);
      }}
      onEndDateSelect={day => setEnd(day.dateString)}
      {...props}
    />
  );
};

const MultiDatePicker = (props: Partial<CustomCalendarProps>) => {
  const [dates, setDates] = useState(['2026-08-20', '2026-08-26']);
  return (
    <CustomCalendar
      locale={EN_LOCALE}
      startDate="2026-08-15"
      minStartDate="2026-08-15"
      selectedDates={dates}
      onDateToggle={day =>
        setDates(current =>
          current.includes(day.dateString)
            ? current.filter(date => date !== day.dateString)
            : [...current, day.dateString].sort(),
        )
      }
      {...props}
    />
  );
};

const SingleStartPicker = (props: CustomCalendarProps) => {
  const [start, setStart] = useState(props.startDate);
  return (
    <CustomCalendar
      {...props}
      startDate={start}
      onStartDateSelect={day => setStart(day.dateString)}
    />
  );
};

const meta = {
  title: 'Components/CustomCalendar',
  component: CustomCalendar,
  args: { startDate: '2026-08-10', locale: EN_LOCALE },
} satisfies Meta<typeof CustomCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Range: Story = { render: args => <RangePicker {...args} /> };

export const ReadOnlyRange: Story = {
  args: {
    endDate: '2026-08-14',
    canEditStartDate: false,
    canEditEndDate: false,
  },
};

export const SingleStart: Story = {
  args: { minStartDate: '2026-08-05', maxStartDate: '2026-08-25' },
  render: args => <SingleStartPicker {...args} />,
};

export const EndWithInvalidDate: Story = {
  args: {
    invalidDate: '2026-08-06',
    highlightStartDate: false,
    onEndDateSelect: () => undefined,
    onInvalidEndDateSelect: () => undefined,
  },
};

export const Occurrences: Story = {
  args: {
    isOccurrenceDate: (date: string) => Number(date.slice(-2)) % 3 === 0,
  },
};

export const NutritionMultipleDates: Story = {
  args: { nutritionSchedulePresentation: true, calendarHeight: 401 },
  render: args => <MultiDatePicker {...args} />,
};

export const NutritionEndDate: Story = {
  args: {
    nutritionSchedulePresentation: true,
    calendarHeight: 401,
    startDate: '2026-08-15',
    endDate: '2026-08-27',
    endDateOnlyPresentation: true,
    highlightStartDate: false,
    onEndDateSelect: () => undefined,
  },
};

export const FixedHeight: Story = {
  args: { calendarHeight: 350, endDate: '2026-08-14' },
};
