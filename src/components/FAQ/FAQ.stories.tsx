import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { FAQ } from './FAQ';

const meta = {
  title: 'Components/FAQ',
  component: FAQ,
  args: {
    loading: false,
    faqData: {
      title: 'Частые вопросы',
      items: [
        {
          id: '1',
          title: 'Как создать бронирование?',
          description:
            'Нажмите «+» на экране календаря, выберите питомца, даты и услугу.',
        },
        {
          id: '2',
          title: 'Можно ли изменить даты проживания после заезда?',
          description:
            'Да. Откройте бронирование и выберите «Изменить даты». Стоимость пересчитается автоматически.',
        },
        {
          id: '3',
          title: 'Как отменить бронирование?',
          description: 'Откройте бронирование и нажмите «Отменить».',
        },
      ],
    },
  },
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = { args: { loading: true } };

export const Empty: Story = {
  args: { faqData: { title: 'Частые вопросы', items: [] } },
};
