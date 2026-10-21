import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { lightTheme } from '../../theme';
import { ScheduleRadioRow } from './ScheduleRadioRow';

const meta = {
  title: 'Components/ScheduleRadioRow',
  component: ScheduleRadioRow,
  args: {
    title: 'Schedule by time',
    description: 'Times of day',
    selected: true,
    disabled: false,
    onPress: () => undefined,
  },
} satisfies Meta<typeof ScheduleRadioRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {};

export const Unselected: Story = { args: { selected: false } };

export const DisabledSelected: Story = { args: { disabled: true } };

export const DisabledUnselected: Story = {
  args: { disabled: true, selected: false },
};

/** `descriptionColor` override as used by the medication wizard. */
export const CustomDescriptionColor: Story = {
  args: { descriptionColor: lightTheme.palette.darkGray },
};

export const LongText: Story = {
  args: {
    title: 'Exact time with a long title that wraps onto the next line',
    description:
      'Pick the exact times when the pet should get the medication every day',
  },
};

const OPTIONS = [
  { key: 'day_part', title: 'Schedule by time', description: 'Times of day' },
  { key: 'exact', title: 'Exact time', description: 'Set specific hours' },
] as const;

const InteractiveGroup = () => {
  const [selectedKey, setSelectedKey] = useState<string>(OPTIONS[0].key);
  return (
    <Box gap={4}>
      {OPTIONS.map(option => (
        <ScheduleRadioRow
          key={option.key}
          title={option.title}
          description={option.description}
          selected={selectedKey === option.key}
          onPress={() => setSelectedKey(option.key)}
        />
      ))}
    </Box>
  );
};

export const Interactive: Story = { render: () => <InteractiveGroup /> };
