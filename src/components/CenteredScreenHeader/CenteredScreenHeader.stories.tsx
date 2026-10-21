import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PlusIcon } from '../../icons/PlusIcon';
import { Icon } from '../../primitives/Icon';
import { IconRoundButton } from '../IconButton';
import { CenteredScreenHeader } from './CenteredScreenHeader';

/** Simulated iPhone status bar inset. */
const METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const meta = {
  title: 'Components/CenteredScreenHeader',
  component: CenteredScreenHeader,
  decorators: [
    Story => (
      <SafeAreaProvider initialMetrics={METRICS}>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  args: {
    title: 'Booking details',
    goBack: () => undefined,
  },
} satisfies Meta<typeof CenteredScreenHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSubtitle: Story = { args: { subtitle: 'Booking #1024' } };

export const WithRightAction: Story = {
  args: {
    rightAction: (
      <IconRoundButton
        accessibilityLabel="Add"
        size={36}
        icon={<Icon icon={PlusIcon} size={20} />}
        onPress={() => undefined}
      />
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'A very long screen title that is truncated in the middle area',
    subtitle: 'And a long subtitle that is truncated as well at the end',
  },
};
