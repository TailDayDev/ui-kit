import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayTaskDetails } from './TodayTaskDetails';

// Story-only stand-in for the app's raster task artwork.
const sampleIcon = <Icon icon={IconPawPrint} />;

const meta = {
  title: 'Components/TodayTaskDetails',
  component: TodayTaskDetails,
  args: {
    title: 'Title',
    hasIcon: true,
    icon: sampleIcon,
    hasTrailing: true,
    trailing: 'Label',
    hasNote: true,
    note: 'Text',
  },
  decorators: [
    Story => (
      <Box background="surface">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TodayTaskDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodayTaskDetails`. */
export const Default: Story = {};

/** Manual task: text only (Figma hasIcon=false, hasTrailing=false). */
export const TextOnly: Story = {
  args: {
    hasIcon: false,
    hasTrailing: false,
    hasNote: false,
    title: 'Brush the coat and check the ears before lunch',
  },
};

export const WithoutNote: Story = { args: { hasNote: false } };

export const LongTexts: Story = {
  args: {
    title: 'Royal Canin Medium Adult dry food, mixed with warm water',
    trailing: '2 × 150 g',
    note: 'Give half in the morning, half in the evening. No treats.',
  },
};
