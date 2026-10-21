import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import {
  IconCalendarDays,
  IconCalendarX,
  IconClockEditOutline,
  IconUndo2,
} from '../../icons/figma';
import { Box } from '../../primitives';
import { Button } from '../Button';
import { CustomModalProvider } from '../CustomModal';
import { ModalLayerRoot } from '../ModalLayer';
import { TaskSheet } from './TaskSheet';
import type { TaskSheetProps, TaskSheetRowItem } from './TaskSheet.types';

/** Story frame: fits the 398pt canvas. */
const FRAME = { width: 398, height: 520 };
/** One frame per variant in the side-by-side story. */
const VARIANT_FRAME = { width: 398, height: 340 };

const noop = () => undefined;

const ROWS_1: TaskSheetRowItem[] = [
  { key: 'booking', label: 'Label', icon: IconCalendarDays, onPress: noop },
];
const ROWS_2: TaskSheetRowItem[] = [
  { key: 'uncomplete', label: 'Label', icon: IconUndo2, onPress: noop },
  { key: 'booking', label: 'Label', icon: IconCalendarDays, onPress: noop },
];
const ROWS_3: TaskSheetRowItem[] = [
  { key: 'noShow', label: 'Label', icon: IconCalendarX, onPress: noop },
  { key: 'time', label: 'Label', icon: IconClockEditOutline, onPress: noop },
  { key: 'booking', label: 'Label', icon: IconCalendarDays, onPress: noop },
];

const Frame = ({
  children,
  size = FRAME,
}: {
  children: ReactNode;
  size?: typeof FRAME;
}) => (
  <View style={size}>
    <ModalLayerRoot>
      <CustomModalProvider closeAccessibilityLabel="Закрыть">
        {children}
      </CustomModalProvider>
    </ModalLayerRoot>
  </View>
);

const Opener = (props: TaskSheetProps) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Box padding={4}>
      <Button onPress={() => setIsVisible(true)} title="Открыть" />
      <TaskSheet
        {...props}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </Box>
  );
};

const meta = {
  title: 'Components/TaskSheet',
  component: TaskSheet,
  args: {
    isVisible: true,
    rows: ROWS_1,
    closeAccessibilityLabel: 'Закрыть',
    onClose: noop,
  },
} satisfies Meta<typeof TaskSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TaskSheet` rows=1. */
export const Rows1: Story = {
  name: 'rows=1',
  args: { rows: ROWS_1 },
  render: args => (
    <Frame>
      <Opener {...args} />
    </Frame>
  ),
};

/** Figma `TaskSheet` rows=2. */
export const Rows2: Story = {
  name: 'rows=2',
  args: { rows: ROWS_2 },
  render: args => (
    <Frame>
      <Opener {...args} />
    </Frame>
  ),
};

/** Figma `TaskSheet` rows=3. */
export const Rows3: Story = {
  name: 'rows=3',
  args: { rows: ROWS_3 },
  render: args => (
    <Frame>
      <Opener {...args} />
    </Frame>
  ),
};

/** Manual task: actions plus the destructive "Удалить" block. */
export const WithDestructive: Story = {
  args: {
    rows: [
      ...ROWS_1,
      { key: 'delete', label: 'Удалить', onPress: noop, isDestructive: true },
    ],
  },
  render: args => (
    <Frame>
      <Opener {...args} />
    </Frame>
  ),
};

/** All Figma variants, each in its own modal layer. */
export const AllVariants: Story = {
  render: args => (
    <View>
      {[ROWS_1, ROWS_2, ROWS_3].map((rows, index) => (
        <Frame key={rows.length} size={VARIANT_FRAME}>
          <TaskSheet {...args} rows={rows} modalKey={`TaskSheet${index}`} />
        </Frame>
      ))}
    </View>
  ),
};
