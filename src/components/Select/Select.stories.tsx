import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { CustomModalProvider } from '../CustomModal';
import { ModalLayerRoot } from '../ModalLayer';
import { Select } from './Select';
import type { SelectOption } from './Select.types';

/** iPhone Pro Max frame, so the picker sheet has room to open. */
const FRAME = { width: 430, height: 760 };

const Frame = ({ children }: { children: ReactNode }) => (
  <View style={FRAME}>
    <ModalLayerRoot>
      <CustomModalProvider closeAccessibilityLabel="Close">
        <View style={{ padding: 24 }}>{children}</View>
      </CustomModalProvider>
    </ModalLayerRoot>
  </View>
);

const OPTIONS: SelectOption[] = [
  { label: 'Dog', value: 'dog' },
  { label: 'Cat', value: 'cat' },
  { label: 'Rabbit', value: 'rabbit' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  decorators: [
    Story => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
  args: {
    label: 'Pet type',
    placeholder: 'Select an option',
    options: OPTIONS,
    cancelLabel: 'Cancel',
    saveLabel: 'Save',
    setValue: () => undefined,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};

export const Selected: Story = { args: { value: OPTIONS[1] } };

export const WithoutLabel: Story = { args: { label: undefined } };

export const Disabled: Story = {
  args: { value: OPTIONS[0], disabled: true },
};

export const WithError: Story = {
  args: { hasError: true, errorText: 'Choose a pet type' },
};

const InteractiveSelect = () => {
  const [value, setValue] = useState<SelectOption | undefined>();
  return (
    <Select
      label="Pet type"
      placeholder="Select an option"
      options={OPTIONS}
      value={value}
      setValue={setValue}
      cancelLabel="Cancel"
      saveLabel="Save"
    />
  );
};

export const Interactive: Story = { render: () => <InteractiveSelect /> };
