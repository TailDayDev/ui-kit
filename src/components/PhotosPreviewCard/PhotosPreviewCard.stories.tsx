import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { PhotosPreviewCard } from './PhotosPreviewCard';

const PHOTOS = [
  { fileUrl: 'https://picsum.photos/id/237/288/288', isCover: true },
  { fileUrl: 'https://picsum.photos/id/1025/240/240' },
  { fileUrl: 'https://picsum.photos/id/169/240/240' },
];

const meta = {
  title: 'Components/PhotosPreviewCard',
  component: PhotosPreviewCard,
  args: {
    title: 'Photos',
    photoCountText: '3',
    emptyText: 'No photos yet',
    photos: PHOTOS,
  },
} satisfies Meta<typeof PhotosPreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreePhotos: Story = {};

export const TwoPhotos: Story = {
  args: { photos: PHOTOS.slice(0, 2), photoCountText: '2' },
};

export const TwoPhotosCompact: Story = {
  args: {
    photos: PHOTOS.slice(0, 2),
    photoCountText: '2',
    useCompactTwoPhotoLayout: true,
  },
};

export const OnePhoto: Story = {
  args: { photos: PHOTOS.slice(0, 1), photoCountText: '1' },
};

export const Empty: Story = { args: { photos: [], photoCountText: '0' } };

export const Pressable: Story = { args: { onPress: () => undefined } };

export const Flat: Story = { args: { withShadow: false } };
