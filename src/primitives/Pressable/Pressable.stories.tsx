import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../Box';
import { Text } from '../Text';
import { Pressable } from './Pressable';

const meta = {
  title: 'Primitives/Pressable',
  component: Pressable,
  args: { accessibilityLabel: 'Tap me', disabled: false, loading: false },
} satisfies Meta<typeof Pressable>;

export default meta;
type Story = StoryObj<typeof meta>;

const Surface = () => (
  <Box padding={4} background="subtle" radius="sm">
    <Text variant="body/medium">Tap me</Text>
  </Box>
);

export const Default: Story = {
  render: args => (
    <Pressable {...args}>
      <Surface />
    </Pressable>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
};

export const Loading: Story = {
  args: { loading: true },
  render: Default.render,
};
