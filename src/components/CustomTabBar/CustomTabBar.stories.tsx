import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import {
  IconTabCalendar,
  IconTabMenu,
  IconTabService,
  IconTabToday,
} from '../../icons/figma';
import { Box } from '../../primitives';
import { CustomTabBar } from './CustomTabBar';
import type { CustomTabBarTab } from './CustomTabBar.types';

const TABS: CustomTabBarTab[] = [
  { key: 'today', icon: IconTabToday, accessibilityLabel: 'Today' },
  { key: 'calendar', icon: IconTabCalendar, accessibilityLabel: 'Calendar' },
  { key: 'service', icon: IconTabService, accessibilityLabel: 'Service' },
  { key: 'menu', icon: IconTabMenu, accessibilityLabel: 'Menu' },
];

const meta = {
  title: 'Components/CustomTabBar',
  component: CustomTabBar,
  args: {
    tabs: TABS,
    activeKey: 'today',
    onTabPress: () => {},
  },
  argTypes: {
    activeKey: {
      control: 'select',
      options: ['today', 'calendar', 'service', 'menu'],
    },
  },
} satisfies Meta<typeof CustomTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `activeTab=today`. */
export const ActiveTabToday: Story = { args: { activeKey: 'today' } };

/** Figma `activeTab=calendar`. */
export const ActiveTabCalendar: Story = { args: { activeKey: 'calendar' } };

/** Figma `activeTab=service`. */
export const ActiveTabService: Story = { args: { activeKey: 'service' } };

/** Figma `activeTab=menu`. */
export const ActiveTabMenu: Story = { args: { activeKey: 'menu' } };

/** Calendar tab with the pending-items dot. */
export const WithBadge: Story = {
  args: {
    tabs: TABS.map(tab =>
      tab.key === 'calendar' ? { ...tab, hasBadge: true } : tab,
    ),
  },
};

const InteractiveBar = () => {
  const [activeKey, setActiveKey] = useState('today');
  return (
    <CustomTabBar tabs={TABS} activeKey={activeKey} onTabPress={setActiveKey} />
  );
};

/** Tap a tab: the indicator slides under it. */
export const Interactive: Story = { render: () => <InteractiveBar /> };

/** All four Figma variants. */
export const AllVariants: Story = {
  render: args => (
    <Box gap={2}>
      {['today', 'calendar', 'service', 'menu'].map(key => (
        <CustomTabBar key={key} {...args} activeKey={key} />
      ))}
    </Box>
  ),
};
