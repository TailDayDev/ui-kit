import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { EmptyList } from './EmptyList';

/** Size of the app image. */
const ILLUSTRATION_SIZE = 80;

/** Stands in for the app image. */
const IllustrationPlaceholder = () => (
  <Box
    background="subtle"
    radius="full"
    style={{ width: ILLUSTRATION_SIZE, height: ILLUSTRATION_SIZE }}
  />
);

const meta = {
  title: 'Components/EmptyList',
  component: EmptyList,
  args: {
    message: 'Ничего не найдено',
    illustration: <IllustrationPlaceholder />,
  },
} satisfies Meta<typeof EmptyList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIllustration: Story = { args: { illustration: undefined } };

export const NoTopOffset: Story = { args: { style: { marginTop: 0 } } };
