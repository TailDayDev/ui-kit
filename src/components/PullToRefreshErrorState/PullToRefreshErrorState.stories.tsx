import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { PullToRefreshErrorState } from './PullToRefreshErrorState';

/** Size of the app image. */
const ILLUSTRATION_SIZE = 120;

/** Stands in for the app image. */
const IllustrationPlaceholder = () => (
  <Box
    background="subtle"
    radius="full"
    style={{ width: ILLUSTRATION_SIZE, height: ILLUSTRATION_SIZE }}
  />
);

const meta = {
  title: 'Components/PullToRefreshErrorState',
  component: PullToRefreshErrorState,
  args: {
    title: 'Не удалось загрузить',
    description: 'Проверьте подключение и потяните вниз, чтобы обновить',
    illustration: <IllustrationPlaceholder />,
  },
} satisfies Meta<typeof PullToRefreshErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIllustration: Story = { args: { illustration: undefined } };
