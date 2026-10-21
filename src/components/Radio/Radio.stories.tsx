import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Text } from '../../primitives';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: { isActive: true, size: 24, dotSize: 12 },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Inactive: Story = { args: { isActive: false } };

/** Figma `Radio` size=20 (dot 10) next to the app default size=24 and the 32/16 used in wizards. */
export const Sizes: Story = {
  render: () => (
    <Box gap={4}>
      {(
        [
          [20, 10],
          [24, 12],
          [32, 16],
        ] as const
      ).map(([size, dotSize]) => (
        <Box key={size} row gap={4} align="center">
          <Radio isActive={false} size={size} dotSize={dotSize} />
          <Radio isActive size={size} dotSize={dotSize} />
          <Text variant="caption/regular" color="secondary">
            size {size}, dot {dotSize}
          </Text>
        </Box>
      ))}
    </Box>
  ),
};
