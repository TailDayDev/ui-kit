import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Button } from '../Button';
import { CustomModalProvider } from '../CustomModal';
import { ModalLayerRoot } from '../ModalLayer';
import { SelectTimeModal } from './SelectTimeModal';
import type { SelectTimeModalProps } from './SelectTimeModal.types';

/** iPhone Pro Max frame, so the sheet has room to open. */
const FRAME = { width: 430, height: 760 };

const Frame = ({ children }: { children: ReactNode }) => (
  <View style={FRAME}>
    <ModalLayerRoot>
      <CustomModalProvider closeAccessibilityLabel="Close">
        {children}
      </CustomModalProvider>
    </ModalLayerRoot>
  </View>
);

type OpenerProps = Omit<SelectTimeModalProps, 'isVisible' | 'onClose'>;

/** Opens the sheet on mount; the button opens it again after closing. */
const Opener = (props: OpenerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <View style={{ padding: 24 }}>
      <Button title="Open" onPress={() => setIsVisible(true)} />
      <SelectTimeModal
        {...props}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </View>
  );
};

const meta = {
  title: 'Components/SelectTimeModal',
  component: Opener,
  decorators: [
    Story => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
  args: {
    title: 'Check-in time',
    defaultTime: '14:00',
    defaultFormat: null,
    resetLabel: 'Reset',
    saveLabel: 'Save',
    onSave: () => undefined,
  },
} satisfies Meta<typeof Opener>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwelveHour: Story = {
  args: { hourFormat: '12h', defaultTime: '02:30', defaultFormat: 'pm' },
};

export const FallbackTime: Story = {
  args: { defaultTime: undefined, fallbackTime: '19:00' },
};

export const Saving: Story = { args: { isSaving: true } };
