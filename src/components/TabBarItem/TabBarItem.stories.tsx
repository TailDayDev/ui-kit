import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import {
  IconTabCalendar,
  IconTabMenu,
  IconTabService,
  IconTabToday,
} from '../../icons/figma';
import { Box } from '../../primitives';
import { TabBarItem } from './TabBarItem';

const meta = {
  title: 'Components/TabBarItem',
  component: TabBarItem,
  args: {
    icon: IconTabToday,
    isFocused: true,
    hasBadge: false,
    accessibilityLabel: 'Today',
    onPress: () => {},
  },
} satisfies Meta<typeof TabBarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `isFocused=true`. */
export const IsFocusedTrue: Story = { args: { isFocused: true } };

/** Figma `isFocused=false`. */
export const IsFocusedFalse: Story = { args: { isFocused: false } };

/** Both variants, with and without the badge, across the tab icons. */
export const AllVariants: Story = {
  render: args => (
    <Box gap={2}>
      <Box row>
        <TabBarItem {...args} isFocused />
        <TabBarItem {...args} isFocused={false} />
        <TabBarItem {...args} isFocused hasBadge />
        <TabBarItem {...args} isFocused={false} hasBadge />
      </Box>
      <Box row>
        <TabBarItem {...args} icon={IconTabToday} isFocused={false} />
        <TabBarItem {...args} icon={IconTabCalendar} isFocused={false} />
        <TabBarItem {...args} icon={IconTabService} isFocused={false} />
        <TabBarItem {...args} icon={IconTabMenu} isFocused={false} />
      </Box>
    </Box>
  ),
};
