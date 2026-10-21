import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { UserDetailsCard } from './UserDetailsCard';

const meta = {
  title: 'Components/UserDetailsCard',
  component: UserDetailsCard,
  args: {
    title: 'Owner',
    name: 'Anna Cooper',
    fallbackName: 'Unknown owner',
    actionText: 'Open profile',
    onActionPress: () => undefined,
    details: [
      { label: 'Phone', value: '+1 555 0100', onPress: () => undefined },
      {
        label: 'Email',
        value: 'anna.cooper@example.com',
        subLabel: 'Preferred contact',
      },
      { label: 'Address', value: '12 Garden Street, Springfield' },
      { label: 'Hidden (no value)', value: null },
    ],
  },
} satisfies Meta<typeof UserDetailsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPhoto: Story = {
  args: { photoUrl: 'https://picsum.photos/id/64/192/192' },
};

export const FallbackName: Story = { args: { name: '' } };

export const NoDetails: Story = { args: { details: [] } };
