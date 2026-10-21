import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { DatePicker } from './DatePicker';

const MONTHS = [
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
];

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  args: {
    label: 'Birthday',
    description: 'We use it to send a greeting',
    value: '2020-03-15T12:00:00.000Z',
    monthLabels: MONTHS,
    locale: 'en-GB',
    onChange: () => undefined,
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTexts: Story = {
  args: { label: undefined, description: undefined },
};

export const WithRange: Story = {
  args: {
    minDateIso: '2020-01-10T12:00:00.000Z',
    maxDateIso: '2020-06-20T12:00:00.000Z',
  },
};

export const UsLocale: Story = { args: { locale: 'en-US' } };

/** Reports picks below the wheel; the wheel keeps its own day/month/year. */
const InteractiveDatePicker = () => {
  const [pickedIso, setPickedIso] = useState('');
  return (
    <DatePicker
      label="Birthday"
      description={pickedIso}
      value="2020-03-15T12:00:00.000Z"
      onChange={setPickedIso}
      monthLabels={MONTHS}
    />
  );
};

export const Interactive: Story = { render: () => <InteractiveDatePicker /> };
