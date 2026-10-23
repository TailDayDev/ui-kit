import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { PetOwnerAvatar } from './PetOwnerAvatar';

const meta = {
  title: 'Components/PetOwnerAvatar',
  component: PetOwnerAvatar,
  args: {
    petPhotoUrl: 'https://picsum.photos/id/237/112/112',
    ownerFirstName: 'Anna',
    ownerLastName: 'Cooper',
  },
} satisfies Meta<typeof PetOwnerAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma hasPhoto=false: owner initials in the badge. */
export const OwnerInitials: Story = {};

/** Figma hasPhoto=true: owner photo in the badge. */
export const OwnerPhoto: Story = {
  args: { ownerPhotoUrl: 'https://picsum.photos/id/64/48/48' },
};

/** Figma hasPhoto=false: grey paw on `bg.subtle` (default `petPlaceholder`). */
export const NoPetPhoto: Story = {
  args: {
    petPhotoUrl: null,
    ownerPhotoUrl: 'https://picsum.photos/id/64/48/48',
  },
};

export const NoPhotos: Story = {
  args: { petPhotoUrl: null, ownerPhotoUrl: null },
};

export const OnSurface: Story = {
  render: args => (
    <Box padding={4} background="surface" row gap={4}>
      <PetOwnerAvatar {...args} />
      <PetOwnerAvatar
        {...args}
        ownerPhotoUrl="https://picsum.photos/id/64/48/48"
      />
    </Box>
  ),
};

/** Compact 56pt photo with radius 8 (old app size). */
export const CompactSize: Story = { args: { size: 56 } };
