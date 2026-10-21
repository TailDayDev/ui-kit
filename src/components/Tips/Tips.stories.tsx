import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives/Box';
import { Tips } from './Tips';

/** Size of the image the app passes. */
const APP_ICON_SIZE = 40;

/** Stands in for the app image. */
const IconPlaceholder = () => (
  <Box
    background="warningSoft"
    radius="full"
    style={{ width: APP_ICON_SIZE, height: APP_ICON_SIZE }}
  />
);

const meta = {
  title: 'Components/Tips',
  component: Tips,
  args: {
    icon: <IconPlaceholder />,
    text: 'Keep feeding notes short and action-oriented so staff can scan them quickly.',
  },
} satisfies Meta<typeof Tips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortText: Story = { args: { text: 'More discounts soon.' } };

export const WithoutIcon: Story = { args: { icon: null } };
