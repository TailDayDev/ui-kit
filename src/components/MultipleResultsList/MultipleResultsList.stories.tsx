import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { lightTheme } from '../../theme';
import { MultipleResultsList } from './MultipleResultsList';

const Thumb = () => (
  <View
    style={{
      width: 40,
      height: 40,
      borderRadius: lightTheme.radius.sm,
      backgroundColor: lightTheme.colors.bg.accentSoft,
    }}
  />
);

const meta = {
  title: 'Components/MultipleResultsList',
  component: MultipleResultsList,
  args: {
    title: 'Accommodation',
    labels: { edit: 'Edit', from: 'From', to: 'To' },
    onEdit: () => undefined,
    items: [
      {
        key: 'condo',
        title: 'Cat condo',
        priceText: '$12.00 per night',
        dates: ['Sep 30', 'Oct 1'],
        isRange: true,
        image: <Thumb />,
      },
      {
        key: 'kennel',
        title: 'Outdoor kennel',
        priceText: '$18.00 per night',
        dates: ['Oct 1', 'Oct 3'],
        isRange: true,
      },
    ],
  },
} satisfies Meta<typeof MultipleResultsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NightStays: Story = {};

export const DayVisit: Story = {
  args: {
    items: [
      {
        key: 'day',
        title: 'Day care room',
        priceText: '$25.00',
        dates: ['Sep 30'],
        isRange: false,
        image: <Thumb />,
      },
    ],
  },
};

export const DayVisitCentered: Story = {
  args: { ...DayVisit.args, isSingleDateCentered: true },
};

export const WithTotal: Story = {
  args: { totalLabel: 'Total', totalValue: '$84.00' },
};

export const NoTitle: Story = { args: { title: undefined } };
