import { useRef, useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box, Text } from '../../primitives';
import { Button } from '../Button';
import { ModalLayerRoot } from '../ModalLayer';
import { CustomModal } from './CustomModal';
import type { CustomModalHandle, CustomModalProps } from './CustomModal.types';
import { CustomModalProvider } from './CustomModalProvider';
import { useDeclarativeAlert } from './DeclarativeAlertContext';
import { DeclarativeAlertProvider } from './DeclarativeAlertProvider';
import { FullScreenModal } from './FullScreenModal';

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

const Lines = ({ count }: { count: number }) => (
  <Box gap={2} padding={6}>
    {Array.from({ length: count }, (_, index) => (
      <Text key={index}>Строка содержимого {index + 1}</Text>
    ))}
  </Box>
);

/** Figma `CustomModalFooterActions` row: Cancel (light) + main action. */
const FooterActions = ({
  onCancel,
  onSave,
  isColumn = false,
}: {
  onCancel: () => void;
  onSave: () => void;
  isColumn?: boolean;
}) => (
  <Box gap={isColumn ? 4 : 3} row={!isColumn}>
    <Box flex={!isColumn}>
      <Button onPress={onCancel} style="light" title="Отмена" />
    </Box>
    <Box flex={!isColumn}>
      <Button onPress={onSave} title="Сохранить" />
    </Box>
  </Box>
);

interface IOpenerProps extends Omit<
  CustomModalProps,
  'visible' | 'onClose' | 'children' | 'footer'
> {
  /** Adds the Cancel / Save footer actions. */
  hasFooter?: boolean;
  children?: ReactNode;
}

const Opener = ({ hasFooter = false, children, ...props }: IOpenerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const close = () => setIsVisible(false);

  return (
    <Box padding={4}>
      <Button onPress={() => setIsVisible(true)} title="Открыть" />
      <CustomModal
        {...props}
        footer={
          hasFooter ? (
            <FooterActions onCancel={close} onSave={close} />
          ) : undefined
        }
        onClose={close}
        visible={isVisible}
      >
        {children ?? <Lines count={6} />}
      </CustomModal>
    </Box>
  );
};

const FooterColumnDemo = ({ title }: { title: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const close = () => setIsVisible(false);
  return (
    <Box padding={4}>
      <Button onPress={() => setIsVisible(true)} title="Открыть" />
      <CustomModal
        autoHeight
        footer={<FooterActions isColumn onCancel={close} onSave={close} />}
        onClose={close}
        title={title}
        visible={isVisible}
      >
        <Lines count={3} />
      </CustomModal>
    </Box>
  );
};

const MultiPageDemo = () => {
  const ref = useRef<CustomModalHandle>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [page, setPage] = useState(0);
  const goTo = (index: number) => {
    setPage(index);
    ref.current?.slideTo(index);
  };

  return (
    <Box padding={4}>
      <Button onPress={() => setIsVisible(true)} title="Открыть" />
      <CustomModal
        ref={ref}
        handleBackBtn={page > 0 ? () => goTo(page - 1) : undefined}
        onClose={() => setIsVisible(false)}
        title={page === 0 ? 'Шаг 1' : 'Шаг 2'}
        visible={isVisible}
      >
        <Box gap={4} padding={6}>
          <Text>Первая страница</Text>
          <Button onPress={() => goTo(1)} title="Далее" />
        </Box>
        <Box padding={6}>
          <Text>Вторая страница</Text>
        </Box>
      </CustomModal>
    </Box>
  );
};

const NestedDemo = () => {
  const [isParentVisible, setIsParentVisible] = useState(true);
  const [isChildVisible, setIsChildVisible] = useState(false);

  return (
    <Box padding={4}>
      <Button onPress={() => setIsParentVisible(true)} title="Открыть" />
      <CustomModal
        nestedOverlays={
          <CustomModal
            autoHeight
            onClose={() => setIsChildVisible(false)}
            title="Вложенная"
            visible={isChildVisible}
          >
            <Lines count={2} />
          </CustomModal>
        }
        onClose={() => {
          setIsChildVisible(false);
          setIsParentVisible(false);
        }}
        title="Родитель"
        visible={isParentVisible}
      >
        <Box padding={6}>
          <Button
            onPress={() => setIsChildVisible(true)}
            title="Открыть вложенную"
          />
        </Box>
      </CustomModal>
    </Box>
  );
};

const FullScreenDemo = ({ title }: { title: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const close = () => setIsVisible(false);
  return (
    <Box padding={4}>
      <Button onPress={() => setIsVisible(true)} title="Открыть" />
      <FullScreenModal
        footer={
          <Box paddingX={6}>
            <FooterActions onCancel={close} onSave={close} />
          </Box>
        }
        onClose={close}
        title={title}
        visible={isVisible}
      >
        <Lines count={4} />
      </FullScreenModal>
    </Box>
  );
};

const meta = {
  title: 'Components/CustomModal',
  component: CustomModal,
  decorators: [
    Story => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
  args: {
    visible: true,
    onClose: () => {},
    children: null,
    title: 'Заголовок',
  },
} satisfies Meta<typeof CustomModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full height, header with title and close, footer with Cancel / Save. */
export const Default: Story = {
  render: args => <Opener title={args.title} hasFooter />,
};

/** Grows with its content; a backdrop tap closes it. */
export const AutoHeight: Story = {
  render: args => <Opener autoHeight title={args.title} hasFooter />,
};

/** Footer without the top divider. */
export const WithoutDivider: Story = {
  render: args => <Opener divider={false} title={args.title} hasFooter />,
};

/** Footer actions stacked (Figma column variant, gap 16). */
export const FooterColumn: Story = {
  render: args => <FooterColumnDemo title={args.title} />,
};

/** Busy: content and close controls are disabled. */
export const Locked: Story = {
  render: args => <Opener isLocked title={args.title} hasFooter />,
};

/** No dimming; the screen below is still blocked. */
export const WithoutBackdrop: Story = {
  render: args => <Opener autoHeight title={args.title} withBackdrop={false} />,
};

/** Pages slide horizontally; the back button appears with `handleBackBtn`. */
export const MultiPage: Story = {
  render: () => <MultiPageDemo />,
};

/** A modal opened from inside an open modal is declared inside it. */
export const Nested: Story = {
  render: () => <NestedDemo />,
};

/** FullScreenModal: no divider, the page does not scroll. */
export const FullScreen: Story = {
  render: args => <FullScreenDemo title={args.title} />,
};

const AlertTrigger = () => {
  const { showAlert } = useDeclarativeAlert();
  return (
    <Box gap={3} padding={4}>
      <Button
        onPress={() =>
          showAlert({ title: 'Сохранено', message: 'Изменения применены.' })
        }
        title="Простое уведомление"
      />
      <Button
        onPress={() =>
          showAlert({
            title: 'Удалить питомца?',
            message: 'Это действие нельзя отменить.',
            actions: [
              { title: 'Удалить', style: 'destructive' },
              { title: 'Отмена', style: 'cancel' },
            ],
          })
        }
        style="danger"
        title="С действиями"
      />
    </Box>
  );
};

/** DeclarativeAlertProvider: alerts one at a time, above any open modal. */
export const DeclarativeAlert: Story = {
  render: () => (
    <DeclarativeAlertProvider
      closeAccessibilityLabel="Закрыть"
      defaultErrorTitle="Ошибка"
    >
      <AlertTrigger />
    </DeclarativeAlertProvider>
  ),
};
