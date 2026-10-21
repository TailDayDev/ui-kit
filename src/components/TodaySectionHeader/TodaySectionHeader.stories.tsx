import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';

import { TodaySectionHeader } from './TodaySectionHeader';

const noop = () => undefined;
// Figma TodaySectionHeader frame width (430 screen − 2 × 16 padding).
const CANVAS_WIDTH = 398;

const meta = {
  title: 'Components/TodaySectionHeader',
  component: TodaySectionHeader,
  args: {
    title: 'Title',
    isCollapsible: true,
    isExpanded: true,
    isPastDate: false,
    onToggle: noop,
  },
  decorators: [
    Story => (
      <View style={{ width: CANVAS_WIDTH }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TodaySectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma isExpanded=true, isPastDate=false. */
export const ExpandedCurrent: Story = {};

/** Figma isExpanded=true, isPastDate=true. */
export const ExpandedPastDate: Story = { args: { isPastDate: true } };

/** Figma isExpanded=false, isPastDate=false. */
export const CollapsedCurrent: Story = { args: { isExpanded: false } };

/** Figma isExpanded=false, isPastDate=true. */
export const CollapsedPastDate: Story = {
  args: { isExpanded: false, isPastDate: true },
};

/** Figma isCollapsible=false. */
export const NotCollapsible: Story = { args: { isCollapsible: false } };

export const AllVariants: Story = {
  render: args => (
    <View>
      <TodaySectionHeader {...args} isExpanded isPastDate={false} />
      <TodaySectionHeader {...args} isExpanded isPastDate />
      <TodaySectionHeader {...args} isExpanded={false} isPastDate={false} />
      <TodaySectionHeader {...args} isExpanded={false} isPastDate />
      <TodaySectionHeader {...args} isCollapsible={false} />
    </View>
  ),
};
