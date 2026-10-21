import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { PlusIcon } from '../../icons/PlusIcon';
import { Icon } from '../../primitives/Icon';
import { FieldRow } from './FieldRow';

const noop = () => undefined;

const meta = {
  title: 'Components/FieldRow',
  component: FieldRow,
  args: {
    icon: <Icon icon={PlusIcon} />,
    label: 'Check-in',
    value: '12 May, 10:00',
    isEmpty: false,
    isError: false,
    showAction: true,
    onPress: noop,
  },
} satisfies Meta<typeof FieldRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `FieldRow` isEmpty=false. */
export const Filled: Story = {};

/** Figma `FieldRow` isEmpty=true. */
export const Empty: Story = { args: { value: 'Select', isEmpty: true } };

export const WithError: Story = {
  args: { value: 'Select', isEmpty: true, isError: true },
};

export const Clearable: Story = { args: { onClear: noop } };

export const WithoutAction: Story = { args: { showAction: false } };

export const Static: Story = { args: { onPress: undefined } };

export const WithoutIcon: Story = { args: { icon: undefined } };

export const LongValue: Story = {
  args: {
    value: 'A very long selected value that wraps inside the right column',
  },
};
