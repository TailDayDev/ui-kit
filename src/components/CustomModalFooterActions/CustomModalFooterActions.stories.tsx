import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';

import { CustomModalFooterActions } from './CustomModalFooterActions';

const noop = () => undefined;
// Figma frame width of the footer (430 screen − 2 × 24 padding).
const CANVAS_WIDTH = 382;
const ALL_VARIANTS_GAP = 24;

const meta = {
  title: 'Components/CustomModalFooterActions',
  component: CustomModalFooterActions,
  args: {
    cancelLabel: 'Label',
    primaryLabel: 'Label',
    onCancel: noop,
    onPrimary: noop,
    isPrimaryDisabled: false,
    isPrimaryLoading: false,
    primaryStyle: 'default',
    direction: 'row',
  },
  decorators: [
    Story => (
      <View style={{ width: CANVAS_WIDTH }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CustomModalFooterActions>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `CustomModalFooterActions` direction=row. */
export const Row: Story = {};

/** Figma `CustomModalFooterActions` direction=column. */
export const Column: Story = { args: { direction: 'column' } };

export const PrimaryDisabled: Story = { args: { isPrimaryDisabled: true } };

export const PrimaryLoading: Story = { args: { isPrimaryLoading: true } };

export const Danger: Story = {
  args: { primaryStyle: 'danger', primaryLabel: 'Delete' },
};

export const AllVariants: Story = {
  render: args => (
    <View style={{ gap: ALL_VARIANTS_GAP }}>
      <CustomModalFooterActions {...args} direction="row" />
      <CustomModalFooterActions {...args} direction="column" />
    </View>
  ),
};
