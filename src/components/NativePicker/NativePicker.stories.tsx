import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { NativePicker } from './NativePicker';
import type { NativePickerItem } from './NativePicker.types';

const HOURS: NativePickerItem<string>[] = Array.from({ length: 24 }, (_, i) => {
  const label = String(i).padStart(2, '0');
  return { label, value: label };
});

const meta = {
  title: 'Components/NativePicker',
  component: NativePicker,
  args: {
    items: HOURS,
    selectedValue: '09',
    onValueChange: () => undefined,
    accessibilityLabel: 'Hour',
  },
} satisfies Meta<typeof NativePicker<string>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomItemColor: Story = {
  args: {
    items: HOURS.map((item, index) =>
      index % 2 === 0 ? { ...item, color: '#EB5757' } : item,
    ),
  },
};

const InteractivePicker = () => {
  const [hour, setHour] = useState('09');
  return (
    <NativePicker
      items={HOURS}
      selectedValue={hour}
      onValueChange={setHour}
      accessibilityLabel="Hour"
    />
  );
};

export const Interactive: Story = { render: () => <InteractivePicker /> };
