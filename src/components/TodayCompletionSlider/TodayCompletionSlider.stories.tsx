import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { TodayCompletionSlider } from './TodayCompletionSlider';
import type { TodayCompletionSliderProps } from './TodayCompletionSlider.types';

const meta = {
  title: 'Components/TodayCompletionSlider',
  component: TodayCompletionSlider,
  args: {
    completedLabel: 'Label',
    isCompleted: false,
    isDisabled: false,
    onComplete: () => {},
  },
} satisfies Meta<typeof TodayCompletionSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `isCompleted=false, isDisabled=false`. */
export const Default: Story = {};

/** Figma `isCompleted=true, isDisabled=false`. */
export const Completed: Story = { args: { isCompleted: true } };

/** Figma `isCompleted=false, isDisabled=true`. */
export const Disabled: Story = { args: { isDisabled: true } };

/** All Figma variants side by side. */
export const AllVariants: Story = {
  render: args => (
    <Box gap={3}>
      <TodayCompletionSlider {...args} />
      <TodayCompletionSlider {...args} isCompleted />
      <TodayCompletionSlider {...args} isDisabled />
    </Box>
  ),
};

const InteractiveSlider = (args: TodayCompletionSliderProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <TodayCompletionSlider
      {...args}
      isCompleted={isCompleted}
      onComplete={() => setIsCompleted(true)}
    />
  );
};

/** Swipe right to complete. */
export const Interactive: Story = {
  args: { completedLabel: 'Готово!' },
  render: args => <InteractiveSlider {...args} />,
};
