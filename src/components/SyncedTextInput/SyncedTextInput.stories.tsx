import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';

import { Box, Text } from '../../primitives';
import { SyncedTextInput } from './SyncedTextInput';

const meta = {
  title: 'Components/SyncedTextInput',
  component: SyncedTextInput,
} satisfies Meta<typeof SyncedTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const Controlled = () => {
  const [value, setValue] = useState('Барон');
  return (
    <Box gap={2}>
      <SyncedTextInput
        value={value}
        onChangeText={setValue}
        accessibilityLabel="Кличка"
      />
      <Text variant="caption/regular" color="secondary">
        {`value: ${value}`}
      </Text>
    </Box>
  );
};

/** Unstyled base text input used by every kit text field. */
export const Default: Story = { render: () => <Controlled /> };
