import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Box } from '../../primitives';
import { DashedButton } from './DashedButton';
import type { DashedButtonVariant } from './DashedButton.types';

const VARIANTS: DashedButtonVariant[] = [
  'internal',
  'external',
  'externalWrapped',
];
const STORY_WIDTH = 320;

const meta = {
  title: 'Components/DashedButton',
  component: DashedButton,
  args: {
    title: 'Add item',
    onPress: () => undefined,
    style: 'external',
    width: STORY_WIDTH,
    disabled: false,
    loading: false,
  },
  argTypes: {
    style: { control: 'radio', options: VARIANTS },
  },
} satisfies Meta<typeof DashedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press it to see the TouchableOpacity active opacity. */
export const External: Story = {};

export const Internal: Story = { args: { style: 'internal' } };

export const ExternalWrapped: Story = { args: { style: 'externalWrapped' } };

export const Disabled: Story = { args: { disabled: true } };

export const Loading: Story = { args: { loading: true } };

/** Every variant × default / disabled / loading. */
export const Matrix: Story = {
  render: args => (
    <Box gap={4}>
      {VARIANTS.map(variant => (
        <Box key={variant} gap={2}>
          <DashedButton {...args} style={variant} />
          <DashedButton {...args} style={variant} disabled />
          <DashedButton {...args} style={variant} loading />
        </Box>
      ))}
    </Box>
  ),
};
