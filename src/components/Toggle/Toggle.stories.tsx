import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  args: {
    isActive: true,
    disabled: false,
    accessibilityLabel: 'Notifications',
    handlePress: () => undefined,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {};

export const Off: Story = { args: { isActive: false } };

export const DisabledOn: Story = { args: { disabled: true } };

export const DisabledOff: Story = { args: { disabled: true, isActive: false } };

const InteractiveToggle = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Toggle
      isActive={isActive}
      handlePress={() => setIsActive(current => !current)}
      accessibilityLabel="Notifications"
    />
  );
};

export const Interactive: Story = { render: () => <InteractiveToggle /> };
