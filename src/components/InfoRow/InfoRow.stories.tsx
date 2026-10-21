import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Switch } from 'react-native';

import { InfoRow } from './InfoRow';

const meta = {
  title: 'Components/InfoRow',
  component: InfoRow,
  args: {
    title: 'Online booking',
    description: 'Clients can book this service from the app',
    children: <Switch value accessibilityLabel="Online booking" />,
  },
} satisfies Meta<typeof InfoRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Off: Story = {
  args: {
    children: <Switch value={false} accessibilityLabel="Online booking" />,
  },
};

export const WithoutDescription: Story = { args: { description: '' } };

export const LongText: Story = {
  args: {
    title: 'A long setting title that wraps before reaching the control',
    description:
      'A long description that wraps as well; the control on the right keeps its size.',
  },
};
