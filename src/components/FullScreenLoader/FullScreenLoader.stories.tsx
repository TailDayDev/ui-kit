import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { FullScreenLoader } from './FullScreenLoader';

const meta = {
  title: 'Components/FullScreenLoader',
  component: FullScreenLoader,
  args: { visible: true, wallpaperSource: true, accessibilityLabel: 'Loading' },
  // The loader fills its parent absolutely; give it a phone-sized frame.
  decorators: [
    Story => (
      <Box style={{ width: 390, height: 844, position: 'relative' }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof FullScreenLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Wallpaper: Story = {};

export const Spinner: Story = { args: { wallpaperSource: false } };

export const Hidden: Story = { args: { visible: false } };
