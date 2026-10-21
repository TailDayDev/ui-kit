import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Text } from '../../primitives';
import { NetworkFallback } from './NetworkFallback';

/** Fixed preview height so the `flex: 1` fallback has room. */
const PREVIEW_HEIGHT = 240;
/** Simulated network check duration. */
const DEMO_REFRESH_MS = 1000;

const refreshNetwork = () =>
  new Promise<boolean>(resolve => {
    setTimeout(() => resolve(false), DEMO_REFRESH_MS);
  });

const meta = {
  title: 'Components/NetworkFallback',
  component: NetworkFallback,
  args: {
    isContentAvailable: false,
    isOffline: true,
    refreshNetwork,
    resetCallback: () => {},
    view: (
      <Box padding={4}>
        <Text>Нет сети. Потяните вниз, чтобы обновить.</Text>
      </Box>
    ),
    children: (
      <Box padding={4}>
        <Text>Контент</Text>
      </Box>
    ),
  },
  decorators: [
    Story => (
      <Box style={{ height: PREVIEW_HEIGHT }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof NetworkFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Offline: Story = {};

export const OfflineWithCachedContent: Story = {
  args: { isContentAvailable: true },
};

export const Online: Story = { args: { isOffline: false } };
