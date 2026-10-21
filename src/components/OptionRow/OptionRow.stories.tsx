import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives/Box';
import { OptionRow } from './OptionRow';

const noop = () => undefined;

const meta = {
  title: 'Components/OptionRow',
  component: OptionRow,
  args: {
    label: 'Label',
    isSelected: false,
    onPress: noop,
  },
} satisfies Meta<typeof OptionRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `OptionRow` isSelected=false. */
export const IsSelectedFalse: Story = { name: 'isSelected=false' };

/** Figma `OptionRow` isSelected=true. */
export const IsSelectedTrue: Story = {
  name: 'isSelected=true',
  args: { isSelected: true },
};

export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  render: args => (
    <Box gap={4}>
      <OptionRow {...args} isSelected={false} />
      <OptionRow {...args} isSelected />
    </Box>
  ),
};
