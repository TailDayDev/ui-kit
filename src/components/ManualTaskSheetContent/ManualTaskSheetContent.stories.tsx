import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { ManualTaskSheetContent } from './ManualTaskSheetContent';
import type { ManualTaskSheetContentProps } from './ManualTaskSheetContent.types';

const noop = () => undefined;

const meta = {
  title: 'Components/ManualTaskSheetContent',
  component: ManualTaskSheetContent,
  args: {
    title: '',
    onTitleChange: noop,
    titleMaxLength: 120,
    labels: {
      title: 'Новая задача',
      titlePlaceholder: 'Что бы вы хотели сделать?',
      due: 'Срок исполнения',
      pet: 'Питомец',
      staff: 'Сотрудник',
    },
    dueValue: 'Без времени',
    isDueEmpty: true,
    onDuePress: noop,
    petValue: 'Без питомца',
    isPetEmpty: true,
    onPetPress: noop,
    staffValue: 'Без сотрудника',
    isStaffEmpty: true,
    onStaffPress: noop,
  },
} satisfies Meta<typeof ManualTaskSheetContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `ManualTaskSheetContent` (empty draft). */
export const Default: Story = {};

/** Filled draft: values in accent. */
export const Filled: Story = {
  args: {
    title: 'Дать таблетку после обеда',
    dueValue: '08:00',
    isDueEmpty: false,
    petValue: 'Rocky',
    isPetEmpty: false,
    staffValue: 'Jane Cooper',
    isStaffEmpty: false,
  },
};

const InteractiveContent = (args: ManualTaskSheetContentProps) => {
  const [title, setTitle] = useState(args.title);
  return (
    <ManualTaskSheetContent {...args} title={title} onTitleChange={setTitle} />
  );
};

/** Type a title to see the counter. */
export const Interactive: Story = {
  render: args => <InteractiveContent {...args} />,
};
