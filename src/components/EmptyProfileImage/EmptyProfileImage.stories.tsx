import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { EmptyProfileImage } from './EmptyProfileImage';
import {
  PROFILE_IMAGE_SIZES,
  type ProfileImageSize,
} from './EmptyProfileImage.types';

const SAMPLE_PHOTO = 'https://picsum.photos/id/64/192/192';
const SIZE_KEYS = Object.keys(PROFILE_IMAGE_SIZES) as ProfileImageSize[];

const meta = {
  title: 'Components/EmptyProfileImage',
  component: EmptyProfileImage,
  args: { firstName: 'Anna', lastName: 'Cooper', size: 'l', shape: 'square' },
  argTypes: {
    size: { control: 'select', options: SIZE_KEYS },
    shape: { control: 'inline-radio', options: ['square', 'circle'] },
  },
} satisfies Meta<typeof EmptyProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `EmptyProfileImage`: 56×56, radius 8, initials headline/bold. */
export const Initials: Story = {};

export const Circle: Story = { args: { shape: 'circle' } };

export const WithPhoto: Story = { args: { imageUrl: SAMPLE_PHOTO } };

export const BrokenPhoto: Story = {
  args: { imageUrl: 'https://invalid.example/photo.jpg' },
};

export const Loading: Story = { args: { loading: true } };

export const LoadingWithPhoto: Story = {
  args: { loading: true, imageUrl: SAMPLE_PHOTO },
};

export const CustomColors: Story = {
  args: { backgroundColor: '#F4EFFF', initialsColor: '#7962FF' },
};

export const Sizes: Story = {
  render: args => (
    <Box gap={3}>
      {(['square', 'circle'] as const).map(shape => (
        <Box key={shape} row gap={3} align="center">
          {SIZE_KEYS.map(size => (
            <EmptyProfileImage key={size} {...args} size={size} shape={shape} />
          ))}
        </Box>
      ))}
    </Box>
  ),
};

export const SizesWithPhoto: Story = {
  args: { imageUrl: SAMPLE_PHOTO },
  render: Sizes.render,
};
