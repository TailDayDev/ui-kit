import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { useTheme } from '../../theme';
import { Box } from '../../primitives';
import { Button } from '../Button';
import { CustomModalProvider } from '../CustomModal';
import { ModalLayerRoot } from '../ModalLayer';
import { FiltersSelectionModal } from './FiltersSelectionModal';
import type {
  FilterGroupView,
  FiltersSelectionModalProps,
  FiltersSelectionValue,
} from './FiltersSelectionModal.types';

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

const GROUPS: FilterGroupView[] = [
  {
    key: 'status',
    sectionTitle: 'Статус',
    options: [
      { id: 'current', title: 'Текущие', rightValue: 12 },
      { id: 'upcoming', title: 'Предстоящие', rightValue: 4 },
      {
        id: 'past',
        title: 'Прошедшие',
        rightLabel: 'за месяц',
        rightValue: 30,
      },
    ],
  },
  {
    key: 'petType',
    sectionTitle: 'Тип питомца',
    options: [
      { id: 'dog', title: 'Собаки', imageUrl: 'dog.png' },
      { id: 'cat', title: 'Кошки', imageUrl: 'cat.png' },
    ],
  },
  {
    key: 'rooms',
    sectionTitle: 'Комнаты',
    options: [],
    emptyMessage: 'Нет комнат',
  },
];

/** Stand-in for the app `DinamicImage`. */
const ImageStub = ({ size }: { size: number }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.bg.subtle,
      }}
    />
  );
};

const Opener = ({
  initialValue = {},
  ...props
}: Pick<
  FiltersSelectionModalProps,
  'title' | 'groups' | 'resetTitle' | 'applyTitle' | 'renderOptionImage'
> & { initialValue?: FiltersSelectionValue }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [value, setValue] = useState<FiltersSelectionValue>(initialValue);
  return (
    <Box padding={4}>
      <Button onPress={() => setIsVisible(true)} title="Открыть" />
      <FiltersSelectionModal
        {...props}
        visible={isVisible}
        value={value}
        onChange={setValue}
        onReset={() => setValue({})}
        onClose={() => setIsVisible(false)}
      />
    </Box>
  );
};

const meta = {
  title: 'Components/FiltersSelectionModal',
  component: FiltersSelectionModal,
  decorators: [
    Story => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
  args: {
    visible: true,
    title: 'Фильтры',
    groups: GROUPS,
    value: {},
    resetTitle: 'Сбросить',
    applyTitle: 'Применить',
    renderOptionImage: (_option, size) => <ImageStub size={size} />,
    onChange: () => {},
    onClose: () => {},
  },
} satisfies Meta<typeof FiltersSelectionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Nothing selected. Reset is the red `danger` button. */
export const Default: Story = {
  render: args => <Opener {...args} />,
};

/** Some options selected. */
export const Selected: Story = {
  render: args => (
    <Opener
      {...args}
      initialValue={{ status: ['current'], petType: ['cat'] }}
    />
  ),
};

/** Without `renderOptionImage`: text-only rows. */
export const WithoutImages: Story = {
  render: args => <Opener {...args} renderOptionImage={undefined} />,
};
