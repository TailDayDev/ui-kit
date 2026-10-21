import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { ServiceHeaderTrigger } from './ServiceHeaderTrigger';

const meta = {
  title: 'Components/ServiceHeaderTrigger',
  component: ServiceHeaderTrigger,
  args: {
    titleSelected: 'Title',
    notifications: '0',
    hasNotificationsBadge: true,
    onPress: () => {},
  },
} satisfies Meta<typeof ServiceHeaderTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `ServiceHeaderTrigger` (default properties). */
export const Default: Story = {};

/** Badge hidden. */
export const WithoutBadge: Story = { args: { hasNotificationsBadge: false } };

/** Long name shrinks with an ellipsis. */
export const LongTitle: Story = {
  args: {
    titleSelected: 'Hotel with a very long name for pets',
    notifications: '12',
  },
};

/** All states side by side. */
export const AllVariants: Story = {
  render: args => (
    <Box gap={4}>
      <ServiceHeaderTrigger {...args} />
      <ServiceHeaderTrigger {...args} hasNotificationsBadge={false} />
      <ServiceHeaderTrigger {...args} notifications="12" />
    </Box>
  ),
};
