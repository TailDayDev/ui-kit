import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayTaskHeader } from './TodayTaskHeader';

// Story-only stand-in for the app's raster task-type artwork.
const sampleIcon = <Icon icon={IconPawPrint} />;

const meta = {
  title: 'Components/TodayTaskHeader',
  component: TodayTaskHeader,
  args: {
    badge: { actionType: 'CheckIn', label: 'Label', icon: sampleIcon },
    time: { title: 'Title', subtitle: 'Subtitle', tone: 'default' },
  },
  decorators: [
    Story => (
      <Box background="surface">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TodayTaskHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodayTaskHeader`. */
export const Default: Story = {};

export const Overdue: Story = {
  args: {
    badge: { actionType: 'Feeding', label: 'Feeding', icon: sampleIcon },
    time: { title: '09:00', subtitle: '45 min late', tone: 'overdue' },
  },
};

export const LongCareTypes: Story = {
  args: {
    badge: {
      actionType: 'CheckIn',
      label: 'Check-in',
      icon: sampleIcon,
      hasCareType: true,
      careType: 'Boarding',
      hasSecondCareType: true,
      secondCareType: 'Grooming and a long care name',
    },
    time: { title: '10:00', subtitle: 'in 2 h' },
  },
};

export const WithoutTime: Story = { args: { time: undefined } };
