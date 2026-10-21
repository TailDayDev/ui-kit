import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { NoImagePlaceholder } from '../NoImagePlaceholder';
import { OverlappingPetAvatars } from './OverlappingPetAvatars';
import { PetAvatar } from './PetAvatar';
import { PET_AVATAR_SIZES, type PetAvatarSize } from './PetAvatar.types';

const SAMPLE_PHOTO = 'https://picsum.photos/id/237/192/192';
const SIZE_KEYS = Object.keys(PET_AVATAR_SIZES) as PetAvatarSize[];

// Story-only stand-in for the app's admin `NoImageIcon` artwork.
const samplePlaceholder = (
  <NoImagePlaceholder
    renderImage={() => <Box flex background="subtle" radius="full" />}
  />
);

const meta = {
  title: 'Components/PetAvatar',
  component: PetAvatar,
  args: { size: 'l', shape: 'circle', placeholder: samplePlaceholder },
  argTypes: {
    size: { control: 'select', options: SIZE_KEYS },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
  },
} satisfies Meta<typeof PetAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPhoto: Story = { args: { photoUrl: SAMPLE_PHOTO } };

export const NoPhoto: Story = {};

export const Square: Story = {
  args: { photoUrl: SAMPLE_PHOTO, shape: 'square' },
};

export const BrokenPhoto: Story = {
  args: { photoUrl: 'https://invalid.example/pet.jpg' },
};

export const Sizes: Story = {
  args: { photoUrl: SAMPLE_PHOTO },
  render: args => (
    <Box gap={3}>
      {(['circle', 'square'] as const).map(shape => (
        <Box key={shape} row gap={3} align="center">
          {SIZE_KEYS.map(size => (
            <PetAvatar key={size} {...args} size={size} shape={shape} />
          ))}
        </Box>
      ))}
    </Box>
  ),
};

const PETS = [
  { id: 1, photoUrl: SAMPLE_PHOTO },
  { id: 2, photoUrl: null },
  { id: 3, photoUrl: 'https://picsum.photos/id/1025/96/96' },
  { id: 4, photoUrl: SAMPLE_PHOTO },
  { id: 5, photoUrl: null },
];

export const Overlapping: Story = {
  render: () => (
    <Box gap={3}>
      <OverlappingPetAvatars pets={PETS} placeholder={samplePlaceholder} />
      <OverlappingPetAvatars
        pets={PETS}
        showRemainingBadge
        placeholder={samplePlaceholder}
      />
      <OverlappingPetAvatars
        pets={PETS.slice(0, 1)}
        placeholder={samplePlaceholder}
      />
      <OverlappingPetAvatars
        pets={PETS}
        size="s"
        maxVisible={2}
        showRemainingBadge
        placeholder={samplePlaceholder}
      />
    </Box>
  ),
};
