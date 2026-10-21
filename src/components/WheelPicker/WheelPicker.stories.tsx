import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { lightTheme } from '../../theme';
import { WheelPicker } from './WheelPicker';
import type {
  WheelPickerTimeValue,
  WheelPickerValue,
  WheelPickerWeightUnit,
} from './WheelPicker.types';

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

const WEIGHT_LABELS = { pounds: 'lbs', kilograms: 'kg', grams: 'g' };

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(label => ({
  label,
  value: label,
}));

/** The JS wheel's selected-row band (the app's Android look on every platform). */
const SELECTION_BAND = {
  backgroundColor: lightTheme.colors.bg.subtle,
  borderColor: lightTheme.colors.border.default,
};

/** Item text of the time modal (Figma `title/regular`). */
const TITLE_ITEM_TEXT = {
  fontSize: lightTheme.typography.title.regular.fontSize,
  color: lightTheme.colors.text.primary,
};

const meta: Meta<typeof WheelPicker> = {
  title: 'Components/WheelPicker',
  component: WheelPicker,
  decorators: [
    Story => (
      <View style={{ width: 360 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
// Props are a union by `mode`, so every story renders its own controlled wheel.
type Story = StoryObj;

const SelectWheel = ({ hasBand }: { hasBand?: boolean }) => {
  const [value, setValue] = useState<WheelPickerValue>('M');
  return (
    <WheelPicker
      mode="select"
      items={SIZES}
      selectedValue={value}
      onValueChange={setValue}
      selectionIndicatorStyle={hasBand ? SELECTION_BAND : undefined}
    />
  );
};

export const Select: Story = { render: () => <SelectWheel /> };

export const SelectWithSelectionBand: Story = {
  render: () => <SelectWheel hasBand />,
};

const TimeWheelStory = ({ hourFormat }: { hourFormat: '12h' | '24h' }) => {
  const [value, setValue] = useState<WheelPickerTimeValue>({
    hour: '09',
    minutes: '30',
    format: hourFormat === '12h' ? 'am' : null,
  });
  return (
    <WheelPicker
      mode="time"
      hourFormat={hourFormat}
      value={value}
      onChange={setValue}
      itemTextStyle={TITLE_ITEM_TEXT}
    />
  );
};

export const Time24h: Story = {
  render: () => <TimeWheelStory hourFormat="24h" />,
};

export const Time12h: Story = {
  render: () => <TimeWheelStory hourFormat="12h" />,
};

const DateWheelStory = ({ hasBand }: { hasBand?: boolean }) => {
  const [value, setValue] = useState('2020-03-15T12:00:00.000Z');
  return (
    <WheelPicker
      mode="date"
      value={value}
      onChange={setValue}
      monthLabels={MONTHS}
      locale="en-GB"
      selectionIndicatorStyle={hasBand ? SELECTION_BAND : undefined}
    />
  );
};

export const DateMode: Story = { render: () => <DateWheelStory /> };

export const DateWithSelectionBand: Story = {
  render: () => <DateWheelStory hasBand />,
};

const WeightWheelStory = ({ unit }: { unit: WheelPickerWeightUnit }) => {
  const [weightKg, setWeightKg] = useState<number | null>(4.3);
  return (
    <WheelPicker
      mode="weight"
      unit={unit}
      weightKg={weightKg}
      onChange={setWeightKg}
      unitLabels={WEIGHT_LABELS}
    />
  );
};

export const WeightKg: Story = {
  render: () => <WeightWheelStory unit="kg" />,
};

export const WeightLbs: Story = {
  render: () => <WeightWheelStory unit="lbs" />,
};
