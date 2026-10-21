import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { PlusIcon } from '../../icons/PlusIcon';
import { Box, Icon, Pressable, Text } from '../../primitives';
import { FloatingButton } from './FloatingButton';
import type { FloatingButtonProps } from './FloatingButton.types';

const CANVAS_HEIGHT = 200;
const HALF_WIDTH = '50%';

const meta = {
  title: 'Components/FloatingButton',
  component: FloatingButton,
  args: {
    title: 'Add booking',
    onPress: () => undefined,
    visible: true,
    disabled: false,
  },
  argTypes: { icon: { control: false } },
  decorators: [
    Story => (
      <Box background="screen" style={{ height: CANVAS_HEIGHT }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press it to see the 0.9 active opacity. */
export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: <Icon icon={PlusIcon} color="text.inverse" />,
  },
};

export const HalfWidth: Story = {
  args: { buttonStyle: { width: HALF_WIDTH, justifyContent: 'center' } },
};

export const Disabled: Story = { args: { disabled: true } };

const ToggleDemo = (args: FloatingButtonProps) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      <Pressable
        accessibilityLabel="Toggle"
        onPress={() => setIsVisible(value => !value)}
      >
        <Box padding={4}>
          <Text variant="body/medium">
            {isVisible ? 'Hide' : 'Show'} button
          </Text>
        </Box>
      </Pressable>
      <FloatingButton {...args} visible={isVisible} />
    </>
  );
};

/** Toggles `visible` to show the fade + slide animation. */
export const ToggleVisibility: Story = {
  render: args => <ToggleDemo {...args} />,
};
