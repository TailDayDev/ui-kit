import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { PickerNoneRow } from './PickerNoneRow';

const meta = {
  title: 'Components/PickerNoneRow',
  component: PickerNoneRow,
  args: { label: 'Без питомца', isSelected: false, onPress: () => {} },
} satisfies Meta<typeof PickerNoneRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = { args: { isSelected: true } };

export const NoStaff: Story = { args: { label: 'Без сотрудника' } };
