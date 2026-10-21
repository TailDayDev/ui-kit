import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { ScheduleOverview } from './ScheduleOverview';

const noop = () => undefined;

const meta = {
  title: 'Components/ScheduleOverview',
  component: ScheduleOverview,
  args: {
    labels: {
      title: 'Time and repeat',
      timing: 'Time',
      repeat: 'Repeat',
      start: 'Starts',
      end: 'Ends',
    },
    timingValue: '08:00, 18:00',
    repeatValue: 'Every day',
    startValue: 'Aug 18',
    endValue: 'Never',
    isTimingSelected: true,
    isRepeatSelected: true,
    isStartSelected: true,
    isEndSelected: false,
    showRepeat: true,
    showStart: true,
    showEnd: true,
    testIDPrefix: 'schedule',
    onClearEnd: noop,
    onClearRepeat: noop,
    onClearTiming: noop,
    onEndPress: noop,
    onRepeatPress: noop,
    onStartPress: noop,
    onTimingPress: noop,
  },
} satisfies Meta<typeof ScheduleOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    timingValue: 'Not set',
    repeatValue: 'Does not repeat',
    isTimingSelected: false,
    isRepeatSelected: false,
    showStart: false,
    showEnd: false,
  },
};

export const EndSelected: Story = {
  args: { endValue: 'Sep 30', isEndSelected: true },
};

export const WithoutTiming: Story = { args: { showTiming: false } };
