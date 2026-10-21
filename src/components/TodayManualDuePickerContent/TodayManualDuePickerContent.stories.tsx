import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import type { WheelPickerTimeValue } from '../WheelPicker';
import { TodayManualDuePickerContent } from './TodayManualDuePickerContent';
import type {
  TodayManualDuePickerContentProps,
  TodayManualDuePickerLabels,
} from './TodayManualDuePickerContent.types';

const noop = () => undefined;

const LABELS: TodayManualDuePickerLabels = {
  noTimeTitle: 'Без времени',
  noTimeDescription: 'Задача на весь день, без привязки к точному времени.',
  dayPartTitle: 'Часть дня',
  dayPartDescription: 'Утро, день, вечер или ночь.',
  exactTimeTitle: 'Точное время',
  exactTimeDescription: 'Задача привязана к конкретному времени.',
  morning: 'Утро',
  day: 'День',
  evening: 'Вечер',
  night: 'Ночь',
};

const meta = {
  title: 'Components/TodayManualDuePickerContent',
  component: TodayManualDuePickerContent,
  args: {
    mode: 'noTime',
    dayPart: 'morning',
    time: { hour: '08', minutes: '00', format: 'am' },
    hourFormat: '12h',
    labels: LABELS,
    onModeChange: noop,
    onDayPartChange: noop,
    onTimeChange: noop,
  },
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['noTime', 'dayPart', 'exactTime'],
    },
  },
} satisfies Meta<typeof TodayManualDuePickerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodayManualDuePickerContent` mode=noTime. */
export const NoTime: Story = { name: 'mode=noTime' };

/** Figma `TodayManualDuePickerContent` mode=dayPart. */
export const DayPart: Story = {
  name: 'mode=dayPart',
  args: { mode: 'dayPart' },
};

/** Figma `TodayManualDuePickerContent` mode=exactTime. */
export const ExactTime: Story = {
  name: 'mode=exactTime',
  args: { mode: 'exactTime' },
};

/** 24h locale: no am/pm column. */
export const ExactTime24h: Story = {
  args: {
    mode: 'exactTime',
    hourFormat: '24h',
    time: { hour: '08', minutes: '00', format: null },
  },
};

const InteractiveContent = (args: TodayManualDuePickerContentProps) => {
  const [mode, setMode] = useState(args.mode);
  const [dayPart, setDayPart] = useState(args.dayPart);
  const [time, setTime] = useState<WheelPickerTimeValue | undefined>(args.time);
  return (
    <TodayManualDuePickerContent
      {...args}
      mode={mode}
      dayPart={dayPart}
      time={time}
      onModeChange={setMode}
      onDayPartChange={setDayPart}
      onTimeChange={setTime}
    />
  );
};

/** All modes: switch them by tapping the radios. */
export const AllVariants: Story = {
  render: args => <InteractiveContent {...args} />,
};
