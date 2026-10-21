import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { NoImagePlaceholder } from '../NoImagePlaceholder';
import { PetOwnerAvatar } from './PetOwnerAvatar';

// Story-only stand-in for the app's admin `NoImageIcon` artwork.
const samplePlaceholder = (
  <NoImagePlaceholder
    renderImage={() => <Box flex background="subtle" radius="sm" />}
  />
);

const meta = {
  title: 'Components/PetOwnerAvatar',
  component: PetOwnerAvatar,
  args: {
    petPhotoUrl: 'https://picsum.photos/id/237/112/112',
    ownerFirstName: 'Anna',
    ownerLastName: 'Cooper',
    petPlaceholder: samplePlaceholder,
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

export const NoPetPhoto: Story = { args: { petPhotoUrl: null } };

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

/** Figma `PetOwnerAvatar`: 64pt photo, radius 12, `body/regular` initials. */
export const FigmaSize: Story = { args: { size: 64, petPhotoUrl: null } };
