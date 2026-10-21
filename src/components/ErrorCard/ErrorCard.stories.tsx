import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { Button } from '../Button';
import { ErrorCard } from './ErrorCard';

const meta = {
  title: 'Components/ErrorCard',
  component: ErrorCard,
  args: {
    onCancel: () => {},
    title: 'Не удалось сохранить',
    description: 'Проверьте соединение и попробуйте снова',
    errorText: 'Network error',
    closeAccessibilityLabel: 'Закрыть',
  },
  decorators: [
    Story => (
      <Box padding={4} background="screen">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof ErrorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTitle: Story = { args: { title: undefined } };

export const WithoutErrorText: Story = { args: { errorText: '' } };

export const WithActions: Story = {
  args: {
    children: <Button title="Повторить" size="small" onPress={() => {}} />,
  },
};

export const NarrowInsetSmallIcon: Story = {
  args: { horizontalInset: 16, iconSize: 24 },
};
