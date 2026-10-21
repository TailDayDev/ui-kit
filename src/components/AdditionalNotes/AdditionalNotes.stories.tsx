import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { CustomModalProvider } from '../CustomModal';
import { ModalLayerRoot } from '../ModalLayer';
import { AdditionalNotes } from './AdditionalNotes';
import type { AdditionalNotesProps } from './AdditionalNotes.types';

/** iPhone Pro Max frame, as in the CustomModal stories. */
const FRAME = { width: 430, height: 760 };
const SAVE_DELAY_MS = 800;

const Frame = ({ children }: { children: ReactNode }) => (
  <View style={FRAME}>
    <ModalLayerRoot>
      <CustomModalProvider closeAccessibilityLabel="Close">
        <Box padding={6}>{children}</Box>
      </CustomModalProvider>
    </ModalLayerRoot>
  </View>
);

const Demo = (props: AdditionalNotesProps) => {
  const [value, setValue] = useState(props.value);
  return (
    <Frame>
      <AdditionalNotes {...props} value={value} setValue={setValue} />
    </Frame>
  );
};

const meta: Meta<typeof Demo> = {
  title: 'Components/AdditionalNotes',
  component: Demo,
  args: {
    value: '',
    setValue: () => {},
    title: 'Additional instructions',
    placeholder: 'E.g. feed twice a day, allergic to chicken',
    maxLength: 130,
  },
};

export default meta;

type Story = StoryObj<typeof Demo>;

/** Inline field, empty. */
export const Inline: Story = {};

/** Inline field with text and a footer caption. */
export const InlineFilled: Story = {
  args: {
    value: 'Walk twice a day, no treats after 6 pm.',
    footerText: 'Visible to all staff.',
  },
};

/** Inline field that cannot be edited. */
export const Disabled: Story = {
  args: { value: 'Walk twice a day.', disabled: true },
};

/** Text instead of a field. */
export const ReadOnly: Story = {
  args: { value: 'Walk twice a day.', readOnly: true },
};

/** Read-only and empty: the placeholder in secondary text. */
export const ReadOnlyEmpty: Story = {
  args: { readOnly: true },
};

/** Preview card; tap opens the edit sheet. Save resolves after a delay. */
export const Modal: Story = {
  args: {
    editMode: 'modal',
    cancelLabel: 'Cancel',
    saveLabel: 'Save',
    previewPlaceholder: 'Tap to add instructions',
    onSave: () =>
      new Promise<void>(resolve => {
        setTimeout(resolve, SAVE_DELAY_MS);
      }),
  },
};

/** Preview card with text. */
export const ModalFilled: Story = {
  args: {
    editMode: 'modal',
    cancelLabel: 'Cancel',
    saveLabel: 'Save',
    value:
      'Walk twice a day, no treats after 6 pm. Give the pill with dinner. Brush on Sundays. Call the owner if he refuses food.',
  },
};

/** Preview card that cannot be opened. */
export const ModalDisabled: Story = {
  args: {
    editMode: 'modal',
    cancelLabel: 'Cancel',
    saveLabel: 'Save',
    value: 'Walk twice a day.',
    disabled: true,
  },
};
