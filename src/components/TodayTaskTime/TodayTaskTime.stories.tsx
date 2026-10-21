import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { TodayTaskTime } from './TodayTaskTime';
import type { TodayTaskTimeTone } from './TodayTaskTime.types';

const TONES: TodayTaskTimeTone[] = ['default', 'overdue', 'completed'];

const meta = {
  title: 'Components/TodayTaskTime',
  component: TodayTaskTime,
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    hasSubtitle: true,
    tone: 'default',
  },
  argTypes: { tone: { control: 'select', options: TONES } },
} satisfies Meta<typeof TodayTaskTime>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma tone=default. */
export const Default: Story = {};
/** Figma tone=overdue. */
export const Overdue: Story = { args: { tone: 'overdue' } };
/** Figma tone=completed. */
export const Completed: Story = { args: { tone: 'completed' } };
/** Figma hasSubtitle=false. */
export const WithoutSubtitle: Story = { args: { hasSubtitle: false } };

export const AllVariants: Story = {
  render: args => (
    <Box row gap={6}>
      {TONES.map(tone => (
        <TodayTaskTime key={tone} {...args} tone={tone} />
      ))}
    </Box>
  ),
};
