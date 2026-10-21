import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { TodayDoorButton } from './TodayDoorButton';

const meta = {
  title: 'Components/TodayDoorButton',
  component: TodayDoorButton,
  args: { label: 'Label', onPress: () => {}, isDisabled: false },
  decorators: [
    Story => (
      <Box style={{ width: 302 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TodayDoorButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodayDoorButton`. */
export const Default: Story = {};

export const CheckIn: Story = { args: { label: 'Заселить' } };

export const Disabled: Story = {
  args: { label: 'Выселить', isDisabled: true },
};
