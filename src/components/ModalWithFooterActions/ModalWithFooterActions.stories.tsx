import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Text } from '../../primitives';
import { Button } from '../Button';
import { CustomModalProvider } from '../CustomModal';
import { ModalLayerRoot } from '../ModalLayer';
import { ModalWithFooterActions } from './ModalWithFooterActions';
import type { ModalWithFooterActionsProps } from './ModalWithFooterActions.types';

/** Figma frame of the modal (iPhone Pro Max width). */
const FRAME = { width: 430, height: 760 };

const Frame = ({ children }: { children: ReactNode }) => (
  <View style={FRAME}>
    <ModalLayerRoot>
      <CustomModalProvider closeAccessibilityLabel="Закрыть">
        {children}
      </CustomModalProvider>
    </ModalLayerRoot>
  </View>
);

type OpenerProps = Omit<
  ModalWithFooterActionsProps,
  'visible' | 'onClose' | 'onPressPrimary' | 'onPressSecondary' | 'children'
>;

const Opener = (props: OpenerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const close = () => setIsVisible(false);
  return (
    <Box padding={4}>
      <Button onPress={() => setIsVisible(true)} title="Открыть" />
      <ModalWithFooterActions
        {...props}
        visible={isVisible}
        onClose={close}
        onPressPrimary={close}
        onPressSecondary={close}
      >
        <Box gap={2} padding={6}>
          {Array.from({ length: 4 }, (_, index) => (
            <Text key={index}>Строка содержимого {index + 1}</Text>
          ))}
        </Box>
      </ModalWithFooterActions>
    </Box>
  );
};

const meta = {
  title: 'Components/ModalWithFooterActions',
  component: ModalWithFooterActions,
  decorators: [
    Story => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
  args: {
    modalKey: 'story',
    title: 'Заголовок',
    primaryTitle: 'Сохранить',
    secondaryTitle: 'Отмена',
    visible: true,
    children: null,
    onClose: () => {},
    onPressPrimary: () => {},
    onPressSecondary: () => {},
  },
} satisfies Meta<typeof ModalWithFooterActions>;

export default meta;
type Story = StoryObj<typeof meta>;

const pick = ({
  modalKey,
  title,
  primaryTitle,
  secondaryTitle,
}: ModalWithFooterActionsProps): OpenerProps => ({
  modalKey,
  title,
  primaryTitle,
  secondaryTitle,
});

/** Full height, Cancel (light) + Save. Figma `CustomModalFooterActions` row. */
export const Default: Story = {
  render: args => <Opener {...pick(args)} />,
};

/** Grows with its content. */
export const AutoHeight: Story = {
  render: args => <Opener {...pick(args)} autoHeight />,
};

/** Destructive main action. */
export const DangerPrimary: Story = {
  render: args => (
    <Opener
      {...pick(args)}
      primaryTitle="Удалить"
      primaryButtonStyle="danger"
    />
  ),
};

/** Main action disabled. */
export const PrimaryDisabled: Story = {
  render: args => <Opener {...pick(args)} isPrimaryDisabled />,
};

/** Main action saving; the modal is locked. */
export const PrimaryLoading: Story = {
  render: args => <Opener {...pick(args)} isPrimaryLoading isLocked />,
};

/** Back button in the header. */
export const WithBackButton: Story = {
  render: args => <Opener {...pick(args)} handleBackBtn={() => {}} />,
};
