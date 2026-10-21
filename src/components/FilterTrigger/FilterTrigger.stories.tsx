import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { FilterTrigger } from './FilterTrigger';

const meta = {
  title: 'Components/FilterTrigger',
  component: FilterTrigger,
  args: {
    accessibilityLabel: 'Filters',
    count: 0,
    disabled: false,
    onPress: () => undefined,
  },
} satisfies Meta<typeof FilterTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCount: Story = { args: { count: 3 } };

export const TwoDigits: Story = { args: { count: 12 } };

export const Capped: Story = { args: { count: 1200 } };

export const Disabled: Story = { args: { disabled: true, count: 3 } };
