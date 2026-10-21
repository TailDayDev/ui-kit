import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { InputClearButton } from './InputClearButton';

const meta = {
  title: 'Components/InputClearButton',
  component: InputClearButton,
  args: { onClear: () => undefined, accessibilityLabel: 'Clear' },
} satisfies Meta<typeof InputClearButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Standalone control. Inside a field it is shown while focused with a value (see `Input`). */
export const Default: Story = {};
