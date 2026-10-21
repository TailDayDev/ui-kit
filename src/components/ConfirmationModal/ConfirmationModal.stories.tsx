import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { useTheme } from '../../theme';
import { Box, Text } from '../../primitives';
import { Button } from '../Button';
import { CustomModalProvider } from '../CustomModal';
import { ModalLayerRoot } from '../ModalLayer';
import { ConfirmationModal } from './ConfirmationModal';
import type { ConfirmationModalProps } from './ConfirmationModal.types';

/** Figma frame of the modal (iPhone Pro Max width). */
const FRAME = { width: 430, height: 760 };
/** App icon size (`DinamicImage size={100}`). */
const ICON_SIZE = 100;
const ACTION_DELAY_MS = 1200;

const Frame = ({ children }: { children: ReactNode }) => (
  <View style={FRAME}>
    <ModalLayerRoot>
      <CustomModalProvider closeAccessibilityLabel="Закрыть">
        {children}
      </CustomModalProvider>
    </ModalLayerRoot>
  </View>
);

/** Stand-in for the app `DinamicImage`. */
const IconStub = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        width: ICON_SIZE,
        height: ICON_SIZE,
        backgroundColor: theme.colors.bg.accentSoft,
      }}
    />
  );
};

const Opener = (props: ConfirmationModalProps) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Box padding={4}>
      <Button onPress={() => setIsVisible(true)} title="Открыть" />
      <ConfirmationModal
        {...props}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </Box>
  );
};

const meta = {
  title: 'Components/ConfirmationModal',
  component: ConfirmationModal,
  decorators: [
    Story => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
  args: {
    title: 'Удалить питомца?',
    description: 'Это действие нельзя отменить',
    confirmText: 'Удалить',
    closeText: 'Отмена',
    errorText: 'Произошла ошибка',
    onClose: () => {},
    onConfirm: () => {},
  },
} satisfies Meta<typeof ConfirmationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Title, description, red confirm + light cancel. */
export const Default: Story = {
  render: args => <Opener {...args} />,
};

/** With the app image above the title. */
export const WithIcon: Story = {
  render: args => <Opener {...args} icon={<IconStub />} />,
};

/** Extra content between the title and the description. */
export const WithChildren: Story = {
  render: args => (
    <Opener {...args}>
      <Text>Бронирование №1024</Text>
    </Opener>
  ),
};

/** Non-destructive confirm: the app passes its own `confirmStyles`. */
export const CustomConfirmStyle: Story = {
  render: args => (
    <Opener {...args} confirmText="Подтвердить" confirmStyles={{}} />
  ),
};

/** Confirm takes a while: spinner, the modal is locked. */
export const Loading: Story = {
  render: args => (
    <Opener
      {...args}
      onConfirm={() =>
        new Promise<void>(resolve => setTimeout(resolve, ACTION_DELAY_MS))
      }
    />
  ),
};

/** Confirm fails: the error text shows and the modal stays. */
export const ActionFailed: Story = {
  render: args => (
    <Opener {...args} onConfirm={() => Promise.reject(new Error('failed'))} />
  ),
};
