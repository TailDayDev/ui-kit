import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { OTPInput } from './OTPInput';

const meta = {
  title: 'Components/OTPInput',
  component: OTPInput,
  args: {
    onCodeFilled: () => undefined,
    autoFocus: false,
    readClipboard: false,
    accessibilityLabel: 'Verification code',
  },
  decorators: [
    Story => (
      <View style={{ width: 360 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Focused: Story = { args: { autoFocus: true } };

export const WithPlaceholder: Story = { args: { emptyPlaceholder: '•' } };

export const FourFixedCells: Story = {
  args: { length: 4, cellWidth: 56, cellGap: 12 },
};

export const WithError: Story = { args: { errorText: 'Wrong code' } };

export const ClipboardPrefill: Story = {
  args: {
    readClipboard: true,
    onRequestClipboardText: () => Promise.resolve('123456'),
  },
};
