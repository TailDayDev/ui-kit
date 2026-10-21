import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { OfflineDataBar } from './OfflineDataBar';

const meta = {
  title: 'Components/OfflineDataBar',
  component: OfflineDataBar,
  args: {
    label: 'Нет сети. Показаны сохранённые данные',
  },
} satisfies Meta<typeof OfflineDataBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongLabel: Story = {
  args: {
    label:
      'Нет подключения к интернету. Показаны данные, сохранённые при последней синхронизации',
  },
};
