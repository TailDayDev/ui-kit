import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { PlusIcon } from '../../icons/PlusIcon';
import { Box, Icon, Text } from '../../primitives';
import { lightTheme } from '../../theme';
import { DashedBorder } from './DashedBorder';

const meta = {
  title: 'Components/DashedBorder',
  component: DashedBorder,
  args: { width: 120, height: 120 },
} satisfies Meta<typeof DashedBorder>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Library defaults: dash 8, gap 5, stroke 1.5, radius 8. */
export const Default: Story = {};

/** Photo tile as used in the app (`PhotosList`, `BelongingsPhotos`). */
export const PhotoTile: Story = {
  args: {
    dashLength: 9,
    gapLength: 9,
    borderRadius: 16,
    color: lightTheme.palette.lightGray,
    children: (
      <>
        <Icon icon={PlusIcon} size={40} />
        <Text variant="body/regular">Add photo</Text>
      </>
    ),
  },
};

/** Full-width add row as used in wizards. */
export const AddRow: Story = {
  args: {
    width: 320,
    height: 56,
    dashLength: 8,
    gapLength: 8,
    borderRadius: 16,
    color: lightTheme.palette.lightGray,
    children: (
      <Box row gap={4} align="center">
        <Icon icon={PlusIcon} />
        <Text variant="headline/regular">Add time</Text>
      </Box>
    ),
  },
};
