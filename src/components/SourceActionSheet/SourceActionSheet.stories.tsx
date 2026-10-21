import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { CloseIcon } from '../../icons/CloseIcon';
import { PlusIcon } from '../../icons/PlusIcon';
import { Icon } from '../../primitives/Icon';
import { SourceActionSheet } from './SourceActionSheet';

const noop = () => undefined;

const meta = {
  title: 'Components/SourceActionSheet',
  component: SourceActionSheet,
  args: {
    onClose: noop,
    closeOnAction: true,
    variant: 'trailing-icon',
    actions: [
      {
        id: 'camera',
        title: 'Take a photo',
        icon: <Icon icon={PlusIcon} />,
        onPress: noop,
      },
      {
        id: 'gallery',
        title: 'Choose from gallery',
        icon: <Icon icon={PlusIcon} />,
        onPress: noop,
      },
      {
        id: 'disabled',
        title: 'Scan document',
        isDisabled: true,
        icon: <Icon icon={PlusIcon} />,
        onPress: noop,
      },
      {
        id: 'delete',
        title: 'Delete photo',
        isDanger: true,
        icon: <Icon icon={CloseIcon} color="text.error" />,
        onPress: noop,
      },
    ],
  },
} satisfies Meta<typeof SourceActionSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TrailingIcon: Story = {};

export const Flat: Story = { args: { variant: 'flat' } };

export const CardSource: Story = { args: { variant: 'card-source' } };

export const CardSourceTrailing: Story = {
  args: { variant: 'card-source-trailing' },
};

export const WithDescriptions: Story = {
  args: {
    variant: 'card-source',
    actions: [
      {
        id: 'camera',
        title: 'Take a photo',
        description: 'Opens the camera',
        icon: <Icon icon={PlusIcon} />,
        onPress: noop,
      },
      {
        id: 'files',
        title: 'Upload a file',
        description: 'PDF, JPG or PNG up to 10 MB',
        icon: <Icon icon={PlusIcon} />,
        onPress: noop,
      },
    ],
  },
};
