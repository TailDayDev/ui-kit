import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconCalendarDays, IconTrash2 } from '../../icons/figma';
import { Box } from '../../primitives/Box';
import { TaskSheetRow } from './TaskSheetRow';

const noop = () => undefined;

const meta = {
  title: 'Components/TaskSheetRow',
  component: TaskSheetRow,
  args: {
    label: 'Label',
    icon: IconCalendarDays,
    isDestructive: false,
    onPress: noop,
  },
} satisfies Meta<typeof TaskSheetRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TaskSheetRow` isDestructive=false. */
export const IsDestructiveFalse: Story = { name: 'isDestructive=false' };

/** Figma `TaskSheetRow` isDestructive=true. */
export const IsDestructiveTrue: Story = {
  name: 'isDestructive=true',
  args: { isDestructive: true },
};

/** How the app uses the destructive row (TaskSheetContent "Удалить"). */
export const Delete: Story = {
  args: { label: 'Удалить', icon: IconTrash2, isDestructive: true },
};

export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  render: args => (
    <Box gap={4}>
      <TaskSheetRow {...args} isDestructive={false} />
      <TaskSheetRow {...args} isDestructive />
    </Box>
  ),
};
