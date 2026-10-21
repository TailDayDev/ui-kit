import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { BaseSkeleton } from './BaseSkeleton';

const meta = {
  title: 'Components/Skeleton',
  component: BaseSkeleton,
  args: { width: 120, height: 20 },
} satisfies Meta<typeof BaseSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `BaseSkeleton`: 120×20, radius 8, `softGray` fill. */
export const Default: Story = {};

/** App defaults: full width, 22 tall. */
export const FullWidth: Story = {
  args: { width: '100%', height: undefined },
  render: args => (
    <Box padding={4}>
      <BaseSkeleton {...args} />
    </Box>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Box gap={3} padding={4}>
      <BaseSkeleton height={64} borderRadius={16} />
      <Box row gap={2}>
        <BaseSkeleton width={56} height={56} />
        <BaseSkeleton width={56} height={56} borderRadius={28} />
      </Box>
      <BaseSkeleton width="56%" height={20} />
      <BaseSkeleton width="72%" height={16} />
      <BaseSkeleton height={1} />
    </Box>
  ),
};

export const CustomColor: Story = {
  args: { backgroundColor: '#E0E0E0' },
};

export const Accessible: Story = {
  args: { accessibilityLabel: 'Loading' },
};
