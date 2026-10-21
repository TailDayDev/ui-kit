import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';

import { TodaySkeleton } from './TodaySkeleton';

// Story canvas: the 398pt preview width.
const CANVAS_WIDTH = 398;

const meta = {
  title: 'Components/TodaySkeleton',
  component: TodaySkeleton,
  args: { accessibilityLabel: 'Loading' },
  decorators: [
    Story => (
      <View style={{ width: CANVAS_WIDTH }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TodaySkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodaySkeleton` (single variant). */
export const Default: Story = {};
