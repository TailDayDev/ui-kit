import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Textarea } from './Textarea';
import type { TextareaProps } from './Textarea.types';

/** Keeps the value in story state so typing works. */
const StatefulTextarea = (args: TextareaProps) => {
  const [value, setValue] = useState(args.value);
  return <Textarea {...args} value={value} setValue={setValue} />;
};

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  render: args => <StatefulTextarea {...args} />,
  args: {
    value: '',
    setValue: () => undefined,
    label: 'Staff notes',
    placeholder: 'Add care notes',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `Textarea` state=empty. */
export const Empty: Story = {};

/** Figma `Textarea` state=default. */
export const Filled: Story = {
  args: { value: 'Bella eats slowly and prefers a quiet corner during meals.' },
};

/** Focused on mount: accent border + shadow. */
export const Focused: Story = {
  args: { value: 'Bella eats slowly.', autoFocus: true },
};

export const WithCounter: Story = {
  args: {
    value: 'Bella eats slowly and prefers a quiet corner during meals.',
    maxLength: 160,
  },
};

export const Disabled: Story = {
  args: {
    value: 'Saved notes can be shown in disabled state.',
    label: 'Read only',
    disabled: true,
  },
};

export const WithoutLabel: Story = { args: { label: undefined } };
