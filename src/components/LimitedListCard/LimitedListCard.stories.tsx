import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { LimitedListCard } from './LimitedListCard';

const meta = {
  title: 'Components/LimitedListCard',
  component: LimitedListCard,
  args: {
    title: 'Питомцы',
    items: ['Рекс', 'Белла', 'Макс', 'Луна', 'Чарли'],
    maxVisible: 3,
    formatMoreLabel: (count: number) => `+ ещё ${count}`,
  },
  decorators: [
    Story => (
      <Box padding={4} background="screen">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof LimitedListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHiddenItems: Story = {};

export const AllVisible: Story = { args: { items: ['Рекс', 'Белла'] } };

export const Pressable: Story = { args: { onPress: () => {} } };
