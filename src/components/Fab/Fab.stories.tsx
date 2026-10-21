import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { CheckIcon } from '../../icons/CheckIcon';
import { Box } from '../../primitives';
import { Fab } from './Fab';

const meta = {
  title: 'Components/Fab',
  component: Fab,
  args: { accessibilityLabel: 'New task', disabled: false },
  argTypes: { icon: { control: false } },
  decorators: [
    Story => (
      <Box padding={6} background="screen" align="flex-start">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press it to see the kit pressed opacity (0.85). */
export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const CustomIcon: Story = { args: { icon: CheckIcon } };
