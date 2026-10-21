import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { LabeledDetailRow } from './LabeledDetailRow';

const meta = {
  title: 'Components/LabeledDetailRow',
  component: LabeledDetailRow,
  args: {
    label: 'Phone',
    value: '+373 60 112 233',
    isLast: true,
    isValueNarrow: false,
  },
} satisfies Meta<typeof LabeledDetailRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'Preferred contact, call after 10:00' },
};

export const WithDivider: Story = { args: { isLast: false } };

export const TappableValue: Story = {
  args: { onValuePress: () => undefined },
};

export const TappableRow: Story = { args: { onPress: () => undefined } };

export const NarrowLongValue: Story = {
  args: {
    label: 'Address',
    value: 'Strada Ștefan cel Mare 123, apartment 45, Chișinău, Moldova',
    isValueNarrow: true,
  },
};
