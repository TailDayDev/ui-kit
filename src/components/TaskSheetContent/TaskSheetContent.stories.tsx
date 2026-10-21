import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import {
  IconCalendarDays,
  IconCalendarX,
  IconClockEditOutline,
  IconUndo2,
} from '../../icons/figma';
import { Box } from '../../primitives/Box';
import { TaskSheetContent } from './TaskSheetContent';
import type { TaskSheetContentRow } from './TaskSheetContent.types';

const noop = () => undefined;

const ROWS_1: TaskSheetContentRow[] = [
  { key: 'booking', label: 'Label', icon: IconCalendarDays, onPress: noop },
];
const ROWS_2: TaskSheetContentRow[] = [
  { key: 'uncomplete', label: 'Label', icon: IconUndo2, onPress: noop },
  { key: 'booking', label: 'Label', icon: IconCalendarDays, onPress: noop },
];
const ROWS_3: TaskSheetContentRow[] = [
  { key: 'noShow', label: 'Label', icon: IconCalendarX, onPress: noop },
  { key: 'time', label: 'Label', icon: IconClockEditOutline, onPress: noop },
  { key: 'booking', label: 'Label', icon: IconCalendarDays, onPress: noop },
];
const DELETE_ROW: TaskSheetContentRow = {
  key: 'delete',
  label: 'Удалить',
  onPress: noop,
  isDestructive: true,
};

const meta = {
  title: 'Components/TaskSheetContent',
  component: TaskSheetContent,
  args: { rows: ROWS_1 },
} satisfies Meta<typeof TaskSheetContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TaskSheetContent` rows=1, hasDestructive=false. */
export const Rows1: Story = { name: 'rows=1', args: { rows: ROWS_1 } };

/** Figma `TaskSheetContent` rows=2, hasDestructive=false. */
export const Rows2: Story = { name: 'rows=2', args: { rows: ROWS_2 } };

/** Figma `TaskSheetContent` rows=3, hasDestructive=false. */
export const Rows3: Story = { name: 'rows=3', args: { rows: ROWS_3 } };

/** Figma `TaskSheetContent` hasDestructive=true (rows=1). */
export const Rows1HasDestructive: Story = {
  name: 'rows=1, hasDestructive=true',
  args: { rows: [...ROWS_1, DELETE_ROW] },
};

/** Figma `TaskSheetContent` hasDestructive=true (rows=2). */
export const Rows2HasDestructive: Story = {
  name: 'rows=2, hasDestructive=true',
  args: { rows: [...ROWS_2, DELETE_ROW] },
};

/** Figma `TaskSheetContent` hasDestructive=true (rows=3). */
export const Rows3HasDestructive: Story = {
  name: 'rows=3, hasDestructive=true',
  args: { rows: [...ROWS_3, DELETE_ROW] },
};

export const AllVariants: Story = {
  render: () => (
    <Box gap={6}>
      <TaskSheetContent rows={ROWS_1} />
      <TaskSheetContent rows={ROWS_2} />
      <TaskSheetContent rows={[...ROWS_3, DELETE_ROW]} />
    </Box>
  ),
};
