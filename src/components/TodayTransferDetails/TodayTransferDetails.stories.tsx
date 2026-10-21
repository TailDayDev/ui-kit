import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayTransferDetails } from './TodayTransferDetails';

// Story-only stand-in for the server placement image.
const sampleImage = <Icon icon={IconPawPrint} />;

const meta = {
  title: 'Components/TodayTransferDetails',
  component: TodayTransferDetails,
  args: {
    fromTitle: 'Label',
    toTitle: 'Label',
    fromImage: sampleImage,
    toImage: sampleImage,
  },
  decorators: [
    Story => (
      <Box background="surface">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TodayTransferDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodayTransferDetails`. */
export const Default: Story = {};

export const LongNames: Story = {
  args: {
    fromTitle: 'Room 12 — big sunny suite',
    toTitle: 'Outdoor playground with a long name',
  },
};
