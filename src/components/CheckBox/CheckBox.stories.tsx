import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { CheckBox } from './CheckBox';

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
  args: {
    isActive: true,
    disabled: false,
    accessibilityLabel: 'Accept terms',
    handlePress: () => undefined,
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {};

export const Unchecked: Story = { args: { isActive: false } };

export const DisabledChecked: Story = { args: { disabled: true } };

export const DisabledUnchecked: Story = {
  args: { disabled: true, isActive: false },
};

const InteractiveCheckBox = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <CheckBox
      isActive={isActive}
      handlePress={() => setIsActive(current => !current)}
      accessibilityLabel="Accept terms"
    />
  );
};

export const Interactive: Story = { render: () => <InteractiveCheckBox /> };
