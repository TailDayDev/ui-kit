import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PlusIcon } from '../../icons/PlusIcon';
import { Icon } from '../../primitives/Icon';
import { IconRoundButton } from '../IconButton';
import { Input } from '../Input';
import { ScreenNav } from './ScreenNav';

/** Simulated iPhone status bar inset. */
const METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const AddButton = () => (
  <IconRoundButton
    accessibilityLabel="Add"
    icon={<Icon icon={PlusIcon} size={20} />}
    onPress={() => undefined}
  />
);

const meta = {
  title: 'Components/ScreenNav',
  component: ScreenNav,
  decorators: [
    Story => (
      <SafeAreaProvider initialMetrics={METRICS}>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  args: {
    title: 'Bookings',
    isDevider: true,
    hasBackButton: false,
    centeredTitle: false,
    isOnlyChildren: false,
  },
} satisfies Meta<typeof ScreenNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Root: Story = {};

export const WithRightBlock: Story = { args: { rightBlock: <AddButton /> } };

export const WithBackButton: Story = {
  args: { title: 'Pet profile', hasBackButton: true, goBack: () => undefined },
};

export const CenteredTitle: Story = {
  args: {
    title: 'Check-in',
    hasBackButton: true,
    goBack: () => undefined,
    centeredTitle: true,
    rightBlock: <AddButton />,
  },
};

export const WithoutDivider: Story = { args: { isDevider: false } };

export const WithChildren: Story = {
  args: {
    title: 'Clients',
    children: (
      <Input placeholder="Search" value="" setValue={() => undefined} />
    ),
  },
};

export const OnlyChildren: Story = {
  args: {
    isOnlyChildren: true,
    children: (
      <Input placeholder="Search" value="" setValue={() => undefined} />
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: 'A very long screen title that is truncated at the end',
    rightBlock: <AddButton />,
  },
};
