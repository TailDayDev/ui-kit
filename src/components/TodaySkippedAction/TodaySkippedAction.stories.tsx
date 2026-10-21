import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { TodaySkippedAction } from './TodaySkippedAction';

const meta = {
  title: 'Components/TodaySkippedAction',
  component: TodaySkippedAction,
  args: { label: 'Label' },
} satisfies Meta<typeof TodaySkippedAction>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodaySkippedAction`. */
export const Default: Story = {};

export const Skipped: Story = { args: { label: 'Пропущено' } };
