import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { ScrollToTodayButton } from './ScrollToTodayButton';

const meta = {
  title: 'Components/ScrollToTodayButton',
  component: ScrollToTodayButton,
  args: { onPress: () => {}, accessibilityLabel: 'Сегодня' },
} satisfies Meta<typeof ScrollToTodayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `ScrollToTodayButton`. */
export const Default: Story = {};
