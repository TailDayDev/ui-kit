import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { CardLocked } from './CardLocked';

const meta = {
  title: 'Components/CardLocked',
  component: CardLocked,
  args: { title: 'Species', value: 'Dog' },
} satisfies Meta<typeof CardLocked>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    title: 'A very long locked field name that is truncated to one line',
    value: 'Value text can wrap onto several lines when it is long enough.',
  },
};
