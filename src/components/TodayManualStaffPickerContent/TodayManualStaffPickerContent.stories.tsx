import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { TodayManualStaffPickerContent } from './TodayManualStaffPickerContent';
import type {
  TodayManualStaffPickerContentProps,
  TodayManualStaffPickerMember,
} from './TodayManualStaffPickerContent.types';

const noop = () => undefined;

const STAFF: TodayManualStaffPickerMember[] = [
  { id: 'marvin', name: 'Marvin McKinney', position: 'Владелец' },
  { id: 'jane', name: 'Jane Cooper', position: 'Управляющий' },
  { id: 'robert', name: 'Robert Fox', position: 'Грумер' },
  { id: 'esther', name: 'Esther Howard', position: 'Сотрудник' },
];

const meta = {
  title: 'Components/TodayManualStaffPickerContent',
  component: TodayManualStaffPickerContent,
  args: {
    staff: STAFF,
    selectedId: null,
    onSelect: noop,
    noneLabel: 'Без сотрудника',
    accessibilityLabel: 'Выберите сотрудника',
  },
} satisfies Meta<typeof TodayManualStaffPickerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `TodayManualStaffPickerContent` ("no staff" selected). */
export const Default: Story = {};

/** A staff member selected. */
export const StaffSelected: Story = { args: { selectedId: 'jane' } };

const InteractiveContent = (args: TodayManualStaffPickerContentProps) => {
  const [selectedId, setSelectedId] = useState(args.selectedId);
  return (
    <TodayManualStaffPickerContent
      {...args}
      selectedId={selectedId}
      onSelect={setSelectedId}
    />
  );
};

/** Tap a row to move the selection. */
export const Interactive: Story = {
  render: args => <InteractiveContent {...args} />,
};
