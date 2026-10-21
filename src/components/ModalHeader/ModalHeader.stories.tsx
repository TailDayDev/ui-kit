import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { ModalHeader } from './ModalHeader';

const noop = () => undefined;

const meta = {
  title: 'Components/ModalHeader',
  component: ModalHeader,
  args: {
    title: 'Title',
    hasTitle: true,
    onClose: noop,
    closeAccessibilityLabel: 'Close',
    isDisabled: false,
  },
} satisfies Meta<typeof ModalHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `ModalHeader` hasTitle=true. */
export const Default: Story = {};

/** Figma `ModalHeader` hasTitle=false. */
export const WithoutTitle: Story = { args: { hasTitle: false } };

export const LongTitle: Story = {
  args: { title: 'A very long sheet title that is truncated on one line' },
};

export const Disabled: Story = { args: { isDisabled: true } };
