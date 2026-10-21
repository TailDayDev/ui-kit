import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { StickySegmentedControl } from './StickySegmentedControl';

const meta = {
  title: 'Components/StickySegmentedControl',
  component: StickySegmentedControl,
  args: {
    options: ['Care', 'Pet', 'Owner'],
    selectedIndex: 0,
    onChange: () => undefined,
    screenWidth: 360,
    top: 0,
    style: { left: 16, position: 'absolute', right: 16 },
  },
  decorators: [
    Story => (
      <View style={{ height: 120, width: 392 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof StickySegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OffsetTop: Story = { args: { top: 40, selectedIndex: 2 } };

const InteractiveSticky = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <StickySegmentedControl
      options={['Care', 'Pet', 'Owner']}
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      screenWidth={360}
      top={0}
      style={{ left: 16, position: 'absolute', right: 16 }}
    />
  );
};

export const Interactive: Story = { render: () => <InteractiveSticky /> };
