import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { SegmentedControl } from './SegmentedControl';
import type { SegmentedControlProps } from './SegmentedControl.types';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: {
    options: ['Care', 'Pet', 'Owner'],
    selectedIndex: 0,
    onChange: () => undefined,
  },
  decorators: [
    Story => (
      <View style={{ width: 360 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SecondSelected: Story = { args: { selectedIndex: 1 } };

export const TwoOptions: Story = {
  args: { options: ['Available', 'All'], selectedIndex: 1 },
};

const InteractiveSegmentedControl = (
  props: Pick<SegmentedControlProps, 'isImmediatePressFeedback'>,
) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <SegmentedControl
      {...props}
      options={['Care', 'Pet', 'Owner']}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveSegmentedControl />,
};

export const ImmediatePressFeedback: Story = {
  render: () => <InteractiveSegmentedControl isImmediatePressFeedback />,
};
