import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { CheckIcon } from '../../icons/CheckIcon';
import { Icon } from '../../primitives';
import { Input } from './Input';
import type { InputProps, InputValidationRule } from './Input.types';

/** Keeps the value in story state so typing and clearing work. */
const StatefulInput = (args: InputProps) => {
  const [value, setValue] = useState(args.value);
  return <Input {...args} value={value} setValue={setValue} />;
};

const meta = {
  title: 'Components/Input',
  component: Input,
  render: args => <StatefulInput {...args} />,
  args: {
    value: '',
    setValue: () => undefined,
    label: 'Client name',
    placeholder: 'Enter full name',
    clearButtonLabel: 'Clear',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = { args: { value: 'Marta Green' } };

/** Focused on mount: accent border + shadow, clear control visible. */
export const Focused: Story = {
  args: { value: 'Marta Green', autoFocus: true },
};

export const WithError: Story = {
  args: {
    value: 'marta@',
    label: 'Email',
    hasError: true,
    errorText: 'Enter a valid email address',
  },
};

const PASSWORD_RULES: InputValidationRule[] = [
  { text: 'At least 8 characters', isCorrect: true },
  { text: 'One digit', isCorrect: false },
];

export const PasswordRules: Story = {
  args: {
    value: 'password',
    label: 'Password',
    secureTextEntry: true,
    showPasswordToggle: true,
    showPasswordLabel: 'Show password',
    hidePasswordLabel: 'Hide password',
    hasError: true,
    errorText: PASSWORD_RULES,
  },
};

export const Disabled: Story = {
  args: { value: 'Locked field', label: 'Disabled', disabled: true },
};

export const WithCounter: Story = {
  args: { value: 'Bella', maxLength: 40 },
};

export const WithLeftIcon: Story = {
  args: {
    value: 'Verified',
    icon: <Icon icon={CheckIcon} size={20} color="text.success" />,
  },
};

/** Clear control shown even while empty once focused. */
export const ClearWhenEmpty: Story = {
  args: { autoFocus: true, isClearButtonVisibleWhenEmpty: true },
};
