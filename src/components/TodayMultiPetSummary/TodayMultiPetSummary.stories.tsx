import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Image } from 'react-native';

import { IconPawPrint } from '../../icons/figma';
import { Box, Icon } from '../../primitives';
import { TodayMultiPetSummary } from './TodayMultiPetSummary';

// Story-only stand-ins for the app's `DinamicImage` photos.
const STORY_PHOTO_SIZE = 64;
const photo = (id: number) => (
  <Image
    source={{ uri: `https://picsum.photos/id/${id}/128/128` }}
    style={{ width: STORY_PHOTO_SIZE, height: STORY_PHOTO_SIZE }}
  />
);

const meta = {
  title: 'Components/TodayMultiPetSummary',
  component: TodayMultiPetSummary,
  args: {
    pets: [
      { id: '1', photo: photo(237), accessibilityLabel: 'Rex' },
      { id: '2', photo: photo(1025), accessibilityLabel: 'Bella' },
      { id: '3', photo: photo(169), accessibilityLabel: 'Max' },
    ],
    extraCount: '+0',
    detailsLabel: 'Label',
    noPhotoImage: <Icon icon={IconPawPrint} size={32} />,
    onDetailsPress: () => undefined,
  },
  decorators: [
    Story => (
      <Box background="surface">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof TodayMultiPetSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodayMultiPetSummary`. */
export const Default: Story = {};

export const WithoutExtraCount: Story = { args: { extraCount: undefined } };

/** Figma hidden `Без фото` layer: a pet without a photo. */
export const WithoutPhoto: Story = {
  args: {
    pets: [
      { id: '1', photo: photo(237) },
      { id: '2' },
      { id: '3', photo: photo(169) },
    ],
    extraCount: '+2',
  },
};
