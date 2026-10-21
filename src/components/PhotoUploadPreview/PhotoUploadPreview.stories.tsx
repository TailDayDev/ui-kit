import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { PhotoUploadPreview } from './PhotoUploadPreview';

const SAMPLE_PHOTO = 'https://picsum.photos/id/237/320/320';

const meta = {
  title: 'Components/PhotoUploadPreview',
  component: PhotoUploadPreview,
  args: {
    size: 160,
    photo: { id: 1, fileUrl: SAMPLE_PHOTO, status: 'loaded' },
    coverLabel: 'Cover photo',
    errorText: 'Upload failed',
    settingsAccessibilityLabel: 'Photo settings',
  },
} satisfies Meta<typeof PhotoUploadPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};

export const WithActions: Story = {
  args: { onImagePress: () => undefined, onSettingsPress: () => undefined },
};

export const Cover: Story = {
  args: {
    photo: { id: 1, fileUrl: SAMPLE_PHOTO, isCover: true },
    onSettingsPress: () => undefined,
  },
};

export const Uploading: Story = {
  args: { photo: { id: 2, fileUrl: SAMPLE_PHOTO, status: 'uploading' } },
};

export const Error: Story = {
  args: { photo: { id: 3, fileUrl: SAMPLE_PHOTO, status: 'error' } },
};

export const Empty: Story = { args: { photo: { id: 4, fileUrl: null } } };
