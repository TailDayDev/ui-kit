import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Text } from '../Text';
import { Box } from './Box';

const meta = {
  title: 'Primitives/Box',
  component: Box,
  args: { padding: 4, gap: 2, background: 'surface', radius: 'md' },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <Box {...args}>
      <Text>First</Text>
      <Text>Second</Text>
    </Box>
  ),
};

export const Row: Story = {
  args: { row: true, justify: 'space-between', align: 'center' },
  render: Default.render,
};

export const Bordered: Story = {
  args: { border: 1, background: 'surface' },
  render: Default.render,
};

export const WithShadow: Story = {
  args: { shadow: 'block' },
  render: Default.render,
};
