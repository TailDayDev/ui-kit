import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Icon } from '../../primitives/Icon';
import { CloseIcon } from '../../icons/CloseIcon';
import { PlusIcon } from '../../icons/PlusIcon';
import { ActionListRow } from './ActionListRow';

const meta = {
  title: 'Components/ActionListRow',
  component: ActionListRow,
  args: {
    title: 'Take a photo',
    description: 'Use the camera',
    variant: 'flat',
    isDanger: false,
    isDisabled: false,
    leading: <Icon icon={PlusIcon} />,
    onPress: () => undefined,
    accessibilityLabel: 'Take a photo',
  },
} satisfies Meta<typeof ActionListRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Flat: Story = {};

export const WithRightText: Story = { args: { rightText: '3 files' } };

export const Static: Story = { args: { onPress: undefined } };

export const Disabled: Story = { args: { isDisabled: true } };

/** Figma `TaskSheetRow`: label left, icon right. */
export const TrailingIcon: Story = {
  args: { variant: 'trailing-icon', description: undefined },
};

/** Figma `TaskSheetRow` destructive. */
export const TrailingIconDanger: Story = {
  args: {
    variant: 'trailing-icon',
    title: 'Delete booking',
    description: undefined,
    isDanger: true,
    leading: <Icon icon={CloseIcon} color="text.error" />,
  },
};

export const CardSource: Story = { args: { variant: 'card-source' } };

export const CardSourceTrailing: Story = {
  args: { variant: 'card-source-trailing' },
};

export const CardSettings: Story = {
  args: {
    variant: 'card-settings',
    title: 'Reminder',
    description: undefined,
    rightText: 'Edit',
    leading: undefined,
  },
};

export const CardAttachment: Story = {
  args: {
    variant: 'card-attachment',
    title: 'vaccination-certificate.pdf',
    description: '1.2 MB',
  },
};

export const LongTitle: Story = {
  args: {
    title:
      'A very long action title that wraps onto a second line and is then truncated',
    description:
      'And a description that is long enough to wrap and be truncated as well',
  },
};
