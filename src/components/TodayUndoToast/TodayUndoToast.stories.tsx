import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Button } from '../Button';
import { Box } from '../../primitives';
import { TodayUndoToast } from './TodayUndoToast';
import type { TodayUndoToastProps } from './TodayUndoToast.types';

const meta = {
  title: 'Components/TodayUndoToast',
  component: TodayUndoToast,
  args: { label: 'Отменить', onPress: () => {}, isVisible: true },
} satisfies Meta<typeof TodayUndoToast>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodayUndoToast`. */
export const Default: Story = {};

const ToggleToast = (args: TodayUndoToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Box gap={4} align="center">
      <Button
        title={isVisible ? 'Hide' : 'Show'}
        onPress={() => setIsVisible(value => !value)}
      />
      <TodayUndoToast {...args} isVisible={isVisible} />
    </Box>
  );
};

/** Enter / exit animation. */
export const Animated: Story = {
  render: args => <ToggleToast {...args} />,
};
