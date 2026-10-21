import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives/Box';
import { StaffPickerRow } from './StaffPickerRow';

const noop = () => undefined;

const meta = {
  title: 'Components/StaffPickerRow',
  component: StaffPickerRow,
  args: {
    name: 'Title',
    position: 'Subtitle',
    isSelected: false,
    onPress: noop,
  },
} satisfies Meta<typeof StaffPickerRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `StaffPickerRow` isSelected=false. */
export const IsSelectedFalse: Story = { name: 'isSelected=false' };

/** Figma `StaffPickerRow` isSelected=true. */
export const IsSelectedTrue: Story = {
  name: 'isSelected=true',
  args: { isSelected: true },
};

/** Real name: initials come from the first two words ("RL"). */
export const WithName: Story = {
  args: { name: 'Robert Lewis', position: 'Groomer' },
};

export const WithoutPosition: Story = {
  args: { name: 'Robert Lewis', position: null },
};

export const AllVariants: Story = {
  render: args => (
    <Box gap={4}>
      <StaffPickerRow {...args} isSelected={false} />
      <StaffPickerRow {...args} isSelected />
    </Box>
  ),
};
