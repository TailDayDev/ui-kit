import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { Chip } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    name: 'Label',
    count: '0',
    hasBadge: true,
    isSelected: true,
    onPress: () => {},
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `isSelected=true`. */
export const IsSelectedTrue: Story = { args: { isSelected: true } };

/** Figma `isSelected=false`. */
export const IsSelectedFalse: Story = { args: { isSelected: false } };

/** Both variants, with and without the badge. */
export const AllVariants: Story = {
  render: args => (
    <Box gap={2}>
      <Box row gap={1}>
        <Chip {...args} isSelected />
        <Chip {...args} isSelected={false} />
      </Box>
      <Box row gap={1}>
        <Chip {...args} isSelected hasBadge={false} />
        <Chip {...args} isSelected={false} hasBadge={false} />
      </Box>
    </Box>
  ),
};
