import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { InputMaxHeight } from './InputMaxHeight';
import type { InputMaxHeightProps } from './InputMaxHeight.types';

/** Story canvas height: the field fills its parent, so give it a fixed one. */
const CANVAS_HEIGHT = 240;

/** Keeps the value in story state so typing works; gives the field a parent with height. */
const StatefulInputMaxHeight = (args: InputMaxHeightProps) => {
  const [value, setValue] = useState(args.value);
  return (
    <Box background="screen" style={{ height: CANVAS_HEIGHT }}>
      <InputMaxHeight {...args} value={value} setValue={setValue} />
    </Box>
  );
};

const meta = {
  title: 'Components/InputMaxHeight',
  component: InputMaxHeight,
  render: args => <StatefulInputMaxHeight {...args} />,
  args: {
    value: '',
    setValue: () => undefined,
    placeholder: 'Pet name',
    maxLength: 50,
  },
} satisfies Meta<typeof InputMaxHeight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = { args: { value: 'Bella' } };

/** Focused after the 300 ms auto-focus delay. The field has no focus border (same as the app). */
export const Focused: Story = { args: { value: 'Bella', autoFocus: true } };

/** `hasError` is announced to screen readers only; nothing is drawn (same as the app). */
export const WithError: Story = {
  args: { value: '', hasError: true, errorText: 'Name is required' },
};

export const Disabled: Story = { args: { value: 'Bella', disabled: true } };

export const AmountWithUnit: Story = {
  args: {
    value: '45',
    keyboardType: 'numeric',
    inputSize: 'medium',
    unitText: '$',
    fullWidth: true,
    maxLength: undefined,
  },
};

export const LongDescription: Story = {
  args: {
    value:
      'Bella eats slowly and prefers a quiet corner during meals. Give her the blue bowl.',
    placeholder: 'Description',
    maxLength: 500,
    fullWidth: true,
  },
};
