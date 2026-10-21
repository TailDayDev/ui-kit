import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayPlacementList } from './TodayPlacementList';

// Story-only stand-in for the server placement image.
const sampleImage = <Icon icon={IconPawPrint} size={16} />;

const meta = {
  title: 'Components/TodayPlacementList',
  component: TodayPlacementList,
  args: {
    itemsCount: 1,
    title: 'Label',
    image: sampleImage,
    secondTitle: 'Label',
    secondImage: sampleImage,
  },
  argTypes: { itemsCount: { control: 'inline-radio', options: [1, 2] } },
  decorators: [
    Story => (
      <Box style={{ width: 290 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TodayPlacementList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma itemsCount=1. */
export const One: Story = {};
/** Figma itemsCount=2. */
export const Two: Story = { args: { itemsCount: 2 } };

export const LongNames: Story = {
  args: {
    itemsCount: 2,
    title: 'Room 12 — big sunny suite',
    secondTitle: 'Daycare playground with a very long name',
  },
};

export const AllVariants: Story = {
  render: args => (
    <Box gap={4}>
      <TodayPlacementList {...args} itemsCount={1} />
      <TodayPlacementList {...args} itemsCount={2} />
    </Box>
  ),
};
