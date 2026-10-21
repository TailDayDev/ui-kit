import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { Button } from '../Button';
import { CustomModalProvider } from '../CustomModal';
import { ModalLayerRoot } from '../ModalLayer';
import { EditPriceModal } from './EditPriceModal';
import type { EditPriceModalProps } from './EditPriceModal.types';

/** Figma frame of the modal (iPhone Pro Max width). */
const FRAME = { width: 430, height: 760 };
const STORY_MAX = 1000;

const Frame = ({ children }: { children: ReactNode }) => (
  <View style={FRAME}>
    <ModalLayerRoot>
      <CustomModalProvider closeAccessibilityLabel="Закрыть">
        {children}
      </CustomModalProvider>
    </ModalLayerRoot>
  </View>
);

const Opener = (props: EditPriceModalProps) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Box padding={4}>
      <Button onPress={() => setIsVisible(true)} title="Открыть" />
      <EditPriceModal
        {...props}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </Box>
  );
};

const meta = {
  title: 'Components/EditPriceModal',
  component: EditPriceModal,
  decorators: [
    Story => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
  args: {
    title: 'Цена',
    defaultValue: '15,00',
    placeholder: '0,00',
    saveTitle: 'Сохранить',
    // The app builds this with translate + formatEntityPrice.
    formatMaxError: max => `Максимальное значение: ${max},00 MDL`,
    isVisible: true,
    onClose: () => {},
    onConfirm: () => {},
  },
} satisfies Meta<typeof EditPriceModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Amount from the owner, Save enabled. */
export const Default: Story = {
  render: args => <Opener {...args} />,
};

/** Zero default opens empty with the placeholder; Save disabled. */
export const Empty: Story = {
  render: args => <Opener {...args} defaultValue="0" />,
};

/** Description under the amount. */
export const WithDescription: Story = {
  render: args => <Opener {...args} description="Цена за ночь" />,
};

/** Owner error and the max error (amount above `max`). */
export const Error: Story = {
  render: args => (
    <Opener
      {...args}
      defaultValue="1500"
      max={STORY_MAX}
      error="Цена не сохранена"
    />
  ),
};

/** Save in flight: spinner, the modal is locked. */
export const Saving: Story = {
  render: args => <Opener {...args} isSaving />,
};
