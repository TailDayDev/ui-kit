import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { EmptyState } from './EmptyState';

/** Size of the default app illustration. */
const ILLUSTRATION_SIZE = 100;

/** Stands in for the app image. */
const IllustrationPlaceholder = () => (
  <Box
    background="accentSoft"
    radius="full"
    style={{ width: ILLUSTRATION_SIZE, height: ILLUSTRATION_SIZE }}
  />
);

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  args: {
    title: 'Не удалось загрузить данные',
    description: 'Проверьте подключение и попробуйте снова',
    actionTitle: 'Повторить',
    illustration: <IllustrationPlaceholder />,
    onAction: () => {},
    isActionVisible: true,
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAction: Story = {};

export const WithoutAction: Story = {
  args: {
    title: 'Пока нет записей',
    description: 'Нажмите «Добавить», чтобы создать первую',
    onAction: undefined,
  },
};

export const TitleOnly: Story = {
  args: { description: undefined, onAction: undefined },
};

export const ActionHidden: Story = { args: { isActionVisible: false } };

export const WithoutIllustration: Story = { args: { illustration: undefined } };
