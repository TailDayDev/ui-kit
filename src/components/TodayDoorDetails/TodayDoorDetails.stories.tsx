import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayDoorDetails } from './TodayDoorDetails';

// Story-only stand-in for the server placement / daycare artwork.
const sampleIcon = <Icon icon={IconPawPrint} size={40} />;

const meta = {
  title: 'Components/TodayDoorDetails',
  component: TodayDoorDetails,
  args: {
    actionType: 'CheckIn',
    isDaycare: false,
    title: 'Title',
    checkInDate: 'Label',
    checkOutDate: 'Label',
    icon: sampleIcon,
  },
  argTypes: {
    actionType: { control: 'inline-radio', options: ['CheckIn', 'CheckOut'] },
  },
  decorators: [
    Story => (
      <Box background="surface">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TodayDoorDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma actionType=CheckIn, isDaycare=false. */
export const CheckIn: Story = {};
/** Figma actionType=CheckIn, isDaycare=true. */
export const CheckInDaycare: Story = { args: { isDaycare: true } };
/** Figma actionType=CheckOut, isDaycare=false. */
export const CheckOut: Story = { args: { actionType: 'CheckOut' } };
/** Figma actionType=CheckOut, isDaycare=true. */
export const CheckOutDaycare: Story = {
  args: { actionType: 'CheckOut', isDaycare: true },
};

export const AllVariants: Story = {
  render: args => (
    <Box>
      <TodayDoorDetails {...args} actionType="CheckIn" isDaycare={false} />
      <TodayDoorDetails {...args} actionType="CheckIn" isDaycare />
      <TodayDoorDetails {...args} actionType="CheckOut" isDaycare={false} />
      <TodayDoorDetails {...args} actionType="CheckOut" isDaycare />
    </Box>
  ),
};
