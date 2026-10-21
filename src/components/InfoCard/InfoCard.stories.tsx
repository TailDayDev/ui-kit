import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives/Box';
import { InfoCard } from './InfoCard';

/** Size of the image the app passes. */
const APP_ICON_SIZE = 40;

/** Stands in for the app image. */
const IconPlaceholder = () => (
  <Box
    background="accentSoft"
    radius="sm"
    style={{ width: APP_ICON_SIZE, height: APP_ICON_SIZE }}
  />
);

const meta = {
  title: 'Components/InfoCard',
  component: InfoCard,
  args: {
    icon: <IconPlaceholder />,
    title: 'Set up calendar',
    description: 'Select the dates when the service is available',
  },
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDescription: Story = { args: { description: '' } };

export const LongText: Story = {
  args: {
    title: 'A long title that needs to wrap onto the next line in a narrow row',
    description:
      'A long description that also wraps and keeps the illustration vertically centred.',
  },
};
